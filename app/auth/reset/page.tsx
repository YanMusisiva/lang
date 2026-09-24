"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { useLang } from "@/context/LangContext";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const { t } = useLang();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);
  const [recoveryReady, setRecoveryReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setError(t("Le service de connexion n’est pas configuré.", "Authentication is not configured."));
      setCheckingLink(false);
      return;
    }

    let active = true;
    async function prepareRecovery() {
      const { data: { session } } = await supabase!.auth.getSession();
      if (!active) return;
      setRecoveryReady(Boolean(session));
      if (!session) setError(t("Ouvrez cette page depuis le lien reçu par e-mail.", "Open this page from the link received by email."));
      setCheckingLink(false);
    }
    void prepareRecovery();
    return () => { active = false; };
  }, [t]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError(t("Les mots de passe ne correspondent pas.", "Passwords do not match."));
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError(t("Le service de connexion n’est pas configuré.", "Authentication is not configured."));
      return;
    }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(t("Ce lien est invalide ou expiré. Demandez un nouveau lien.", "This link is invalid or expired. Request a new link."));
      return;
    }
    window.location.assign("/practice");
  }

  return (
    <main className="interior-page flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 pb-16 pt-28 text-white">
      <Navbar />
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <Link href="/auth" className="text-sm text-[#c9a84c]">← {t("Connexion", "Sign in")}</Link>
        <h1 className="mt-8 text-4xl">{t("Nouveau mot de passe", "New password")}</h1>
        <p className="mb-8 mt-3 text-sm text-white/55">{t("Choisissez un mot de passe d’au moins 8 caractères.", "Choose a password with at least 8 characters.")}</p>
        <form onSubmit={submit} className="space-y-5">
          <label className="block text-sm text-white/70">{t("Nouveau mot de passe", "New password")}<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" /></label>
          <label className="block text-sm text-white/70">{t("Confirmer le mot de passe", "Confirm password")}<input required minLength={8} type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 w-full rounded border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#c9a84c]" /></label>
          {error && <p role="alert" className="rounded-lg border border-red-400/25 bg-red-400/10 p-3 text-sm text-red-300">{error}</p>}
          <button disabled={loading || checkingLink || !recoveryReady} className="w-full rounded bg-[#c9a84c] px-5 py-3.5 font-semibold text-black disabled:opacity-50">{checkingLink ? t("Vérification du lien…", "Checking link…") : loading ? t("Mise à jour…", "Updating…") : t("Enregistrer le nouveau mot de passe", "Save new password")}</button>
        </form>
      </section>
    </main>
  );
}
