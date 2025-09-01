import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// These will be loaded from secrets once your Meta account is ready
const META_TOKEN = Deno.env.get('META_PERMANENT_TOKEN')
const META_PHONE_NUMBER_ID = Deno.env.get('META_PHONE_NUMBER_ID')
const META_VERIFY_TOKEN = Deno.env.get('META_VERIFY_TOKEN')

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
  
  // This part handles Meta's one-time verification request
  if (req.method === 'GET') {
    const url = new URL(req.url)
    const mode = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const challenge = url.searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
      console.log("Webhook verified successfully!");
      return new Response(challenge, { status: 200 })
    } else {
      console.error("Webhook verification failed.");
      return new Response('Failed validation. Make sure the validation tokens match.', { status: 403 })
    }
  }

  // This part handles incoming WhatsApp messages
  if (req.method === 'POST') {
    try {
      const payload = await req.json()
      const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

      if (!message || message.type !== 'text') {
        return new Response('ok') // Not a text message
      }
      
      const from = message.from
      const body = message.text.body

      // Find an available driver
      const { data: driver } = await supabase
        .from('drivers')
        .select('*')
        .eq('is_available', true)
        .limit(1)
        .single()

      if (!driver) {
        await sendWhatsAppMessage(from, 'Sorry, all our drivers are currently busy. Please try again in a few minutes.')
        return new Response('No available drivers')
      }

      // Create a ride record
      await supabase.from('rides').insert({
        passenger_phone: from,
        driver_id: driver.id,
        pickup_location_text: body,
        status: 'accepted',
      })

      // Make the driver unavailable
      await supabase.from('drivers').update({ is_available: false }).eq('id', driver.id)

      // Send confirmations
      await sendWhatsAppMessage(from, `Ride confirmed! ${driver.name} is on the way.`)
      await sendWhatsAppMessage(driver.phone_number, `New Ride Request!\nFrom: ${from}\nPickup: ${body}`)

      return new Response('ok')
    } catch (error) {
      console.error('Error processing message:', error)
      return new Response('Error', { status: 500 })
    }
  }

  return new Response('Method Not Allowed', { status: 405 })
})

// Helper function to send messages via Meta's API
async function sendWhatsAppMessage(to: string, text: string) {
  const endpoint = `https://graph.facebook.com/v18.0/${META_PHONE_NUMBER_ID}/messages`
  
  await fetch(endpoint, {
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
}