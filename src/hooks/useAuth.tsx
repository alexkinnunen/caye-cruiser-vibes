import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  AuthError,
  AuthResponse,
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  signInWithGoogle: () => Promise<void>;
  // Corrected return types to match the implementation
  signInWithEmail: (
    credentials: SignInWithPasswordCredentials,
  ) => Promise<AuthResponse["data"]>;
  signUpWithEmail: (
    credentials: SignUpWithPasswordCredentials,
  ) => Promise<AuthResponse["data"]>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
          setError(error);
        } else {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
      } catch (err) {
        console.error("Unexpected error getting session:", err);
        setError(err as AuthError);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setError(null); // Clear any previous errors on auth state change

        // Only set loading to false after initial load
        if (loading) {
          setLoading(false);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [loading]);

  const clearError = () => {
    setError(null);
  };

  const signInWithGoogle = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
      setError(error);
      throw error;
    }
  };

  const signInWithEmail = async (
    credentials: SignInWithPasswordCredentials,
  ) => {
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      setError(error);
      throw error;
    }
    return data;
  };

  const signUpWithEmail = async (
    credentials: SignUpWithPasswordCredentials,
  ) => {
    setError(null);
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) {
      setError(error);
      throw error;
    }
    return data;
  };

  const signOut = async () => {
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      setError(error);
      throw error;
    }
  };

  const value = {
    session,
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Loading wrapper component to prevent UI flickering during initial auth check
export const AuthGuard = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  const { loading } = useAuth();

  if (loading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary">
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Error boundary component for auth errors
export const AuthErrorDisplay = ({
  className = "text-red-500 text-sm mb-4",
}: {
  className?: string;
}) => {
  const { error, clearError } = useAuth();

  if (!error) return null;

  return (
    <div className={className}>
      <p>{error.message}</p>
      <button
        type="button" // Added type attribute here
        onClick={clearError}
        className="text-xs underline mt-1"
      >
        Dismiss
      </button>
    </div>
  );
};