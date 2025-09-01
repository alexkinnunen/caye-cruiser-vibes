import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { type Database } from '../../../src/database.types.ts'

// Define a fully typed Supabase client
type SupabaseAdminClient = SupabaseClient<Database>
// Define a type for the full driver object based on your schema
type Driver = Database['public']['Tables']['drivers']['Row']

const META_TOKEN = Deno.env.get('META_PERMANENT_TOKEN')
const META_PHONE_NUMBER_ID = Deno.env.get('META_PHONE_NUMBER_ID')
const META_VERIFY_TOKEN = Deno.env.get('META_VERIFY_TOKEN')

serve(async (req) => {
  const supabase = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  if (req.method === 'GET') {
    // Webhook verification logic
    const url = new URL(req.url)
    const mode = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const challenge = url.searchParams.get('hub.challenge')
    if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 })
    } else {
      return new Response('Failed validation.', { status: 403 })
    }
  }

  if (req.method === 'POST') {
    try {
      const payload = await req.json()
      const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

      if (!message) {
        return new Response('ok')
      }

      const from = message.from

      // Check if the message is from a known driver
      const { data: driver } = await supabase
        .from('drivers')
        .select('*')
        .eq('phone_number', from)
        .single()

      if (driver) {
        // Handle driver messages (text or location)
        if (message.type === 'text') {
          await handleDriverMessage(supabase, driver, message.text.body.toLowerCase().trim())
        }
        if (message.type === 'location') {
          const { latitude, longitude } = message.location
          await supabase
            .from('drivers')
            .update({ last_location: `POINT(${longitude} ${latitude})` })
            .eq('id', driver.id)
          await sendWhatsAppMessage(from, "Your location has been updated.")
        }
      } else {
        // Handle passenger messages (must be a location)
        if (message.type === 'location') {
          await handlePassengerLocation(supabase, from, message.location)
        } else {
          await sendWhatsAppMessage(from, "To request a ride, please share your current location.")
        }
      }

      return new Response('ok')
    } catch (error) {
      console.error('CRITICAL ERROR processing message:', error)
      return new Response('Error', { status: 500 })
    }
  }

  return new Response('Method Not Allowed', { status: 405 })
})

// Handles ride requests when a passenger shares their location
async function handlePassengerLocation(supabase: SupabaseAdminClient, from: string, location: { latitude: number; longitude: number }) {
  const { latitude, longitude } = location

  const { data: closestDriverArray, error: findDriverError } = await supabase.rpc('find_closest_driver', {
    passenger_lat: latitude,
    passenger_lon: longitude,
  })

  if (findDriverError || !closestDriverArray || closestDriverArray.length === 0) {
    await sendWhatsAppMessage(from, 'Sorry, we couldn\'t find any available drivers near you. Please try again later.')
    return
  }
  
  const closestDriver = closestDriverArray[0];

  await supabase.from('rides').insert({
    passenger_phone: from,
    driver_id: closestDriver.id,
    status: 'requested',
    passenger_location: `POINT(${longitude} ${latitude})`
  })

  await supabase.from('drivers').update({ is_available: false }).eq('id', closestDriver.id)

  const distance = Math.round(closestDriver.dist_meters);
  await sendWhatsAppMessage(from, `We've found a driver for you! ${closestDriver.name} is approximately ${distance} meters away. We're waiting for confirmation.`)
  await sendWhatsAppMessage(
    closestDriver.phone_number,
    `New Ride Request!\nA passenger is waiting for you approximately ${distance} meters away.\n\nReply "accept" to take this ride or "decline" to pass.`
  )
}

// Handles replies from registered drivers
async function handleDriverMessage(supabase: SupabaseAdminClient, driver: Driver, body: string) {
  const { data: ride } = await supabase
    .from('rides')
    .select('id, passenger_phone')
    .eq('driver_id', driver.id)
    .eq('status', 'requested')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!ride) {
    await sendWhatsAppMessage(driver.phone_number, "Thanks, but you don't have any pending ride requests right now.")
    return
  }

  if (body.includes('accept')) {
    await supabase.from('rides').update({ status: 'accepted' }).eq('id', ride.id)
    await sendWhatsAppMessage(driver.phone_number, "Ride accepted! Please proceed to the pickup location.")
    await sendWhatsAppMessage(ride.passenger_phone, `Your ride is confirmed! ${driver.name} is on the way.`)
  } else if (body.includes('decline')) {
    await supabase.from('drivers').update({ is_available: true }).eq('id', driver.id)
    await supabase.from('rides').update({ status: 'cancelled' }).eq('id', ride.id)
    await sendWhatsAppMessage(driver.phone_number, "Ride declined. You are now available for other requests.")
    await sendWhatsAppMessage(ride.passenger_phone, "We're sorry, the driver was unable to take your request. We are looking for another driver.")
    // Note: Here you could add logic to find the *next* closest driver.
  } else if (body.includes('complete')) {
    await supabase.from('rides').update({ status: 'completed' }).eq('driver_id', driver.id).eq('status', 'accepted')
    await supabase.from('drivers').update({ is_available: true }).eq('id', driver.id)
    await sendWhatsAppMessage(driver.phone_number, "Ride marked as complete. You are now available for new requests.")
    await sendWhatsAppMessage(ride.passenger_phone, "Thanks for riding with us! We hope you enjoyed your trip.")
  } else {
    await sendWhatsAppMessage(driver.phone_number, 'Sorry, I didn\'t understand that. Please reply with "accept", "decline", or "complete".')
  }
}

// Helper function to send WhatsApp messages
async function sendWhatsAppMessage(to: string, text: string) {
  const endpoint = `https://graph.facebook.com/v18.0/${META_PHONE_NUMBER_ID}/messages`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${META_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: text },
    }),
  })
  if (!response.ok) {
    console.error(`Failed to send message to ${to}:`, await response.json())
  }
}