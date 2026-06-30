import { Resend } from "resend";

export async function handler(event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};

    // Netlify sends different payload shapes depending on how webhook is configured.
    // Try to extract submission fields in a flexible way.
    const submission = body.payload || body.submission || body || {};

    // If submission has `fields` array (Netlify's webhook option), convert to object
    let fields = {};
    if (Array.isArray(submission.fields)) {
      submission.fields.forEach((f) => {
        fields[f.name] = f.value;
      });
    } else if (submission.data) {
      fields = submission.data;
    } else {
      fields = submission;
    }

    const name = fields.name || fields.Nom || "Anonyme";
    const email = fields.email || fields.Email || "";
    const subject = fields.subject || "Nouveau message via formulaire";
    const message = fields.message || fields.Message || "(pas de message)";

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not set in environment");
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          error: "Email service not configured",
        }),
      };
    }

    const resend = new Resend(apiKey);

    const contactTo = process.env.CONTACT_TO_EMAIL || "payoussy@hotmail.fr";
    const contactFrom = process.env.CONTACT_FROM_EMAIL || "noreply@resend.dev";

    const html = `
      <h2>Nouveau message formulaire</h2>
      <p><strong>Nom:</strong> ${String(name)}</p>
      <p><strong>Email:</strong> ${String(email)}</p>
      <p><strong>Sujet:</strong> ${String(subject)}</p>
      <hr />
      <p>${String(message).replace(/\n/g, "<br>")}</p>
    `;

    await resend.emails.send({
      from: contactFrom,
      to: contactTo,
      replyTo: email || undefined,
      subject: `Formulaire: ${String(subject)}`,
      html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("sendFormEmail error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(err) }),
    };
  }
}
