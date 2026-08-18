"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      setError("La plateforme n'est pas encore reliée à Supabase.");
      return;
    }

    setLoading(true);
    setError("");
    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setNotice("Compte créé. Consultez votre email pour confirmer votre adresse.");
      return;
    }

    router.push(searchParams.get("next") || "/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-md border border-white/10 bg-white/[0.03] p-8 rounded-lg">
        <Link href="/" className="text-[#c9a84c] text-sm">← LangListening</Link>
        <h1 className="font-serif text-4xl mt-8 mb-2">
          {mode === "login" ? "Bon retour" : "Créer votre compte"}
        </h1>
        <p className="text-white/55 mb-8">
          Retrouvez votre progression sur tous vos appareils.
        </p>

        <form onSubmit={submit} className="space-y-5">
          {mode === "signup" && (
            <label className="block text-sm text-white/70">
              Nom
              <input required minLength={2} value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" />
            </label>
          )}
          <label className="block text-sm text-white/70">
            Email
            <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" />
          </label>
          <label className="block text-sm text-white/70">
            Mot de passe
            <input required minLength={8} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" />
          </label>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          {notice && <p role="status" className="text-sm text-green-400">{notice}</p>}
          <button disabled={loading} className="w-full rounded bg-[#c9a84c] px-5 py-3.5 font-semibold text-black disabled:opacity-50">
            {loading ? "Veuillez patienter..." : mode === "login" ? "Se connecter" : "Créer le compte"}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="mt-6 w-full text-sm text-white/60 hover:text-white">
          {mode === "login" ? "Pas encore de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
        </button>
      </section>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#0a0a0a]" />}>
      <AuthForm />
    </Suspense>
  );
}
