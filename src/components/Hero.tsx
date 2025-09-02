import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-background">
      {/* The background image div has been removed */}

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-800 font-serif">
            Island Rides,
            <br />
            <span className="text-primary">Instantly.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Your on-demand golf cart is just a WhatsApp message away. Explore
            San Pedro with the tap of a button.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://wa.me/5016252086"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" size="lg" className="text-lg px-8">
                Request a Ride
              </Button>
            </a>
            <Link to="/rentals">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 w-full sm:w-auto"
              >
                Daily Rentals
              </Button>
            </Link>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">On-Demand</h3>
                <p className="text-xs text-muted-foreground">
                  No need to book in advance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Trusted Locals</h3>
                <p className="text-xs text-muted-foreground">
                  Safe and reliable drivers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg">
              <div className="w-13 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">You Drink, We Drive</h3>
                <p className="text-xs text-muted-foreground">
                  Don't risk the rental
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
