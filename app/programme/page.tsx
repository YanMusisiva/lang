"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const paths = [
  { value: "general", label: "Anglais général", detail: "Parler avec aisance au quotidien." },
  { value: "professional", label: "Anglais professionnel", detail: "Communiquer avec confiance au travail." },
  { value: "entrepreneur", label: "Anglais des entrepreneurs", detail: "Présenter, négocier et développer son activité." },
  { value: "developer", label: "Anglais des développeurs", detail: "Collaborer et évoluer dans la tech." },
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

export default function ProgrammeRegistrationPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

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
        body: JSON.stringify({ ...form, startedAt }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Impossible d’envoyer votre demande.");
      setForm(initialForm);
      setStatus("success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Une erreur est survenue.");
      setStatus("error");
    }
  }

  return (
    <main className="interior-page min-h-screen bg-[#080908] text-white">
      <Navbar />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-24 pt-36 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <section className="lg:sticky lg:top-36 lg:self-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/35 bg-[#c9a84c]/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#e8c96a]">
            <Clock3 size={14} /> Programme de 90 jours
          </div>
          <h1 className="text-4xl leading-tight sm:text-5xl">Votre anglais, avec un parcours clair.</h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
            90 jours de pratique guidée pour progresser selon votre objectif.
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
                <span className="block text-sm font-semibold text-white">{path.label}</span>
                <span className="mt-1 block text-xs leading-5 text-white/50">{path.detail}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 sm:p-9">
          {status === "success" ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center text-center" role="status">
              <CheckCircle2 size={52} className="text-[#e8c96a]" />
              <h2 className="mt-6 text-3xl font-semibold">Demande bien reçue</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
                Merci ! Nous vous contacterons prochainement pour parler de votre parcours.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm text-[#e8c96a] hover:underline">
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">S’inscrire au programme</h2>
              <p className="mt-2 text-sm text-white/50">Parlez-nous brièvement de votre objectif.</p>

              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nom complet" required>
                    <input required minLength={2} maxLength={80} autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} className="programme-input" />
                  </Field>
                  <Field label="Adresse e-mail" required>
                    <input required type="email" maxLength={150} autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="programme-input" />
                  </Field>
                </div>

                <Field label="Téléphone / WhatsApp" required>
                  <input required type="tel" minLength={7} maxLength={25} autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="programme-input" placeholder="Ex. +243…" />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Niveau (facultatif)">
                    <select value={form.level} onChange={(e) => update("level", e.target.value)} className="programme-input">
                      <option value="">Choisir un niveau</option>
                      <option value="beginner">Débutant</option>
                      <option value="intermediate">Intermédiaire</option>
                      <option value="advanced">Avancé</option>
                      <option value="test">Je ne sais pas — proposer un test</option>
                    </select>
                  </Field>
                  <Field label="Parcours souhaité" required>
                    <select required value={form.path} onChange={(e) => update("path", e.target.value)} className="programme-input">
                      <option value="">Choisir un parcours</option>
                      {paths.map((path) => <option key={path.value} value={path.value}>{path.label}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Pourquoi voulez-vous apprendre l’anglais ?" required>
                  <textarea required minLength={10} maxLength={600} rows={5} value={form.motivation} onChange={(e) => update("motivation", e.target.value)} className="programme-input resize-none" placeholder="Votre objectif en quelques mots…" />
                  <span className="mt-1 block text-right text-xs text-white/30">{form.motivation.length}/600</span>
                </Field>

                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label>Site web<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label>
                </div>

                {error && <p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}

                <button disabled={status === "sending"} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a84c] px-6 py-4 font-semibold text-black transition-colors hover:bg-[#e8c96a] disabled:cursor-wait disabled:opacity-60">
                  {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}<ArrowRight size={18} />
                </button>
                <p className="text-center text-xs leading-5 text-white/35">
                  En envoyant ce formulaire, vous acceptez d’être contacté au sujet du programme. Aucun compte n’est requis.
                </p>
              </form>
            </>
          )}
        </section>
      </div>
      <div className="pb-10 text-center text-xs text-white/30"><Link href="/" className="hover:text-white">Retour à l’accueil</Link></div>
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
