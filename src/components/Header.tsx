// src/components/Header.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import golfCartIcon from "@/assets/golf-cart-icon.png";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "./AuthDialog"; // Import the dialog

const Header = () => {
  const { user, signOut } = useAuth();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={golfCartIcon} alt="Caye Cruiser" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-coral-green">
              Caye Cruiser
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/map"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Catch a Cruiser
            </Link>
            <Link
              to="/partners"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Become a Partner
            </Link>
            <Link
              to="/rentals"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Cart Rentals
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAuthDialogOpen(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
};

export default Header;
