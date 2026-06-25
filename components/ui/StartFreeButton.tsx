import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function StartFreeButton({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useLang();
  return (
    <Link
      href="/practice"
      className={`inline-block bg-[#c9a84c] text-black font-semibold px-9 py-4 rounded-xl text-base tracking-wide hover:bg-[#e8c96a] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-200 whitespace-nowrap ${className}`}
    >
      {t("Commencer gratuitement", "Start for free")}
    </Link>
  );
}
