"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ExternalLink,
  FileText,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Vue générale", icon: LayoutDashboard, exact: true },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/learning", label: "Leçons et exercices", icon: BookOpen },
  { href: "/admin/tests", label: "Tests de niveau", icon: BarChart3 },
];

export default function AdminShell({
  children,
  email,
  name,
}: {
  children: React.ReactNode;
  email: string;
  name?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  const sidebar = (
    <aside className="flex h-full w-[284px] flex-col border-r border-[#c9a84c]/20 bg-[#0b0c0a] text-white">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <Link href="/admin" onClick={() => setOpen(false)} className="font-serif text-xl tracking-wide">
          LANG<span className="text-[#d4b85e]">LISTENING</span>
        </Link>
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Fermer le menu">
          <X size={22} />
        </button>
      </div>

      <div className="px-5 pb-2 pt-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d4b85e]/70">
        Administration
      </div>
      <nav className="space-y-1 px-3" aria-label="Navigation administrateur">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                active
                  ? "bg-[#d4b85e] font-semibold text-[#11120f]"
                  : "text-white/65 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4b85e] font-serif text-[#11120f]">
            {(name || email).charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{name || "Administrateur"}</p>
            <p className="truncate text-xs text-white/45">{email}</p>
          </div>
        </div>
        <Link href="/" className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white">
          <ExternalLink size={16} /> Voir le site
        </Link>
        <button onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white">
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f5f3ed] text-[#171812]">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">{sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Fermer le menu" className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative h-full w-[284px]">{sidebar}</div>
        </div>
      )}
      <div className="lg:pl-[284px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 bg-white/90 px-5 backdrop-blur md:px-8">
          <button className="rounded-lg border border-black/10 p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Ouvrir le menu">
            <Menu size={21} />
          </button>
          <p className="hidden text-sm text-black/50 sm:block">Espace administrateur</p>
          <Link href="/practice" className="flex items-center gap-2 text-sm font-medium text-[#8a6c18] hover:text-[#5f4a10]">
            <GraduationCap size={18} /> Voir les exercices
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
