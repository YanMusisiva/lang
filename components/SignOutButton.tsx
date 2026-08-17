"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await createClient()?.auth.signOut();
        router.push("/");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
    >
      <LogOut size={16} /> Déconnexion
    </button>
  );
}
