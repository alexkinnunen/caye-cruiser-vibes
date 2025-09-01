// src/pages/LiveMap.tsx
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client.ts"; // Adjust this path if needed

// Define a type for your driver's location data
type DriverLocation = {
  id: string;
  name: string;
  last_location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
};

const LiveMap = () => {
  const [drivers, setDrivers] = useState<DriverLocation[]>([]);

  useEffect(() => {
    // Fetch initial driver locations
    const fetchDrivers = async () => {
      const { data, error } = await supabase
        .from("drivers")
        .select("id, name, last_location")
        .eq("is_available", true);

      if (data) {
        setDrivers(data as DriverLocation[]);
      }
    };

    fetchDrivers();

    // Listen for real-time updates
    const channel = supabase
      .channel("drivers_location")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "drivers" },
        (payload) => {
          setDrivers((prevDrivers) =>
            prevDrivers.map((driver) =>
              driver.id === payload.new.id
                ? { ...driver, ...payload.new }
                : driver
            )
          );
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
      <div id="map" style={{ height: "600px", width: "100%" }}></div>
      {/* We will integrate a map library here */}
    </div>
  );
};

export default LiveMap;
