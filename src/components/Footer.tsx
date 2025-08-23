import { Button } from "@/components/ui/button";
import golfCartIcon from "@/assets/golf-cart-icon.png";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={golfCartIcon} alt="Caye Cruiser" className="w-8 h-8 brightness-0 invert" />
              <h3 className="text-2xl font-bold">Caye Cruiser</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your trusted island transportation partner. Exploring San Pedro, 
              Ambergris Caye with the perfect blend of efficiency and relaxation.
            </p>
            <div className="flex gap-3">
              <Button variant="coral" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="coral" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="coral" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#vehicles" className="text-muted-foreground hover:text-foreground transition-colors">Vehicle Classes</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Driver Partners</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-muted-foreground">Airport Transfers</span></li>
              <li><span className="text-muted-foreground">Island Tours</span></li>
              <li><span className="text-muted-foreground">Restaurant Delivery</span></li>
              <li><span className="text-muted-foreground">Grocery Delivery</span></li>
              <li><span className="text-muted-foreground">Custom Packages</span></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">San Pedro, Ambergris Caye, Belize</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">+501-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">hello@cayecruiser.com</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h5 className="font-semibold mb-2">Get Early Access</h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full sm:flex-1 px-3 py-2 bg-background border border-border rounded text-sm placeholder:text-muted-foreground"
                />
                <Button variant="coral" size="sm" className="w-full sm:w-auto">
                  Notify Me
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Caye Cruiser. All rights reserved. Made with ❤️ for San Pedro.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
