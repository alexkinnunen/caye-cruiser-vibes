import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Island
            <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
              Adventure
            </span>
            Awaits
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience the perfect blend of island relaxation and efficient transport. 
            Explore San Pedro, Ambergris Caye with our on-demand golf cart service – 
            designed for the Caribbean way of life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8">
              Book Your Ride
            </Button>
            <Link to="/rentals">
              <Button variant="outline" size="lg" className="text-lg px-8 w-full sm:w-auto">
                Rent a Cart
              </Button>
            </Link>
          </div>
          
          {/* Quick Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Smart Navigation</h3>
                <p className="text-xs text-muted-foreground">Bumpy road alerts</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Island Time</h3>
                <p className="text-xs text-muted-foreground">Flexible scheduling</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Local Drivers</h3>
                <p className="text-xs text-muted-foreground">Trusted & verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;