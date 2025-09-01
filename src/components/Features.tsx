import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Navigation, 
  Users, 
  MapPin, 
  Truck, 
  Clock, 
  DollarSign,
  Smartphone,
  Star
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Ride Sharing",
      description: "Our San Pedrano drivers know the best spots, shortest routes, and can share island secrets.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Tour Stop Mode",
      description: "Add multiple stops to explore the island. Perfect for beach hopping, dining, and sightseeing in one trip.",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Caye Cargo Delivery",
      description: "Need groceries or restaurant delivery? Our drivers can pick up and deliver while you relax.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Local Knowledge",
      description: "Our San Pedrano drivers know the best spots, shortest routes, and can share island secrets.",
    },

  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-primary">More than just ride-sharing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
             We've built features specifically for 
            the unique rhythm and roads of Ambergris Caye.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
         <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50">
          <CardHeader className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {feature.icon}
            </div>
            <CardTitle className="text-lg pt-3 pd-3">{feature.title}</CardTitle>
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
