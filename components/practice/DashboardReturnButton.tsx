import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function DashboardReturnButton() {
  return (
    <Link
      href="/dashboard"
      className="fixed left-4 top-20 z-40 inline-flex h-10 items-center gap-2 rounded-md border border-white/15 bg-[#0a0a0a]/95 px-3 text-sm text-white/75 shadow-lg backdrop-blur-md transition hover:border-[#c9a84c]/60 hover:text-[#e8c96a] sm:left-6"
      aria-label="Revenir au tableau de bord"
    >
      <LayoutDashboard size={17} aria-hidden="true" />
      <span className="hidden sm:inline">Tableau de bord</span>
    </Link>
  );
}
