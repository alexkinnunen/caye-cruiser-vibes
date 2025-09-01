import VehicleClasses from "@/components/VehicleClasses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ctaImage from "@/assets/golf-carts-on-san-pedro-beach.jpg";
import { 
  Clock, 
  Users, 
  Battery, 
  Shield, 
  MapPin, 
  Star,
  CheckCircle,
  Fuel,
  Truck,
  ShieldCheck,
  Umbrella,
  Wrench,
  Leaf
} from "lucide-react";

const Rentals = () => {
  const rentalvehicles = [
 {
      color: "from-emerald-500 to-green-400",
      icon: <Leaf className="w-8 h-8" />,
      badge: "Eco-Friendly",
      id: "eco-caye",
      name: "Eco Caye",
      description: "Electric golf carts for short, eco-friendly trips around town",
      type: "Electric",
      capacity: "2-4 People",
      dailyRate: "$35",
      weeklyRate: "$210",
      monthlyRate: "$750",
      features: [
        "Eco-friendly",
        "Perfect for in-town trips",
        "Comfortable seating",
      ],
      badgeVariant: "secondary" as const,
      popular: false
    },
    {
      color: "from-primary to-primary-glow",
      id: "caye-cruiser",
      name: "Caye Cruiser",
      type: "Gas-Powered",
      capacity: "4 People",
      icon: <Fuel className="w-6 h-6" />,
      dailyRate: "$45",
      weeklyRate: "$280",
      monthlyRate: "$950",
      features: [
        "All-terrain capability",
        "Roof and windshield",
        "Storage compartment",
      ],
      range: "60+ miles",
      topSpeed: "25 mph",
      popular: true
    },
    {
      color: "from-blue-500 to-cyan-400",
      id: "caye-crew",
      name: "Caye Crew",
      type: "Gas-Powered XL",
      capacity: "6 People",
      icon: <Users className="w-6 h-6" />,
      dailyRate: "$65",
      weeklyRate: "$420",
      monthlyRate: "$1,400",
      features: [
        "Extra seating for families",
        "Large storage area",
        "Group adventure ready"
      ],
      range: "55+ miles",
      topSpeed: "25 mph",
      popular: false
    },
    {
    color: "from-accent to-orange-400",
      id: "luxe-cruiser",
      name: "Luxe Cruiser",
      type: "Premium Electric",
      capacity: "4 People",
      icon: <Star className="w-6 h-6" />,
      dailyRate: "$85",
      weeklyRate: "$550",
      monthlyRate: "$1,800",
      features: [
        "Extra seating for families",
        "Large storage area",
        "Group adventure ready"
      ],
      range: "40+ miles",
      topSpeed: "25 mph",
      popular: false
    }
  ];

  const additionalServices = [
    {
      icon: <Truck className="w-6 h-6" />,
      name: "Delivery & Pickup",
      description: "We'll bring your cart to you anywhere on the island.",
      price: "$15"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      name: "Baby/Child Seats",
      description: "Safety first for your little adventurers.",
      price: "$5/day"
    },
    {
      icon: <Umbrella className="w-6 h-6" />,
      name: "Beach Gear Package",
      description: "Chairs, cooler, and snorkel gear.",
      price: "$25/day"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      name: "24/7 Roadside Support",
      description: "Peace of mind with island-wide assistance.",
      price: "Included"
    }
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
              <span className="text-primary block">Island Cruiser</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore San Pedro at your own pace with our premium golf cart rentals. 
              From eco-friendly electric carts to spacious family cruisers.
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

      {/* Rental vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Cart
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each cart is maintained to island standards and comes with everything you need for a perfect day of exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalvehicles.map((vehicle) => (
              <Card key={vehicle.id} className={`relative ${vehicle.popular ? 'ring-2 ring-primary' : ''}`}>
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
                  <p className="text-sm text-muted-foreground">{vehicle.type} • {vehicle.capacity}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-foreground">{vehicle.dailyRate}</div>
                    <div className="text-sm text-muted-foreground">per day</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly:</span>
                      <span className="font-semibold">{vehicle.weeklyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly:</span>
                      <span className="font-semibold">{vehicle.monthlyRate}</span>
                    </div>
                  </div>

            

                  <div className="space-y-2">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
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
      

      {/* Additional Services */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Make your island experience even better with our premium add-ons and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg pt-4">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 h-12">{service.description}</p>
                  <div className="text-lg font-bold text-primary">{service.price}</div>
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
              alt="Golf carts lined up on a beautiful beach in San Pedro, Belize" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="relative p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
                Ready to Explore Paradise?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
                Book your golf cart rental today and start your San Pedro adventure. 
                Free delivery anywhere on the island with advance booking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero">
                  Call +501-XXX-XXXX
                </Button>
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Book Online
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rentals;
