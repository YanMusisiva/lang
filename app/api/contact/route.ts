import nodemailer from "nodemailer";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(150),
  phone: z.string().trim().max(25).regex(/^[0-9+().\s-]*$/),
  level: z.string().trim().max(40),
  message: z.string().trim().min(10).max(1000),
  website: z.string().max(0),
  startedAt: z.number().int().positive(),
});

const attempts = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < 15 * 60 * 1000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 5;
}

function html(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Requête invalide." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success || Date.now() - (typeof body === "object" && body && "startedAt" in body ? Number(body.startedAt) : Date.now()) < 2500) {
    return Response.json({ error: "Vérifiez les informations du formulaire." }, { status: 400 });
  }
  if (!isSupabaseConfigured()) return Response.json({ error: "Le service de contact n’est pas configuré." }, { status: 503 });

  const { name, email, phone, level, message } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({ name, email, phone: phone || null, level: level || null, message });
  if (error) return Response.json({ error: "Le message n’a pas pu être enregistré." }, { status: 500 });

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const mailer = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    try {
      await mailer.sendMail({
        from: `"LangListening Contact" <${process.env.SMTP_USER}>`, to: process.env.SMTP_USER, replyTo: email,
        subject: `Nouveau message — ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone || "Non précisé"}\nNiveau: ${level || "Non précisé"}\n\n${message}`,
        html: `<div style="font-family:sans-serif"><h2>Nouveau message</h2><p><b>Nom :</b> ${html(name)}</p><p><b>Email :</b> ${html(email)}</p><p><b>Téléphone :</b> ${html(phone || "Non précisé")}</p><p><b>Niveau :</b> ${html(level || "Non précisé")}</p><p>${html(message).replace(/\n/g, "<br>")}</p></div>`,
      });
    } catch (mailError) { console.error("Contact email failed", mailError); }
  }
  return Response.json({ success: true }, { status: 201 });
}
