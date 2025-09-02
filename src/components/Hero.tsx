import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-primary text-primary-foreground pt-28 pb-16 md:pt-32 md:pb-22">
      {/* Content */}
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight font-serif">
            Island Rides,
            <br />
            <span className="text-white">Instantly.</span>
          </h1>

          <p className="text-xl text-primary-foreground/90 mb-6 leading-relaxed">
            Your on-demand golf cart is just a WhatsApp message away. Explore
            San Pedro with the tap of a button.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center md:justify-start">
            <a
              href="https://wa.me/5016252086"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="hero"
                size="lg"
                className="text-lg px-8 text-deep-purple"
              >
                Request a Ride
              </Button>
            </a>
            <Link to="/rentals">
              <Button
                variant="ghost"
                size="lg"
                className="text-lg px-8 text-coral-green"
              >
                Rentals
              </Button>
            </Link>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">On-Demand</h3>
                <p className="text-xs text-primary-foreground/80">
                  No need to book in advance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">
                  Trusted Locals
                </h3>
                <p className="text-xs text-primary-foreground/80">
                  Safe and reliable drivers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-13 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">
                  Don't risk the rental
                </h3>
                <p className="text-xs text-primary-foreground/80">
                  You Drink, We Drive
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
