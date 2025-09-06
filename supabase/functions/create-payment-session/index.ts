// supabase/functions/create-payment-session/index.ts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@15.12.0?target=deno";
import { z, ZodError } from "https://deno.land/x/zod@v3.23.8/mod.ts";

// Define CORS headers. Replace the origin with your actual frontend URL in production.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Or 'https://your-domain.com' for production
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Stripe with the API key from environment variables.
const stripe: Stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(), // Recommended for Deno
});

// Define a schema for the incoming request body for validation.
const PaymentRequestSchema = z.object({
  rideId: z.string().uuid("Invalid Ride ID format"),
  amount: z.number().positive("Amount must be a positive number"),
});

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Ensure the request method is POST
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { rideId, amount } = PaymentRequestSchema.parse(body);

    // Create a Checkout Session with Stripe.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Ride Fare (Ride ID: ${rideId})`,
            },
            unit_amount: Math.round(amount * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // IMPORTANT: Replace these with your actual frontend URLs
      success_url: `${Deno.env.get("VITE_APP_URL")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get("VITE_APP_URL")}/payment-cancelled`,
    });

    // Return the session ID to the client.
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid request body", details: error.issues }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Handle other errors
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
