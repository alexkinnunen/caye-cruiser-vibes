import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "@/components/layout/Footer";
import fullBg from "@/assets/full-bg.svg";
import Header from "@/components/layout/Header";

// Import your vehicle images from the assets folder
import ecoCayeImage from "@/assets/vehicles/cart1.jpg";
import cayeCruiserImage from "@/assets/vehicles/cart1.jpg";
import cayeCrewImage from "@/assets/vehicles/cart1.jpg";
import luxeCruiserImage from "@/assets/vehicles/cart1.jpg";

const Rentals = () => {
  const vehicles = [
    {
      name: "Eco Caye",
      type: "Electric",
      image: ecoCayeImage, // Add image property
      description: "Quiet, eco-friendly rides perfect for exploring town.",
      capacity: "2-4 passengers",
      features: ["Electric & Quiet", "Perfect for Downtown", "Eco-Friendly"],
      color: "text-secondary",
      badgeBgClass: "bg-secondary",
    },
    {
      name: "Caye Cruiser",
      type: "Gas",
      image: cayeCruiserImage, // Add image property
      description: "The perfect all-rounder for any island adventure.",
      capacity: "4-6 passengers",
      features: [
        "Comfortable Seating",
        "All-Terrain Ready",
        "Most Popular Choice",
      ],
      color: "text-primary",
      badgeBgClass: "bg-primary",
    },
    {
      name: "Caye Crew",
      type: "Gas",
      image: cayeCrewImage, // Add image property
      description: "Spacious 6-seater carts for families and groups.",
      capacity: "6 passengers",
      features: ["Extra Seating", "Family-Friendly", "Group Adventures"],
      color: "text-accent-dark",
      badgeBgClass: "bg-accent-dark",
    },
    {
      name: "Luxe Cruiser",
      type: "Gas",
      image: luxeCruiserImage, // Add image property
      description: "Premium carts with enhanced comfort and amenities.",
      capacity: "4 passengers",
      features: ["Premium Comfort", "Built-in Cooler", "VIP Experience"],
      color: "text-accent",
      badgeBgClass: "bg-accent",
    },
  ];

  const testimonials = [
    {
      quote:
        "The best way to explore the island! The golf cart was in great condition and the rental process was seamless. Highly recommend Caye Cruiser.",
      name: "John Doe",
      title: "Frequent Visitor",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      quote:
        "We had a blast cruising around San Pedro in our Caye Cruiser. It was the perfect vehicle for our family of four. We'll definitely be back!",
      name: "Jane Smith",
      title: "Family Vacationer",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    },
    {
      quote:
        "Renting from Caye Cruiser was a breeze. The staff was friendly and helpful, and the golf cart was clean and reliable. 10/10 would recommend.",
      name: "Sam Wilson",
      title: "First-Time Visitor",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-muted/50">
          <div
            aria-hidden="true"
            className="absolute -bottom-80 w-[160%] right-[-55%] h-full bg-no-repeat opacity-5 scale-150"
            style={{ backgroundImage: `url(${fullBg})` }}
          />
          <div className="relative z-10">
            <div className="container mx-auto pt-32 px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Choose Your <span className="text-primary">Island Ride</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  From eco-friendly electric carts to luxury cruisers, we have
                  the perfect golf cart for every adventure on Ambergris Caye.
                </p>
              </div>
            </div>
            <section id="vehicles" className="pb-20">
              <div className="container mx-auto px-4">
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
                        {/* Replace the placeholder div with an img tag */}
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="aspect-video w-full h-auto object-cover rounded-lg"
                        />
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
                                <span className="text-foreground">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            variant="default"
                            size="lg"
                            className="text-lg"
                          >
                            Request a {vehicle.name}
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 mt-12">
                        {testimonials.map((testimonial, index) => (
                          <Card
                            key={index}
                            className="flex flex-col justify-between bg-background shadow-lg transform hover:-translate-y-2 transition-all duration-300"
                          >
                            <CardHeader className="relative">
                              <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
                              <p className="text-muted-foreground italic">
                                "{testimonial.quote}"
                              </p>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center">
                                <Avatar className="h-12 w-12 mr-4">
                                  <AvatarImage
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                  />
                                  <AvatarFallback>
                                    {testimonial.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold text-foreground">
                                    {testimonial.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {testimonial.title}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rentals;
