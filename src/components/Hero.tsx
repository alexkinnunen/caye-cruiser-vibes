import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import QuickFeatures from "@/components/QuickFeatures";

const Hero = () => {
  return (
    <section className="bg-primary/90 text-primary-foreground pt-28 pb-16 md:pt-32 md:pb-24">
      {/* Content */}
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight font-serif">
            Island Rides,
            <br />
            <span className="text-white">Instantly.</span>
          </h1>

          <p className="text-xl text-primary-foreground/90 mb-6 leading-relaxed">
            You better Belize it. On-demand golf cart rides are just a WhatsApp
            message away. San Pedro and Ambergris Caye, now at the tip of your
            fingers.
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
          <div>
            <QuickFeatures />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
