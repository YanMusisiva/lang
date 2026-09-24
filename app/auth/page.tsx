"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import { useLang } from "@/context/LangContext";

function AuthForm() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  useEffect(() => {
    const authError = searchParams.get("error");
    if (authError === "confirmation") setError(t("Le lien de confirmation est invalide ou expiré. Demandez un nouvel e-mail de confirmation.", "The confirmation link is invalid or expired. Request a new confirmation email."));
    if (authError === "recovery") setError(t("Le lien de récupération est invalide ou expiré. Recommencez la procédure « Mot de passe oublié ».", "The recovery link is invalid or expired. Start the “Forgot password” process again."));
  }, [searchParams, t]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      setError(t("La plateforme n'est pas encore reliée à Supabase.", "The platform is not connected to Supabase yet."));
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");
    setNeedsConfirmation(false);
    const normalizedEmail = email.trim().toLowerCase();
    if (mode === "forgot") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/auth/recovery`,
      });
      setLoading(false);
      if (resetError) setError(resetError.message);
      else setNotice(t("Si cette adresse correspond à un compte, un lien de réinitialisation vient d’être envoyé.", "If this address matches an account, a reset link has been sent."));
      return;
    }

    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email: normalizedEmail, password })
      : await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/practice`,
          },
        });
    setLoading(false);

    if (result.error) {
      if (result.error.code === "email_not_confirmed") {
        setError(t("Votre adresse e-mail n’est pas encore confirmée. Ouvrez l’e-mail envoyé par LangListening ou demandez-en un nouveau ci-dessous.", "Your email address has not been confirmed yet. Open the email sent by LangListening or request a new one below."));
        setNeedsConfirmation(true);
      } else if (result.error.code === "invalid_credentials") {
        setError(t("E-mail ou mot de passe incorrect. Si le compte vient d’être créé, confirmez d’abord votre adresse e-mail.", "Incorrect email or password. If the account was just created, confirm your email address first."));
        setNeedsConfirmation(true);
      } else {
        setError(result.error.message);
      }
      return;
    }

    if (mode === "signup" && !result.data.session) {
      if (result.data.user?.identities?.length === 0) {
        setError(t("Cette adresse est déjà associée à un compte. Connectez-vous ou utilisez « Mot de passe oublié ».", "This email address is already linked to an account. Sign in or use “Forgot password”."));
        return;
      }
      setNotice(t("Compte créé. Consultez votre e-mail pour confirmer votre adresse.", "Account created. Check your email to confirm your address."));
      setNeedsConfirmation(true);
      return;
    }

    const requestedNext = searchParams.get("next");
    const safeNext = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/practice";
    window.location.assign(safeNext);
  }

  async function resendConfirmation() {
    const supabase = createClient();
    if (!supabase || !email.trim()) return;
    setLoading(true);
    setError("");
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/practice` },
    });
    setLoading(false);
    if (resendError) setError(resendError.message);
    else setNotice(t("Un nouvel e-mail de confirmation a été envoyé. Vérifiez aussi les courriers indésirables.", "A new confirmation email has been sent. Also check your spam folder."));
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
          {needsConfirmation && mode !== "forgot" && <button type="button" disabled={loading} onClick={resendConfirmation} className="w-full rounded border border-[#c9a84c]/40 px-4 py-3 text-sm text-[#e8c96a] hover:bg-[#c9a84c]/10 disabled:opacity-50">{t("Renvoyer l’e-mail de confirmation", "Resend confirmation email")}</button>}
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
