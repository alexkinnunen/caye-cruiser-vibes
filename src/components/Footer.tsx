import { Button } from "@/components/ui/button";
import golfCartIcon from "@/assets/golfcart.svg";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={golfCartIcon} alt="Caye Cruiser" className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Caye Cruiser</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted island transportation partner.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/partners"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a
                  href="/#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Catch a Cruiser
                </a>
              </li>
              <li>
                <a
                  href="/#rentals"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Rentals
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground">Ride Sharing</span>
              </li>
              <li>
                <span className="text-muted-foreground">Golf Cart Rentals</span>
              </li>
              <li>
                <span className="text-muted-foreground">Island Tours</span>
              </li>
              <li>
                <a
                  href="/#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  San Pedro, Ambergris Caye, Belize
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  +501-XXX-XXXX
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  hello@cayecruiser.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Caye Cruiser. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
