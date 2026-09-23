"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Archive, ArrowLeft, ExternalLink, Inbox, Mail, Search } from "lucide-react";

export type AdminMessage = {
  id: string;
  source: "registration" | "contact" | "exercise";
  title: string;
  email?: string | null;
  phone?: string | null;
  message: string;
  status: string;
  createdAt: string;
  details?: string;
  href?: string;
};

const labels = { all: "Tous", registration: "Inscriptions", contact: "Contacts", exercise: "Exercices & élèves" };
const sourceLabels = { registration: "Inscription", contact: "Contact", exercise: "Exercice / élève" };

export default function AdminMessages({ initialMessages }: { initialMessages: AdminMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [source, setSource] = useState<"all" | AdminMessage["source"]>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(initialMessages[0]?.id || null);
  const current = messages.find((item) => item.id === selected) || null;
  const filtered = useMemo(() => messages.filter((item) => {
    const matchesSource = source === "all" || item.source === source;
    const text = `${item.title} ${item.email || ""} ${item.phone || ""} ${item.message} ${item.details || ""}`.toLowerCase();
    return matchesSource && text.includes(query.toLowerCase());
  }), [messages, query, source]);
  const unread = messages.filter((item) => item.status === "new").length;

  async function changeStatus(item: AdminMessage, status: "read" | "processed" | "archived") {
    if (item.source === "exercise") return;
    const previous = messages;
    setMessages((list) => list.map((entry) => entry.id === item.id ? { ...entry, status } : entry));
    const response = await fetch("/api/admin/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, source: item.source, status }) });
    if (!response.ok) setMessages(previous);
  }

  function open(item: AdminMessage) {
    setSelected(item.id);
    if (item.status === "new" && item.source !== "exercise") void changeStatus(item, "read");
  }

  return (
    <main className="min-h-screen bg-[#070807] px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-7">
          <div><Link href="/admin" className="mb-4 inline-flex items-center gap-2 text-sm text-white/45 hover:text-white"><ArrowLeft size={15} /> Administration</Link><h1 className="text-4xl font-semibold">Messages</h1><p className="mt-2 text-sm text-white/45">{unread} nouveau{unread === 1 ? "" : "x"} message{unread === 1 ? "" : "s"}</p></div>
          <div className="relative w-full sm:w-80"><Search className="absolute left-4 top-3.5 text-white/30" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#c9a84c]" /></div>
        </header>
        <nav className="my-6 flex gap-2 overflow-x-auto pb-2">{Object.entries(labels).map(([key, label]) => <button key={key} onClick={() => setSource(key as typeof source)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs ${source === key ? "border-[#c9a84c] bg-[#c9a84c] text-black" : "border-white/10 text-white/55"}`}>{label}</button>)}</nav>

        <div className="grid min-h-[620px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] lg:grid-cols-[380px_1fr]">
          <section className="border-b border-white/10 lg:border-b-0 lg:border-r">
            {filtered.length === 0 && <div className="grid place-items-center px-6 py-24 text-center text-white/35"><Inbox size={35} /><p className="mt-3 text-sm">Aucun message</p></div>}
            {filtered.map((item) => <button key={`${item.source}-${item.id}`} onClick={() => open(item)} className={`block w-full border-b border-white/8 p-5 text-left hover:bg-white/5 ${selected === item.id ? "bg-white/[0.06]" : ""}`}>
              <div className="flex items-center justify-between gap-3"><span className="text-[10px] uppercase tracking-wider text-[#e8c96a]">{sourceLabels[item.source]}</span><span className="text-[10px] text-white/30">{new Date(item.createdAt).toLocaleDateString("fr-FR")}</span></div>
              <div className="mt-2 flex items-center gap-2"><h2 className="truncate text-sm font-semibold">{item.title}</h2>{item.status === "new" && <span className="h-2 w-2 shrink-0 rounded-full bg-[#c9a84c]" />}</div>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/45">{item.message}</p>
            </button>)}
          </section>

          <section className="p-6 sm:p-9">
            {!current ? <div className="grid h-full place-items-center text-white/30"><p>Sélectionnez un message</p></div> : <article>
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6"><div><span className="text-xs uppercase tracking-widest text-[#e8c96a]">{sourceLabels[current.source]}</span><h2 className="mt-3 text-2xl font-semibold">{current.title}</h2><p className="mt-2 text-xs text-white/35">{new Date(current.createdAt).toLocaleString("fr-FR")}</p></div><div className="flex gap-2">{current.source !== "exercise" && <><button onClick={() => changeStatus(current, "processed")} className="rounded-full border border-white/15 px-4 py-2 text-xs hover:border-[#c9a84c]">Marquer traité</button><button onClick={() => changeStatus(current, "archived")} aria-label="Archiver" className="rounded-full border border-white/15 p-2.5 hover:border-[#c9a84c]"><Archive size={16} /></button></>}</div></div>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">{current.email && <div><dt className="text-xs text-white/35">E-mail</dt><dd className="mt-1"><a href={`mailto:${current.email}`} className="text-[#e8c96a]">{current.email}</a></dd></div>}{current.phone && <div><dt className="text-xs text-white/35">Téléphone</dt><dd className="mt-1"><a href={`tel:${current.phone}`}>{current.phone}</a></dd></div>}{current.details && <div><dt className="text-xs text-white/35">Détails</dt><dd className="mt-1">{current.details}</dd></div>}</dl>
              <div className="mt-8 rounded-xl border border-white/10 bg-black/25 p-6"><p className="whitespace-pre-wrap text-sm leading-7 text-white/80">{current.message}</p></div>
              <div className="mt-6 flex flex-wrap gap-3">{current.email && <a href={`mailto:${current.email}`} className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-black"><Mail size={16} /> Répondre</a>}{current.href && <Link href={current.href} className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-black">Ouvrir la conversation <ExternalLink size={15} /></Link>}</div>
            </article>}
          </section>
        </div>
      </div>
    </main>
  );
}
