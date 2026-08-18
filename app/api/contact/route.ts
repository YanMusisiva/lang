import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.email().max(150),
  message: z.string().trim().min(10).max(1000),
});

const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]!);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });
  }

  let body: unknown;
  try { body = await request.json(); } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Vérifiez le nom, l'email et le message." }, { status: 400 });
  }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return Response.json({ error: "Service de contact non configuré." }, { status: 503 });
  }

  const { name, email, message } = parsed.data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"LangListening Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: "Nouveau message LangListening",
      text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<div style="font-family:sans-serif;color:#222"><h2>Nouveau message LangListening</h2><p><b>Nom:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p><b>Message:</b><br>${safeMessage}</p></div>`,
    });
    await transporter.sendMail({
      from: `"LangListening" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Nous avons reçu votre message",
      text: `Bonjour ${name},\n\nMerci d'avoir contacté LangListening. Nous vous répondrons rapidement.\n\nL'équipe LangListening`,
      html: `<div style="font-family:sans-serif;color:#222"><h2>Merci ${safeName}</h2><p>Nous avons bien reçu votre message et nous vous répondrons rapidement.</p><p>L'équipe LangListening</p></div>`,
    });
  } catch {
    return Response.json({ error: "L'envoi du message a échoué." }, { status: 502 });
  }
  return Response.json({ success: true });
}
