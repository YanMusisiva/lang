"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useLang } from "@/context/LangContext";

const paths = [
  { value: "general", fr: "Anglais général", en: "General English", detailFr: "Parler avec aisance au quotidien.", detailEn: "Speak confidently in everyday life." },
  { value: "professional", fr: "Anglais professionnel", en: "Professional English", detailFr: "Communiquer avec confiance au travail.", detailEn: "Communicate confidently at work." },
  { value: "entrepreneur", fr: "Anglais des entrepreneurs", en: "English for entrepreneurs", detailFr: "Présenter, négocier et développer son activité.", detailEn: "Pitch, negotiate and grow your business." },
  { value: "developer", fr: "Anglais des développeurs", en: "English for developers", detailFr: "Collaborer et évoluer dans la tech.", detailEn: "Collaborate and grow in tech." },
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  level: string;
  path: string;
  motivation: string;
  website: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  level: "",
  path: "",
  motivation: "",
  website: "",
};

const offers = {
  group: { fr: "Programme en groupe — 49 $ / mois", en: "Group program — $49 / month" },
  coaching: { fr: "Coaching individuel — 149 $ / mois", en: "One-to-one coaching — $149 / month" },
} as const;

type Offer = keyof typeof offers;

export default function ProgrammeRegistrationPage() {
  const { t } = useLang();
  const [form, setForm] = useState<FormState>(initialForm);
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | "">("");

  useEffect(() => {
    const offer = new URLSearchParams(window.location.search).get("offre");
    if (offer === "group" || offer === "coaching") setSelectedOffer(offer);
  }, []);

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/programme-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, selectedOffer, startedAt }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || t("Impossible d’envoyer votre demande.", "Unable to send your request."));
      setForm(initialForm);
      setStatus("success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : t("Une erreur est survenue.", "An error occurred."));
      setStatus("error");
    }
  }

  return (
    <main className="interior-page min-h-screen bg-[#080908] text-white">
      <Navbar />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-36 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <section className="lg:sticky lg:top-36 lg:self-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/35 bg-[#c9a84c]/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#e8c96a]">
            <Clock3 size={14} /> {t("Programme de 90 jours", "90-day program")}
          </div>
          <h1 className="text-4xl leading-tight sm:text-5xl">{t("Votre anglais, avec un parcours clair.", "Your English, with a clear path.")}</h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
            {t("90 jours de pratique guidée pour progresser selon votre objectif.", "90 days of guided practice built around your goal.")}
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {paths.map((path) => (
              <button
                key={path.value}
                type="button"
                onClick={() => update("path", path.value)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  form.path === path.value
                    ? "border-[#c9a84c] bg-[#c9a84c]/10"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25"
                }`}
              >
                <span className="block text-sm font-semibold text-white">{t(path.fr, path.en)}</span>
                <span className="mt-1 block text-xs leading-5 text-white/50">{t(path.detailFr, path.detailEn)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 sm:p-9">
          {status === "success" ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center text-center" role="status">
              <CheckCircle2 size={52} className="text-[#e8c96a]" />
              <h2 className="mt-6 text-3xl font-semibold">{t("Demande bien reçue", "Request received")}</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
                {t("Merci ! Nous vous contacterons prochainement pour parler de votre parcours.", "Thank you! We’ll contact you soon to discuss your learning path.")}
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm text-[#e8c96a] hover:underline">
                {t("Envoyer une autre demande", "Send another request")}
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{t("S’inscrire au programme", "Apply for the program")}</h2>
              <p className="mt-2 text-sm text-white/50">{t("Parlez-nous brièvement de votre objectif.", "Tell us briefly about your goal.")}</p>

              {selectedOffer && (
                <div className="mt-6 rounded-2xl border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-5 py-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#e8c96a]">{t("Votre choix depuis les tarifs", "Your pricing selection")}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{t(offers[selectedOffer].fr, offers[selectedOffer].en)}</p>
                </div>
              )}

              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("Nom complet", "Full name")} required>
                    <input required minLength={2} maxLength={80} autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="programme-input" />
                  </Field>
                  <Field label={t("Adresse e-mail", "Email address")} required>
                    <input required type="email" maxLength={150} autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="programme-input" />
                  </Field>
                </div>

                <Field label={t("Téléphone / WhatsApp", "Phone / WhatsApp")} required>
                  <input required type="tel" minLength={7} maxLength={25} autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="programme-input" placeholder={t("Ex. +243…", "E.g. +256…")} />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("Niveau (facultatif)", "Level (optional)")}>
                    <select value={form.level} onChange={(e) => update("level", e.target.value)} className="programme-input">
                      <option value="">{t("Choisir un niveau", "Choose a level")}</option>
                      <option value="beginner">{t("Débutant", "Beginner")}</option>
                      <option value="intermediate">{t("Intermédiaire", "Intermediate")}</option>
                      <option value="advanced">{t("Avancé", "Advanced")}</option>
                      <option value="test">{t("Je ne sais pas — proposer un test", "I’m not sure — suggest a test")}</option>
                    </select>
                  </Field>
                  <Field label={t("Parcours souhaité", "Preferred path")} required>
                    <select required value={form.path} onChange={(e) => update("path", e.target.value)} className="programme-input">
                      <option value="">{t("Choisir un parcours", "Choose a path")}</option>
                      {paths.map((path) => <option key={path.value} value={path.value}>{t(path.fr, path.en)}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label={t("Pourquoi voulez-vous apprendre l’anglais ?", "Why do you want to learn English?")} required>
                  <textarea required minLength={10} maxLength={600} rows={5} value={form.motivation} onChange={(e) => update("motivation", e.target.value)} className="programme-input resize-none" placeholder={t("Votre objectif en quelques mots…", "Your goal in a few words…")} />
                  <span className="mt-1 block text-right text-xs text-white/30">{form.motivation.length}/600</span>
                </Field>

                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label>Site web<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label>
                </div>

                {error && <p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}

                <button disabled={status === "sending"} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a84c] px-6 py-4 font-semibold text-black transition-colors hover:bg-[#e8c96a] disabled:cursor-wait disabled:opacity-60">
                  {status === "sending" ? t("Envoi en cours…", "Sending…") : t("Envoyer ma demande", "Send my request")}<ArrowRight size={18} />
                </button>
                <p className="text-center text-xs leading-5 text-white/35">
                  {t("En envoyant ce formulaire, vous acceptez d’être contacté au sujet du programme. Aucun compte n’est requis.", "By submitting this form, you agree to be contacted about the program. No account is required.")}
                </p>
              </form>
            </>
          )}
        </section>
      </div>
      <div className="pb-10 text-center text-xs text-white/30"><Link href="/" className="hover:text-white">{t("Retour à l’accueil", "Back to home")}</Link></div>
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block text-sm text-white/65">
      <span className="mb-2 block">{label}{required && <span className="text-[#e8c96a]"> *</span>}</span>
      {children}
    </label>
  );
}
