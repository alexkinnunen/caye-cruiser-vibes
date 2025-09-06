import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import golfCartIcon from "@/assets/golf-cart-icon.png";
import fullBgb from "@/assets/full-bg2.svg";
import { Input } from "@/components/ui/input";
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
import { MapPin, Truck, Smartphone, Users, ExternalLink } from "lucide-react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type DriverLocation = {
  id: string;
  name: string;
  last_location: {
    type: "Point";
    coordinates: [number, number];
  };
  is_available: boolean;
};

type PointOfInterest = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  badge_class: string;
  website_url?: string;
};

const MapAndExplore = () => {
  const [drivers, setDrivers] = useState<DriverLocation[]>([]);
  const [viewState, setViewState] = useState({
    longitude: -87.9667,
    latitude: 17.9167,
    zoom: 13,
  });

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [passengerCount, setPassengerCount] = useState(2);
  const [PointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(
    []
  );

  const WHATSAPP_NUMBER = "5016252086";

  const handleRequestRide = (locationTitle: string) => {
    const message = `Hi Caye Cruiser! I'd like a ride to ${locationTitle}.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleRequestService = (serviceTitle: string) => {
    const message = `Hi Caye Cruiser! I'm interested in your ${serviceTitle} service.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  useEffect(() => {
    const fetchPOIs = async () => {
      const { data, error } = await supabase
        .from("points_of_interest")
        .select("*");

      if (error) {
        console.error("Error fetching points of interest:", error);
      } else {
        setPointsOfInterest(data);
      }
    };

    fetchPOIs();
  }, []);

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

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase
        .from("drivers")
        .select("id, name, last_location, is_available")
        .not("last_location", "is", null);

      if (error) console.error("Error fetching drivers:", error);
      else if (data) setDrivers(data as DriverLocation[]);
    };
    fetchDrivers();

    const channel = supabase
      .channel("drivers_location")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "drivers" },
        (payload) => {
          if (payload.new.last_location) {
            setDrivers((prev) => {
              const driverExists = prev.some((d) => d.id === payload.new.id);
              if (driverExists) {
                return prev.map((driver) =>
                  driver.id === payload.new.id
                    ? { ...driver, ...(payload.new as DriverLocation) }
                    : driver
                );
              } else {
                return [...prev, payload.new as DriverLocation];
              }
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-muted/50">
          <div
            aria-hidden="true"
            className="absolute -bottom-70 w-[160%] right-[-20%] h-full bg-no-repeat opacity-5 scale-150"
            style={{ backgroundImage: `url(${fullBgb})` }}
          />

          <div className="relative p-20 z-10">
            {/* --- Live Map Section --- */}

            <div className="relative flex-grow h-[calc(100vh-350px)] lg:h-[calc(100vh-300px)] container mx-auto px-4 mb-8 z-10">
              <div className="w-full h-full rounded-xl overflow-hidden border border-border">
                <Button className="absolute bottom-6 right-6 z-10 text-lg px-8 py-6 rounded-lg shadow-lg bg-primary hover:bg-primary/90 transition-all md:bottom-8 md:right-8">
                  Request a Cruiser <span className="ml-2">→</span>
                </Button>
                <Map
                  {...viewState}
                  onMove={(evt) => setViewState(evt.viewState)}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle="mapbox://styles/mapbox/streets-v12"
                  mapboxAccessToken={MAPBOX_TOKEN}
                >
                  {drivers.map((driver) => (
                    <Marker
                      key={driver.id}
                      longitude={driver.last_location.coordinates[0]}
                      latitude={driver.last_location.coordinates[1]}
                      anchor="bottom"
                    >
                      <div className="flex flex-col items-center cursor-pointer group">
                        <img
                          src={golfCartIcon}
                          alt="Caye Cruiser"
                          className="w-10 h-10 drop-shadow-lg"
                        />
                      </div>
                    </Marker>
                  ))}
                </Map>
              </div>
            </div>

            <div className="container mx-auto px-4 pb-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    placeholder="Pickup Location"
                    className="pl-10 py-6 text-base h-auto"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    placeholder="Drop-off Location"
                    className="pl-10 py-6 text-base h-auto"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Users
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    type="number"
                    placeholder="2"
                    className="pl-10 py-6 text-base h-auto"
                    value={passengerCount}
                    onChange={(e) =>
                      setPassengerCount(parseInt(e.target.value))
                    }
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* --- Explore and Features Section --- */}
            <section className="relative z-10 pt-10 pb-20">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl text-center md:text-6xl font-bold font-serif text-foreground mb-6">
                  Don't <span className="text-primary">Risk </span>the Rental
                </h1>
                <p className="text-xl text-center text-muted-foreground mb-8 leading-relaxed">
                  You Drink. We'll Drive. Explore top spots and our unique
                  services, all with Caye Cruiser ride.
                </p>

                <Tabs defaultValue="explore" className="w-full">
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
                                <a
                                  href={poi.website_url || undefined}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`block ${
                                    poi.website_url
                                      ? "cursor-pointer"
                                      : "cursor-default"
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
                              onClick={() =>
                                handleRequestService(feature.title)
                              }
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
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapAndExplore;
