import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Users, Leaf, Crown, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import About from "@/components/About";

const Rentals = () => {
  const vehicles = [
    {
      name: "Eco Caye",
      type: "Electric",
      icon: <Leaf className="w-full h-full" />,
      description: "Quiet, eco-friendly rides perfect for exploring town.",
      capacity: "2-4 passengers",
      features: ["Electric & Quiet", "Perfect for Downtown", "Eco-Friendly"],
      color: "text-secondary",
      imagePlaceholderColor: "bg-secondary/10",
      badgeBgClass: "bg-secondary",
    },
    {
      name: "Caye Cruiser",
      type: "Gas",
      icon: <Car className="w-full h-full" />,
      description: "The perfect all-rounder for any island adventure.",
      capacity: "4-6 passengers",
      features: [
        "Comfortable Seating",
        "All-Terrain Ready",
        "Most Popular Choice",
      ],
      color: "text-primary",
      imagePlaceholderColor: "bg-primary/10",
      badgeBgClass: "bg-primary",
    },
    {
      name: "Caye Crew",
      type: "Gas",
      icon: <Users className="w-full h-full" />,
      description: "Spacious 6-seater carts for families and groups.",
      capacity: "6 passengers",
      features: ["Extra Seating", "Family-Friendly", "Group Adventures"],
      color: "text-accent-dark",
      imagePlaceholderColor: "bg-accent-dark/10",
      badgeBgClass: "bg-accent-dark",
    },
    {
      name: "Luxe Cruiser",
      type: "Gas",
      icon: <Crown className="w-full h-full" />,
      description: "Premium carts with enhanced comfort and amenities.",
      capacity: "4 passengers",
      features: ["Premium Comfort", "Built-in Cooler", "VIP Experience"],
      color: "text-accent",
      imagePlaceholderColor: "bg-accent/20",
      badgeBgClass: "bg-accent",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Place the Header component here */}
      <Header />
      <main className="flex-grow">
        <section id="vehicles" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-serif">
                Choose Your <span className="text-primary">Island Ride</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From eco-friendly electric carts to luxury cruisers, we have the
                perfect golf cart for every adventure on Ambergris Caye.
              </p>
            </div>

            <Tabs defaultValue="Caye Cruiser" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-8">
                {vehicles.map((vehicle) => (
                  <TabsTrigger
                    key={vehicle.name}
                    value={vehicle.name}
                    className="py-3 text-base"
                  >
                    {vehicle.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {vehicles.map((vehicle) => (
                <TabsContent
                  key={vehicle.name}
                  value={vehicle.name}
                  className="animate-fade-in-up"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div
                      className={`aspect-video rounded-lg ${vehicle.imagePlaceholderColor} flex items-center justify-center p-8`}
                    >
                      <div className={`w-32 h-32 ${vehicle.color}`}>
                        {vehicle.icon}
                      </div>
                    </div>

                    <div>
                      <Badge
                        variant="secondary"
                        className={`mb-4 ${vehicle.badgeBgClass} text-primary-foreground`}
                      >
                        {vehicle.type}
                      </Badge>
                      <h3
                        className={`text-3xl font-bold font-serif ${vehicle.color}`}
                      >
                        {vehicle.name}
                      </h3>
                      <p className="text-lg text-muted-foreground mt-2 mb-6">
                        {vehicle.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {vehicle.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle
                              className={`w-5 h-5 ${vehicle.color}`}
                            />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="default" size="lg" className="text-lg">
                        Request a {vehicle.name}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Rentals;
