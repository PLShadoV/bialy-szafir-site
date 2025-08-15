import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, subject, message } = await req.json();
    
    console.log("Contact form data received:", { name, email, subject });

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Wszystkie pola są wymagane" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Błąd konfiguracji serwera" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailData = {
      from: "kontakt@szafirrusinowo.pl",
      to: ["info@szafirrusinowo.pl"],
      reply_to: email,
      subject: `Formularz kontaktowy: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nowa wiadomość z formularza kontaktowego</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Imię i nazwisko:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            <p><strong>Temat:</strong> ${subject}</p>
            <div style="margin-top: 20px;">
              <strong>Wiadomość:</strong>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            Ta wiadomość została wysłana przez formularz kontaktowy na stronie szafirrusinowo.pl
          </p>
        </div>
      `,
    };

    console.log("Sending email via Resend API...");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("Resend API error:", result);
      throw new Error(`Resend API error: ${JSON.stringify(result)}`);
    }

    console.log("Email sent successfully:", result.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Wiadomość została wysłana pomyślnie",
        id: result.id 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ 
        error: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.",
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});