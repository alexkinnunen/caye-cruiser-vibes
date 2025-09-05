// supabase/functions/create-payment-session/index.ts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@15.12.0?target=deno";
import { z, ZodError } from "https://deno.land/x/zod@v3.23.8/mod.ts";

// Initialize Stripe with the API key from environment variables.
// The `as string` cast is safe if you've set the variable in Supabase.
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
  try {
    // Ensure the request method is POST
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
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
            unit_amount: Math.round(amount * 100), // Amount in cents, rounded
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${Deno.env.get("SUPABASE_URL")}/payment-success`, // Use your actual frontend URL
      cancel_url: `${Deno.env.get("SUPABASE_URL")}/payment-cancelled`, // Use your actual frontend URL
    });

    // Return the session ID to the client.
    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle validation errors specifically.
    if (error instanceof ZodError) {
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
          details: error.issues,
        }),
        {
          status: 400, // Bad Request
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle other errors.
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
