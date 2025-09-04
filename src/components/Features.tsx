import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation, MapPin, Truck, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Ride Sharing",
      description:
        "Our San Pedrano drivers know the best spots, shortest routes, and can share island secrets.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Tour Stop Mode",
      description:
        "Add multiple stops to explore the island. Perfect for beach hopping, dining, and sightseeing in one trip.",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Caye Cargo Delivery",
      description:
        "Need groceries or restaurant delivery? Our drivers can pick up and deliver while you relax.",
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: "Local Knowledge",
      description:
        "Our San Pedrano drivers know the best spots, shortest routes, and can share island secrets.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-left mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-green">More than just ride-sharing</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the island like never before with our unique features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50"
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green/50 rounded-lg flex items-center justify-center text-green group-hover:bg-green group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg pt-3 pd-3">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
