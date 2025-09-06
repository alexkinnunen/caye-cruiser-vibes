import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Users, Calendar } from "lucide-react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const InteractiveMap = () => {
  return (
    <section id="interactive-map" className="pt-10">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden shadow-2xl bg-white dark:bg-slate-950">
          <CardContent className="p-0">
            {/* Map and Floating Button Container */}
            <div className="relative">
              {/* Mapbox implementation from your project */}
              <div className="h-96">
                <Map
                  initialViewState={{
                    latitude: 17.9163, // Centered on San Pedro
                    longitude: -87.9665,
                    zoom: 13,
                  }}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken={MAPBOX_TOKEN}
                />
              </div>

              {/* Floating Action Button - This remains exactly the same */}
              <div className="absolute bottom-4 right-4">
                <Button size="lg" className="shadow-lg">
                  Request a Ride <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Input Section - This also remains exactly the same */}
            <div className="p-6 bg-background space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Pickup Location" className="pl-10" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Drop-off Location" className="pl-10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Passengers"
                    className="pl-10"
                    defaultValue={2}
                  />
                </div>
                <Button variant="outline" size="lg">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule for Later
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveMap;
