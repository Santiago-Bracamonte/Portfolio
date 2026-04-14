export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    try {
      const body = await request.json();
      const { from_name, from_email, subject, message } = body || {};

      if (!from_name || !from_email || !subject || !message) {
        return json({ error: "Missing required fields" }, 400, corsHeaders);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(from_email)) {
        return json({ error: "Invalid email address" }, 400, corsHeaders);
      }

      const fromEmail = env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [env.CONTACT_TO_EMAIL],
          reply_to: String(from_email).slice(0, 200),
          subject: `Portfolio: ${String(subject).slice(0, 150)}`,
          html: `
            <h2>Nuevo mensaje desde el portfolio</h2>
            <p><strong>Nombre:</strong> ${String(from_name).slice(0, 120)}</p>
            <p><strong>Email:</strong> ${String(from_email).slice(0, 200)}</p>
            <p><strong>Asunto:</strong> ${String(subject).slice(0, 150)}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${String(message).slice(0, 5000).replace(/\n/g, "<br>")}</p>
          `
        })
      });

      if (!resendResponse.ok) {
        let resendError;
        try {
          resendError = await resendResponse.json();
        } catch {
          resendError = { message: await resendResponse.text() };
        }

        const resendMessage = resendError?.message || resendError?.error?.message || "Failed to send email";
        return json({ error: resendMessage }, 502, corsHeaders);
      }

      return json({ ok: true }, 200, corsHeaders);
    } catch (error) {
      return json({ error: "Internal server error" }, 500, corsHeaders);
    }
  }
};

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
}
