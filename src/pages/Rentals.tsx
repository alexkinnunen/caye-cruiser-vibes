import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ctaImage from "@/assets/golf-carts-on-san-pedro-beach.jpg";
import {
  Clock,
  Users,
  Shield,
  MapPin,
  Star,
  CheckCircle,
  Fuel,
  Leaf,
} from "lucide-react";

const Rentals = () => {
  const rentalVehicles = [
    {
      color: "from-emerald-500 to-green-400",
      icon: <Leaf className="w-8 h-8" />,
      badge: "Eco-Friendly",
      id: "eco-caye",
      name: "Eco Caye",
      description:
        "Electric golf carts for short, eco-friendly trips around town.",
      type: "Electric",
      capacity: "2-4 People",
      dailyRate: "$35",
      features: [
        "Eco-friendly & quiet",
        "Perfect for in-town trips",
        "Comfortable seating",
      ],
      badgeVariant: "secondary" as const,
      popular: false,
    },
    {
      color: "from-primary to-primary-glow",
      id: "caye-cruiser",
      name: "Caye Cruiser",
      type: "Gas-Powered",
      capacity: "4 People",
      icon: <Fuel className="w-6 h-6" />,
      dailyRate: "$45",
      features: [
        "All-terrain capability",
        "Roof and windshield",
        "Storage compartment",
      ],
      popular: true,
    },
    {
      color: "from-blue-500 to-cyan-400",
      id: "caye-crew",
      name: "Caye Crew",
      type: "Gas-Powered XL",
      capacity: "6 People",
      icon: <Users className="w-6 h-6" />,
      dailyRate: "$65",
      features: [
        "Extra seating for families",
        "Large storage area",
        "Group adventure ready",
      ],
      popular: false,
    },
    {
      color: "from-accent to-orange-400",
      id: "luxe-cruiser",
      name: "Luxe Cruiser",
      type: "Premium Electric",
      capacity: "4 People",
      icon: <Star className="w-6 h-6" />,
      dailyRate: "$85",
      features: ["Premium comfort", "Built-in cooler", "Bluetooth speakers"],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Rent Your Perfect
              <span className="text-primary block"> Island Cruiser</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore San Pedro at your own pace with our premium golf cart
              rentals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Island-wide Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={`flex flex-col ${
                  vehicle.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {vehicle.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <div className={`h-2 bg-gradient-to-r ${vehicle.color}`}></div>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {vehicle.icon}
                  </div>
                  <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.type} • {vehicle.capacity}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="text-center space-y-1 mb-4">
                      <div className="text-2xl font-bold text-foreground">
                        {vehicle.dailyRate}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per day
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {vehicle.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="w-full mt-6"
                    variant={vehicle.popular ? "default" : "outline"}
                  >
                    Reserve Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={ctaImage}
              alt="Golf carts on a beach in San Pedro"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="relative p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Explore Paradise?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Book your golf cart rental today and start your San Pedro
                adventure.
              </p>
              <Button size="lg" variant="default">
                Book Online
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rentals;
