import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Smartphone, Truck } from "lucide-react";

// Define the type for a Point of Interest, matching the database structure
type PointOfInterest = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  badge_class: string;
  website_url?: string;
};

const ExploreAndFeatures = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(
    [],
  );
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

  useEffect(() => {
    const fetchPOIs = async () => {
      const { data, error } = await supabase
        .from("points_of_interest")
        .select("*");

      if (error) {
        console.error("Error fetching points of interest:", error);
      } else if (data) {
        setPointsOfInterest(data);
      }
    };

    fetchPOIs();
  }, []);

  const handleRequestRide = (locationTitle: string) => {
    const message = `Hi Caye Cruiser! I'd like a ride to ${locationTitle}.`;
    globalThis.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleRequestService = (serviceTitle: string) => {
    const message =
      `Hi Caye Cruiser! I'm interested in your ${serviceTitle} service.`;
    globalThis.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const features = [
    {
      icon: <Smartphone className="w-16 h-16 text-primary" />,
      title: "Ride Sharing",
      category: "Transport",
      badgeClass: "border-blue-500 text-blue-600",
      description:
        "Our San Pedrano drivers know the best spots, shortest routes, and can share island secrets.",
    },
    {
      icon: <MapPin className="w-16 h-16 text-primary" />,
      title: "Tour Stop Mode",
      category: "Tours",
      badgeClass: "border-green-500 text-green-600",
      description:
        "Add multiple stops to explore the island for beach hopping, dining, and sightseeing.",
    },
    {
      icon: <Truck className="w-16 h-16 text-primary" />,
      title: "Caye Cargo Delivery",
      category: "Delivery",
      badgeClass: "border-orange-500 text-orange-600",
      description:
        "Need groceries or restaurant delivery? Our drivers can pick up and deliver while you relax.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-28 relative z-10">
      {/* Main Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl text-center md:text-6xl font-bold font-serif text-foreground mb-6">
          Explore & <span className="text-primary">Cruise</span>
        </h1>
        <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          You Drink. We'll Drive. Discover the best of San Pedro with our
          curated points of interest and unique services.
        </p>
      </div>

      <Tabs defaultValue="explore" className="w-full">
        <TabsContent value="explore">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 p-4">
              {pointsOfInterest.map((poi) => (
                <CarouselItem
                  key={poi.id}
                  className="pl-2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                      <a
                        href={poi.website_url || undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block ${
                          poi.website_url ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        <img
                          src={poi.image}
                          alt={poi.title}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-6 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge
                                variant="outline"
                                className={`mb-2 ${poi.badge_class}`}
                              >
                                {poi.category}
                              </Badge>
                              <h3 className="text-xl font-bold font-serif mb-2">
                                {poi.title}
                              </h3>
                            </div>
                            {poi.website_url && (
                              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {poi.description}
                          </p>
                        </CardContent>
                      </a>
                      <CardFooter>
                        <Button
                          onClick={() => handleRequestRide(poi.title)}
                          className="w-full"
                          variant="herolink"
                        >
                          Cruise There
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 left-4 lg:-left-12" />
            <CarouselNext className="hidden md:inline-flex absolute top-1/2 -translate-y-1/2 right-4 lg:-right-12" />
          </Carousel>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardContent className="p-6 flex-grow">
                  <Badge
                    variant="outline"
                    className={`mb-2 ${feature.badgeClass}`}
                  >
                    {feature.category}
                  </Badge>
                  <h3 className="text-xl font-bold font-serif mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleRequestService(feature.title)}
                    className="w-full"
                    variant="herolink"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <div className="flex justify-center mt-10">
          <TabsList className="grid w-full grid-cols-2 max-w-md h-12 bg-muted p-1 rounded-lg">
            <TabsTrigger
              value="explore"
              className="text-base rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Explore The Island
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="text-base rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Our Services
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </section>
  );
};

export default ExploreAndFeatures;
