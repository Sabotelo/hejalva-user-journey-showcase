import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message, phone } = await req.json()

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Store the message in the database
    const { data: contactData, error: dbError } = await supabaseClient
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
        phone,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    // Send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      throw new Error('Resend API key not configured')
    }

    const emailContent = `
      New Contact Form Submission from ${name}
      
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      
      Message:
      ${message}
      
      Submitted at: ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}
    `

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Hej Alva <noreply@hejalva.com>',
        to: ['dev@hejalva.com'],
        subject: `New Contact Message from ${name}`,
        text: emailContent,
        reply_to: email,
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Resend API error:', errorText)
      throw new Error(`Failed to send email: ${errorText}`)
    }

    const emailData = await emailResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact message sent successfully',
        messageId: contactData.id,
        emailId: emailData.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in send-contact-email function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An unexpected error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})