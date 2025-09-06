import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDriver, setIsDriver] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await signUpWithEmail({
        email,
        password,
        options: { data: { role: isDriver ? "driver" : "user" } },
      });
      setMessage("Success! Check your email for a verification link.");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await signInWithEmail({ email, password });
      onOpenChange(false);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to Caye Cruiser</DialogTitle>
          <DialogDescription>
            Sign in or create an account to manage your rides.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 justify-center pt-4">
          <Label htmlFor="user-type-switch">Rider</Label>
          <Switch
            id="user-type-switch"
            checked={isDriver}
            onCheckedChange={setIsDriver}
          />
          <Label htmlFor="user-type-switch">Driver</Label>
        </div>

        <div className="py-4">
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={signInWithGoogle}
          >
            <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.98-4.66 1.98-3.55 0-6.42-2.84-6.42-6.32s2.87-6.32 6.42-6.32c2.03 0 3.36.83 4.14 1.58l2.36-2.36C18.17 2.7 15.64 1.5 12.48 1.5 7.18 1.5 3 5.66 3 11.02s4.18 9.52 9.48 9.52c2.56 0 4.66-.83 6.17-2.35 1.56-1.56 2.06-3.85 2.06-5.81 0-.6-.05-1.18-.15-1.74h-8.07z"
              ></path>
            </svg>
            Sign in with Google
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleEmailSignIn}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email-signin">Email</Label>
                    <Input
                      id="email-signin"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password-signin">Password</Label>
                    <Input
                      id="password-signin"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Sign In</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleEmailSignUp}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Create Account</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          {message && (
            <p className="text-sm text-center text-muted-foreground mt-2">
              {message}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
