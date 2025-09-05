import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { PointsOfInterest } from "../data/PointsOfInterest";
import { MapPin, Truck, Smartphone } from "lucide-react";

const ExploreAndFeatures = () => {
  const WHATSAPP_NUMBER = "5016252086";

  const handleRequestRide = (locationTitle: string) => {
    const message = `Hi Caye Cruiser! I'd like a ride to ${locationTitle}.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

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
        "Add multiple stops to explore the island for beach hopping, dining, and sightseeing.",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Caye Cargo Delivery",
      description:
        "Need groceries or restaurant delivery? Our drivers can pick up and deliver while you relax.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-28 relative z-10">
      <Tabs defaultValue="explore" className="w-full">
        {/* Main Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">
            Explore & Cruise
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the best of San Pedro with our curated points of interest,
            or learn more about our convenient island-wide services.
          </p>
        </div>

        {/* Tab Controls Moved to the Top */}
        <div className="flex justify-center mb-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md h-12 bg-muted p-1 rounded-lg">
            <TabsTrigger
              value="explore"
              className="text-base rounded-md data-[state=active]:bg-green data-[state=active]:text-primary-foreground"
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

        {/* Tab Content */}
        <TabsContent value="explore">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 p-4">
              {PointsOfInterest.map((poi) => (
                <CarouselItem
                  key={poi.id}
                  className="pl-2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                      <img
                        src={poi.image}
                        alt={poi.title}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-6 flex-grow">
                        <Badge
                          variant="outline"
                          className={`mb-2 ${poi.badgeClass}`}
                        >
                          {poi.category}
                        </Badge>
                        <h3 className="text-xl font-bold font-serif mb-2">
                          {poi.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {poi.description}
                        </p>
                      </CardContent>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 text-center"
              >
                <CardHeader className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg pt-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExploreAndFeatures;
