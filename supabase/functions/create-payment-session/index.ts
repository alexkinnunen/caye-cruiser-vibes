// supabase/functions/create-payment-session/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@11.1.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});

serve(async (req) => {
  try {
    const { rideId, amount } = await req.json();

    if (!rideId || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing rideId or amount" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Ride Fare (Ride ID: ${rideId})`,
            },
            unit_amount: amount * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${Deno.env.get("SUPABASE_URL")}/payment-success`,
      cancel_url: `${Deno.env.get("SUPABASE_URL")}/payment-cancelled`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
