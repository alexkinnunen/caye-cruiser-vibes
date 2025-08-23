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
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={golfCartIcon} alt="Caye Cruiser" className="w-8 h-8 brightness-0 invert" />
              <h3 className="text-2xl font-bold">Caye Cruiser</h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your trusted island transportation partner. Exploring San Pedro, 
              Ambergris Caye with the perfect blend of efficiency and relaxation.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" size="icon" className="bg-primary-foreground/10 hover:bg-primary-foreground/20">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="bg-primary-foreground/10 hover:bg-primary-foreground/20">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon" className="bg-primary-foreground/10 hover:bg-primary-foreground/20">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Features</a></li>
              <li><a href="#vehicles" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Vehicle Classes</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Driver Partners</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-primary-foreground/80">Airport Transfers</span></li>
              <li><span className="text-primary-foreground/80">Island Tours</span></li>
              <li><span className="text-primary-foreground/80">Restaurant Delivery</span></li>
              <li><span className="text-primary-foreground/80">Grocery Delivery</span></li>
              <li><span className="text-primary-foreground/80">Custom Packages</span></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">San Pedro, Ambergris Caye, Belize</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">+501-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">hello@cayecruiser.com</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h5 className="font-semibold mb-2">Get Early Access</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-sm placeholder:text-primary-foreground/60"
                />
                <Button variant="coral" size="sm">
                  Notify Me
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Caye Cruiser. All rights reserved. Made with ❤️ for San Pedro.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;