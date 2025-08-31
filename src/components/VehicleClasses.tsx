import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Users, 
  Leaf, 
  Crown,
  DollarSign,
  Clock
} from "lucide-react";

const VehicleClasses = () => {
  const vehicles = [
    {
      name: "Eco Caye",
      icon: <Leaf className="w-8 h-8" />,
      description: "Electric golf carts for short, eco-friendly trips around town",
      capacity: "2-4 passengers",
      features: ["Electric & quiet", "Perfect for downtown", "Environmentally friendly"],
      priceRange: "$4-8",
      color: "from-emerald-500 to-green-400",
      badge: "Eco-Friendly",
      badgeVariant: "secondary" as const,
    },
    {
      name: "Caye Cruiser",
      icon: <Car className="w-8 h-8" />,
      description: "Standard 4-seater golf carts for everyday island adventures",
      capacity: "4 passengers",
      features: ["Comfortable seating", "All-terrain ready", "Most popular choice"],
      priceRange: "$6-15",
      color: "from-primary to-primary-glow",
      badge: "Popular",
      badgeVariant: "default" as const,
    },
    {
      name: "Caye Crew",
      icon: <Users className="w-8 h-8" />,
      description: "Spacious 6-seater carts perfect for families and groups",
      capacity: "6 passengers",
      features: ["Extra seating", "Family-friendly", "Group adventures"],
      priceRange: "$10-20",
      color: "from-blue-500 to-cyan-400",
      badge: "Family Size",
      badgeVariant: "outline" as const,
    },
    {
      name: "Luxe Cruiser",
      icon: <Crown className="w-8 h-8" />,
      description: "Premium golf carts with enhanced comfort and amenities",
      capacity: "4 passengers",
      features: ["Premium comfort", "Cooler with water", "VIP experience"],
      priceRange: "$15-25",
      color: "from-accent to-orange-400",
      badge: "Premium",
      badgeVariant: "destructive" as const,
    },
  ];

  return (
    <section id="vehicles" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Choose Your <span className="text-primary">Island Ride</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From eco-friendly electric carts to luxury cruisers, we have the perfect 
            golf cart for every adventure on Ambergris Caye.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-border/50 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${vehicle.color}`}></div>
              
              <CardHeader className="text-center">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${vehicle.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {vehicle.icon}
                  </div>
                  <Badge variant={vehicle.badgeVariant} className="text-xs">
                    {vehicle.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {vehicle.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {vehicle.capacity}
                </div>
                
                <ul className="space-y-2">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <DollarSign className="w-4 h-4" />
                    {vehicle.priceRange}
                  </div>
                 <Button 
                    className="w-full mt-6" 
                    variant={option.popular ? "default" : "outline"}
                  >
                    Reserve Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-card border rounded-lg p-6 inline-block">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Hourly & Daily Packages Available</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Need a cart for longer? Ask about our 4-hour, 8-hour, and full-day packages with driver included.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleClasses;