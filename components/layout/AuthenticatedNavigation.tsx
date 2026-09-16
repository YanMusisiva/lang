"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function AuthenticatedNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    void supabase.auth.getUser().then(
      ({ data }: { data: { user: unknown } }) => setSignedIn(Boolean(data.user)),
    );
    const { data } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => setSignedIn(Boolean(session)),
    );

    return () => data.subscription.unsubscribe();
  }, []);

  if (!signedIn || pathname === "/auth") return null;

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/dashboard");
  }

  return (
    <nav
      aria-label="Navigation de l'espace personnel"
      className="fixed bottom-4 left-4 z-[70] flex items-center gap-1 rounded-md border border-white/15 bg-[#0a0a0a]/95 p-1 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6"
    >
      <button
        type="button"
        onClick={goBack}
        title="Page précédente"
        aria-label="Revenir à la page précédente"
        className="inline-flex h-10 w-10 items-center justify-center rounded text-white/70 transition hover:bg-white/10 hover:text-[#e8c96a]"
      >
        <ArrowLeft size={19} aria-hidden="true" />
      </button>
      {pathname !== "/dashboard" && (
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          title="Mes données"
          aria-label="Accéder à mes données"
          className="inline-flex h-10 items-center gap-2 rounded px-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-[#e8c96a]"
        >
          <LayoutDashboard size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Mes données</span>
        </button>
      )}
    </nav>
  );
}
