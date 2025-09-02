import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import golfCartIcon from "@/assets/golf-cart-icon.png";

const Header = () => {
  const location = useLocation();
  const isRentalsPage = location.pathname === "/rentals";
  const isPartnersPage = location.pathname === "/partners";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={golfCartIcon} alt="Caye Cruiser" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-primary">Caye Cruiser</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {!isRentalsPage && !isPartnersPage && (
            <>
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#vehicles"
                className="text-foreground hover:text-primary transition-colors"
              >
                Vehicles
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
            </>
          )}
          <Link
            to="/rentals"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Rent a Cart
          </Link>
          <Link
            to="/partners"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Become a Partner
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
