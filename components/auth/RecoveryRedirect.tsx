"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function RecoveryRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    const goToReset = () => {
      if (pathname !== "/auth/reset") router.replace("/auth/reset");
    };

    // The hash is used by Supabase's implicit recovery links. Reading it here
    // also covers old e-mails whose redirect_to pointed to the home page.
    const { data } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event === "PASSWORD_RECOVERY") goToReset();
    });

    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    if (hash.get("type") === "recovery") {
      // Let the Supabase client consume the tokens before removing the hash.
      void supabase.auth.getSession().then(({ data: sessionData }: { data: { session: unknown } }) => {
        if (sessionData.session) goToReset();
      });
    }
    return () => data.subscription.unsubscribe();
  }, [pathname, router]);

  return null;
}
