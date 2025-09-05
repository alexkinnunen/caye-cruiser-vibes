import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import Map, { Marker } from "react-map-gl";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type DriverLocation = {
  id: string;
  name: string;
  last_location: {
    type: "Point";
    coordinates: [number, number];
  };
};

const LiveMap = () => {
  const [drivers, setDrivers] = useState<DriverLocation[]>([]);
  const [viewState, setViewState] = useState({
    longitude: -87.9667,
    latitude: 17.9167,
    zoom: 12,
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase
        .from("drivers")
        .select("id, name, last_location")
        .eq("is_available", true)
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Live Driver Map</h1>
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
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
              <div className="flex flex-col items-center text-center">
                <span className="text-xs bg-white/80 px-2 py-1 rounded-md shadow-sm">
                  {driver.name}
                </span>
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
            </Marker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default LiveMap;
