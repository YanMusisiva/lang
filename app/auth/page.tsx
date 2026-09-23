"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { useLang } from "@/context/LangContext";

function AuthForm() {
  const { t } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
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
      setError(t("La plateforme n'est pas encore reliée à Supabase.", "The platform is not connected to Supabase yet."));
      return;
    }

    setLoading(true);
    setError("");
    if (mode === "forgot") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset`,
      });
      setLoading(false);
      if (resetError) setError(resetError.message);
      else setNotice(t("Si cette adresse correspond à un compte, un lien de réinitialisation vient d’être envoyé.", "If this address matches an account, a reset link has been sent."));
      return;
    }

    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/practice`,
          },
        });
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setNotice(t("Compte créé. Consultez votre e-mail pour confirmer votre adresse.", "Account created. Check your email to confirm your address."));
      return;
    }

    router.push(searchParams.get("next") || "/practice");
    router.refresh();
  }

  return (
    <main className="interior-page min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 pb-16 pt-28">
      <Navbar />
      <section className="w-full max-w-md border border-white/10 bg-white/[0.03] p-8 rounded-3xl">
        <Link href="/" className="text-[#c9a84c] text-sm">← LangListening</Link>
        <h1 className="font-serif text-4xl mt-8 mb-2">
          {mode === "login" ? t("Bon retour", "Welcome back") : mode === "signup" ? t("Créer votre compte", "Create your account") : t("Réinitialiser le mot de passe", "Reset your password")}
        </h1>
        <p className="text-white/55 mb-8">
          {mode === "forgot" ? t("Saisissez votre e-mail pour recevoir un lien sécurisé.", "Enter your email to receive a secure link.") : t("Retrouvez votre progression sur tous vos appareils.", "Keep your progress synced across all your devices.")}
        </p>

        <form onSubmit={submit} className="space-y-5">
          {mode === "signup" && (
            <label className="block text-sm text-white/70">
              {t("Nom", "Name")}
              <input required minLength={2} value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" />
            </label>
          )}
          <label className="block text-sm text-white/70">
            Email
            <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" />
          </label>
          {mode !== "forgot" && <label className="block text-sm text-white/70">
            {t("Mot de passe", "Password")}
            <input required minLength={8} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" />
          </label>}
          {mode === "login" && <button type="button" onClick={() => { setMode("forgot"); setError(""); setNotice(""); }} className="text-sm text-[#e8c96a] hover:underline">{t("Mot de passe oublié ?", "Forgot password?")}</button>}
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          {notice && <p role="status" className="text-sm text-green-400">{notice}</p>}
          <button disabled={loading} className="w-full rounded bg-[#c9a84c] px-5 py-3.5 font-semibold text-black disabled:opacity-50">
            {loading ? t("Veuillez patienter...", "Please wait...") : mode === "login" ? t("Se connecter", "Sign in") : mode === "signup" ? t("Créer le compte", "Create account") : t("Envoyer le lien", "Send reset link")}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setNotice(""); }} className="mt-6 w-full text-sm text-white/60 hover:text-white">
          {mode === "login" ? t("Pas encore de compte ? S'inscrire", "No account yet? Sign up") : t("Retour à la connexion", "Back to sign in")}
        </button>
      </section>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<main className="interior-page min-h-screen bg-[#0a0a0a]" />}>
      <AuthForm />
    </Suspense>
  );
}
