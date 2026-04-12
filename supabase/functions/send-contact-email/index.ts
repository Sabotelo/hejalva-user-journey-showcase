import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOWED_ORIGINS = [
  'https://hejalva.com',
  'https://www.hejalva.com',
  'https://hejalva-user-journey-showcase.lovable.app',
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin || '') ? origin! : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { name, email, message, phone, company } = body;

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid name provided.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email provided.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.length > 2000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message must be between 5 and 2000 characters.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    if (phone && (typeof phone !== 'string' || phone.length > 20)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid phone number.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const isValidEmail = emailRegex.test(email)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: contactData, error: dbError } = await supabaseClient
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        phone: phone?.trim() || null,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to save message. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      console.error('Resend API key not configured')
      return new Response(
        JSON.stringify({ success: false, error: 'Email service is temporarily unavailable.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const emailContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Ny kontaktförfrågan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Namn:       ${name.trim()}
Telefon:    ${phone?.trim() || 'Ej angivet'}
E-post:     ${email.trim()}
Företag:    ${company?.toString().substring(0, 200) || 'Ej angivet'}

Syfte:
${message.trim()}

Tidpunkt:   ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim()

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Hej Alva <hej@hejalva.com>',
        to: ['damianarango58@gmail.com'],
        cc: ['zeda21h@pm.me', 'lavolbrian@gmail.com', 'danyakreyg20@gmail.com'],
        subject: `New Contact Message from ${name.trim().substring(0, 50)}`,
        text: emailContent,
        ...(isValidEmail ? { reply_to: email.trim() } : {}),
      }),
    })

    if (!emailResponse.ok) {
      console.error('Email send failed:', await emailResponse.text())
      // Message was saved to DB, so still partial success
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact message sent successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Internal error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An error occurred processing your request.'
      }),
      {
        headers: { ...getCorsHeaders(req.headers.get('origin')), 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
