// supabase/functions/whatsapp-ride-requests/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2";
import { type Database } from "../../../src/database.types.ts";

type SupabaseAdminClient = SupabaseClient<Database>;
type Driver = Database["public"]["Tables"]["drivers"]["Row"];

const META_TOKEN = Deno.env.get("META_PERMANENT_TOKEN");
const META_PHONE_NUMBER_ID = Deno.env.get("META_PHONE_NUMBER_ID");
const META_VERIFY_TOKEN = Deno.env.get("META_VERIFY_TOKEN");

const sendWhatsAppMessage = async (to: string, text: string) => {
  const endpoint =
    `https://graph.facebook.com/v18.0/${META_PHONE_NUMBER_ID}/messages`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${META_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: { body: text },
    }),
  });

  if (!response.ok) {
    console.error(`Failed to send message to ${to}:`, await response.json());
  }
};

serve((req) => {
  if (req.method === "GET") {
    return handleVerification(req);
  }

  if (req.method === "POST") {
    return handleWebhook(req);
  }

  return new Response("Method Not Allowed", { status: 405 });
});

const handleVerification = (req: Request) => {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === META_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Failed validation.", { status: 403 });
  }
};

const handleWebhook = async (req: Request) => {
  const supabase = createClient<Database>(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  try {
    const payload = await req.json();
    const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return new Response("ok");
    }

    const from = message.from;
    const messageBody = message.text.body.toLowerCase().trim();

    const { data: driver } = await supabase
      .from("drivers")
      .select("*")
      .eq("phone_number", from)
      .single();

    if (driver) {
      await handleDriverMessage(supabase, driver, messageBody);
    } else {
      await handlePassengerMessage(supabase, from, messageBody);
    }

    return new Response("ok");
  } catch (error) {
    console.error("CRITICAL ERROR processing message:", error);
    return new Response("Error", { status: 500 });
  }
};

async function handlePassengerMessage(
  supabase: SupabaseAdminClient,
  from: string,
  body: string,
) {
  const { data: availableDriver } = await supabase
    .from("drivers")
    .select("*")
    .eq("is_available", true)
    .limit(1)
    .single();

  if (!availableDriver) {
    await sendWhatsAppMessage(
      from,
      "Sorry, all our drivers are currently busy. Please try again in a few minutes.",
    );
    return;
  }

  await supabase.from("rides").insert({
    passenger_phone: from,
    driver_id: availableDriver.id,
    pickup_location_text: body,
    status: "requested",
  });

  await supabase
    .from("drivers")
    .update({ is_available: false })
    .eq("id", availableDriver.id);

  await sendWhatsAppMessage(
    from,
    `We've found a driver for you! We're just waiting for them to confirm.`,
  );
  await sendWhatsAppMessage(
    availableDriver.phone_number,
    `New Ride Request!\nFrom: ${from}\nPickup: ${body}\n\nReply "accept" to take this ride or "decline" to pass.`,
  );
}

async function handleDriverMessage(
  supabase: SupabaseAdminClient,
  driver: Driver,
  body: string,
) {
  const { data: ride } = await supabase
    .from("rides")
    .select("id, passenger_phone, drivers ( name )")
    .eq("driver_id", driver.id)
    .eq("status", "requested")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!ride) {
    await sendWhatsAppMessage(
      driver.phone_number,
      "Thanks, but you don't have any pending ride requests right now.",
    );
    return;
  }

  if (body.includes("accept")) {
    await supabase
      .from("rides")
      .update({ status: "accepted" })
      .eq("id", ride.id);

    await sendWhatsAppMessage(
      driver.phone_number,
      "Ride accepted! Please proceed to the pickup location.",
    );
    await sendWhatsAppMessage(
      ride.passenger_phone,
      `Your ride is confirmed! ${driver.name} is on the way.`,
    );
  } else if (body.includes("decline")) {
    await supabase
      .from("drivers")
      .update({ is_available: true })
      .eq("id", driver.id);

    await supabase
      .from("rides")
      .update({ status: "cancelled" })
      .eq("id", ride.id);

    await sendWhatsAppMessage(
      driver.phone_number,
      "Ride declined. We will find another driver.",
    );
    await sendWhatsAppMessage(
      ride.passenger_phone,
      "We're sorry, the driver was unable to take your request. We are looking for another one.",
    );
  } else if (body.includes("complete")) {
    await supabase
      .from("rides")
      .update({ status: "completed" })
      .eq("driver_id", driver.id)
      .eq("status", "accepted");

    await supabase
      .from("drivers")
      .update({ is_available: true })
      .eq("id", driver.id);

    await sendWhatsAppMessage(
      driver.phone_number,
      "Ride marked as complete. You are now available for new requests.",
    );
    await sendWhatsAppMessage(
      ride.passenger_phone,
      "Thanks for riding with us!",
    );
  } else {
    await sendWhatsAppMessage(
      driver.phone_number,
      'Sorry, I didn\'t understand that. Please reply with "accept", "decline", or "complete".',
    );
  }
}
