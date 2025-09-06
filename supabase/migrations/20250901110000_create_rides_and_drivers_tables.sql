-- Create a table for your drivers
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  is_available BOOLEAN NOT NULL DEFAULT true,
  last_location GEOMETRY(Point, 4326), -- Using PostGIS for location
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create an ENUM type for ride statuses
CREATE TYPE ride_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');

-- Create a table for ride requests
CREATE TABLE public.rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_id UUID, -- Can be nullable if you allow guest rides
  passenger_phone TEXT NOT NULL,
  driver_id UUID REFERENCES public.drivers(id),
  status ride_status NOT NULL DEFAULT 'requested',
  pickup_location_text TEXT,
  passenger_location GEOMETRY(Point, 4326), -- Using PostGIS for location
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==> 🚨 START SECURITY FIX <==

-- 1. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies for the 'drivers' table
-- Allow anyone to see available drivers (public read)
CREATE POLICY "Allow public read access to available drivers" ON public.drivers
  FOR SELECT USING (is_available = true);

-- Allow drivers to update their own record (e.g., location, availability)
-- Assumes the driver's user ID in auth.users matches their ID in the drivers table.
CREATE POLICY "Allow drivers to update their own profile" ON public.drivers
  FOR UPDATE USING (auth.uid() = id);


-- 3. Create Policies for the 'rides' table
-- Allow authenticated users to create a new ride request for themselves
CREATE POLICY "Allow users to create their own ride requests" ON public.rides
  FOR INSERT WITH CHECK (auth.uid() = passenger_id);

-- Allow passengers to see only their own rides
CREATE POLICY "Allow passengers to view their own rides" ON public.rides
  FOR SELECT USING (auth.uid() = passenger_id);

-- Allow the assigned driver to see the ride details
CREATE POLICY "Allow assigned driver to view the ride" ON public.rides
  FOR SELECT USING (auth.uid() = driver_id);

-- ==> 🚨 END SECURITY FIX <==
