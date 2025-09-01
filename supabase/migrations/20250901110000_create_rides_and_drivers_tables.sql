-- Create a table for your drivers
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create an ENUM type for ride statuses
CREATE TYPE ride_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');

-- Create a table for ride requests
CREATE TABLE public.rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_phone TEXT NOT NULL,
  driver_id UUID REFERENCES public.drivers(id),
  status ride_status NOT NULL DEFAULT 'requested',
  pickup_location_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);