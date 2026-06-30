import type { APIRoute } from "astro";

// Server-only API route
export const prerender = true;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    console.log("API /api/contact - Content-Type:", contentType);

    let body: Record<string, any> = {};
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    } else {
      // try json by default
      try {
        body = await request.json();
      } catch (e) {
        body = {};
      }
    }

    console.log("API /api/contact - body:", body);

    const name = body.name || "";
    const email = body.email || "";
    const subject = body.subject || "";
    const message = body.message || "";

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Champs manquants" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    // Log presence/absence without printing the key value
    if (resendApiKey) {
      console.debug("RESEND_API_KEY loaded");
    } else {
      console.error(
        "RESEND_API_KEY missing; set RESEND_API_KEY in your environment or .env.local and restart the server",
      );
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Service d'email non configuré. Définissez RESEND_API_KEY.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    const contactToEmail =
      process.env.CONTACT_TO_EMAIL || "payoussy@hotmail.fr";
    const contactFromEmail =
      process.env.CONTACT_FROM_EMAIL || "noreply@resend.dev";

    const payloadHtml = `
      <h2>Nouveau message depuis le formulaire de contact</h2>
      <p><strong>Nom:</strong> ${String(name)}</p>
      <p><strong>Email:</strong> ${String(email)}</p>
      <p><strong>Sujet:</strong> ${String(subject) || "Sans sujet"}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${String(message).replace(/\n/g, "<br>")}</p>
      <hr />
      <p><em>Envoyé le ${new Date().toLocaleString("fr-FR")}</em></p>
    `;

    console.log("API /api/contact - sending email", { name, email, subject });

    const res = await resend.emails.send({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: String(email),
      subject: `Nouveau message de ${String(name)}: ${String(subject) || "Sans sujet"}`,
      html: payloadHtml,
    });

    console.log("API /api/contact - resend response:", res);

    return new Response(JSON.stringify({ ok: true, result: res }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API /api/contact - error", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
