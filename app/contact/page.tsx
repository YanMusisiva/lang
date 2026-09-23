"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useLang } from "@/context/LangContext";

const initial = { name: "", email: "", phone: "", level: "", message: "", website: "" };

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState(initial);
  const [startedAt] = useState(() => Date.now());
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const input = "w-full rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-[#c9a84c]";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending"); setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, startedAt }) });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Impossible d’envoyer le message.");
      setForm(initial); setState("success");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Une erreur est survenue."); setState("error"); }
  }

  return (
    <main className="interior-page min-h-screen bg-[#0a0a0a] px-6 pb-24 pt-36 text-white">
      <Navbar />
      <div className="contact-layout mx-auto w-full">
        <section className="page-heading mb-12">
          <div className="mb-6 inline-block rounded-full border border-[#c9a84c]/50 px-4 py-1 text-xs uppercase tracking-widest text-[#e8c96a]">Contact</div>
          <h1 className="mb-4 text-4xl sm:text-6xl">{t("Parlons de votre anglais", "Let’s talk about your English")}</h1>
          <p className="max-w-md text-white/60">{t("Écrivez-nous. Notre équipe lira votre message directement.", "Write to us. Our team will read your message directly.")}</p>
        </section>
        <form onSubmit={submit} className="contact-form space-y-5">
          <input required minLength={2} maxLength={80} autoComplete="name" placeholder={t("Votre nom", "Your name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
          <input required type="email" maxLength={150} autoComplete="email" placeholder={t("Votre adresse e-mail", "Your email address")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
          <input type="tel" maxLength={25} autoComplete="tel" placeholder={t("Téléphone / WhatsApp (facultatif)", "Phone / WhatsApp (optional)")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
          <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className={input}>
            <option value="">{t("Niveau (facultatif)", "Level (optional)")}</option><option value="Débutant">{t("Débutant", "Beginner")}</option><option value="Intermédiaire">{t("Intermédiaire", "Intermediate")}</option><option value="Avancé">{t("Avancé", "Advanced")}</option>
          </select>
          <textarea required minLength={10} maxLength={1000} rows={6} placeholder={t("Votre message", "Your message")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${input} resize-none`} />
          <div className="absolute -left-[10000px]" aria-hidden="true"><label>Site web<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></label></div>
          {state === "success" && <p role="status" className="rounded-lg border border-green-400/25 bg-green-400/10 p-4 text-sm text-green-300">{t("Message envoyé. Nous vous répondrons rapidement.", "Message sent. We’ll reply shortly.")}</p>}
          {error && <p role="alert" className="rounded-lg border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-300">{error}</p>}
          <button disabled={state === "sending"} className="w-full rounded-lg bg-[#c9a84c] py-4 font-semibold text-black hover:bg-[#e8c96a] disabled:opacity-50">{state === "sending" ? t("Envoi…", "Sending…") : t("Envoyer le message", "Send message")}</button>
        </form>
      </div>
    </main>
  );
}
