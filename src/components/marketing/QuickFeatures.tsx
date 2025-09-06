import { Clock, Shield, MapPin } from "lucide-react";

const QuickFeatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-white">
            Don't Risk the Rental
          </h3>
          <p className="text-xs text-primary-foreground/80">
            You Drink. We Drive.{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-white">On Demand</h3>
          <p className="text-xs text-primary-foreground/80">
            No scheduling needed.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-white">Trusted Locals</h3>
          <p className="text-xs text-primary-foreground/80">
            Safe and reliable drivers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickFeatures;
