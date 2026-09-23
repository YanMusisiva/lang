import nodemailer from "nodemailer";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(150),
  phone: z.string().trim().min(7).max(25).regex(/^[0-9+().\s-]+$/),
  level: z.enum(["", "beginner", "intermediate", "advanced", "test"]),
  path: z.enum(["general", "professional", "entrepreneur", "developer"]),
  motivation: z.string().trim().min(10).max(600),
  selectedOffer: z.enum(["", "group", "coaching"]),
  website: z.string().max(0),
  startedAt: z.number().int().positive(),
});

const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 4;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return Response.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success || Date.now() - (typeof body === "object" && body && "startedAt" in body ? Number(body.startedAt) : Date.now()) < 2500) {
    return Response.json({ error: "Vérifiez les informations du formulaire." }, { status: 400 });
  }

  const { name, email, phone, level, path, motivation, selectedOffer } = parsed.data;
  if (!isSupabaseConfigured()) return Response.json({ error: "Le service d’inscription n’est pas encore configuré." }, { status: 503 });

  const supabase = await createClient();
  const { error: databaseError } = await supabase.from("programme_registrations").insert({
    name, email, phone, level: level || null, programme: path, selected_offer: selectedOffer || null, motivation,
  });
  if (databaseError) return Response.json({ error: "La demande n’a pas pu être enregistrée." }, { status: 500 });

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    const safe = { name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone), level: escapeHtml(level || "Non précisé"), path: escapeHtml(path), offer: escapeHtml(selectedOffer || "Aucune offre présélectionnée"), motivation: escapeHtml(motivation).replace(/\n/g, "<br>") };
    try {
      await transporter.sendMail({
        from: `"LangListening Inscriptions" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `Nouvelle inscription au programme — ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nNiveau: ${level || "Non précisé"}\nParcours: ${path}\nOffre choisie: ${selectedOffer || "Aucune"}\n\n${motivation}`,
        html: `<div style="font-family:sans-serif;color:#222"><h2>Nouvelle inscription au programme</h2><p><b>Nom :</b> ${safe.name}</p><p><b>Email :</b> ${safe.email}</p><p><b>Téléphone :</b> ${safe.phone}</p><p><b>Niveau :</b> ${safe.level}</p><p><b>Parcours :</b> ${safe.path}</p><p><b>Offre choisie :</b> ${safe.offer}</p><p><b>Motivation :</b><br>${safe.motivation}</p></div>`,
      });
    } catch (mailError) {
      console.error("Programme registration email failed", mailError);
    }
  }

  return Response.json({ success: true }, { status: 201 });
}
