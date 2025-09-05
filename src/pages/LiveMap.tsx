import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import golfCartIcon from "@/assets/golf-cart-icon.png";
import fullBgb from "@/assets/full-bg2.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as MapPinIcon, UsersIcon } from "lucide-react";
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

const LiveMap = () => {
  const [drivers, setDrivers] = useState<DriverLocation[]>([]);
  const [viewState, setViewState] = useState({
    longitude: -87.9667,
    latitude: 17.9167,
    zoom: 13,
  });

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [passengerCount, setPassengerCount] = useState(2);

  useEffect(() => {
    // ... useEffect hook remains the same
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
      <main className="flex-grow pt-16 pb-20 relative overflow-hidden flex flex-col bg-muted/50">
        {/* Updated background div with proper positioning like in index.tsx */}
        <div
          aria-hidden="true"
          className="absolute -bottom-30 w-[160%] right-[-60%] h-full bg-no-repeat opacity-10 scale-150"
          style={{ backgroundImage: `url(${fullBgb})` }}
        />

        <section className="py-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground">
            Request a Ride
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Book your Caye Cruiser for an island adventure.
          </p>
        </section>

        <div className="relative flex-grow h-[calc(100vh-350px)] lg:h-[calc(100vh-300px)] container mx-auto px-4 mb-8">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-border">
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
              <MapPinIcon
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
              <MapPinIcon
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
              <UsersIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                type="number"
                placeholder="2"
                className="pl-10 py-6 text-base h-auto"
                value={passengerCount}
                onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveMap;
