"use client";

import { useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import { useBlog } from "@/context/BlogContext";

const empty = { title: "", titleEn: "", slug: "", excerpt: "", excerptEn: "", content: "", contentEn: "", category: "Apprentissage", categoryEn: "Learning", author: "LangListening", readTime: "5 min" };

export default function AdminArticlesPage() {
  const { articles, addArticle, deleteArticle } = useBlog();
  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState(false);
  const field = "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b18a25] focus:ring-2 focus:ring-[#c9a84c]/15";
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value, ...(key === "title" && !current.slug ? { slug: value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") } : {}) }));

  function submit(event: React.FormEvent) {
    event.preventDefault();
    addArticle({ title: { fr: form.title, en: form.titleEn || form.title }, slug: form.slug, excerpt: { fr: form.excerpt, en: form.excerptEn || form.excerpt }, content: { fr: form.content, en: form.contentEn || form.content }, category: { fr: form.category, en: form.categoryEn || form.category }, author: { fr: form.author, en: form.author }, date: new Date().toISOString().slice(0, 10), readTime: form.readTime });
    setForm(empty); setSaved(true); window.setTimeout(() => setSaved(false), 2500);
  }

  return <main className="mx-auto max-w-[1500px] px-5 py-8 md:px-9 md:py-10">
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b7921]">Contenu</p><h1 className="mt-2 font-serif text-3xl md:text-5xl">Articles du blog</h1><p className="mt-3 text-sm text-black/50">Créez les versions française et anglaise de vos publications.</p>
    <div className="mt-8 grid gap-7 xl:grid-cols-[1.25fr_.75fr]">
      <form onSubmit={submit} className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-6 font-serif text-2xl">Nouvel article</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={field} placeholder="Titre en français *" value={form.title} onChange={(e) => set("title", e.target.value)} required /><input className={field} placeholder="Title in English" value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
          <input className={`${field} md:col-span-2`} placeholder="Slug *" value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          <textarea className={field} rows={3} placeholder="Résumé en français *" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required /><textarea className={field} rows={3} placeholder="English summary" value={form.excerptEn} onChange={(e) => set("excerptEn", e.target.value)} />
          <textarea className={field} rows={12} placeholder="Contenu en français *" value={form.content} onChange={(e) => set("content", e.target.value)} required /><textarea className={field} rows={12} placeholder="English content" value={form.contentEn} onChange={(e) => set("contentEn", e.target.value)} />
          <input className={field} placeholder="Catégorie" value={form.category} onChange={(e) => set("category", e.target.value)} /><input className={field} placeholder="Category" value={form.categoryEn} onChange={(e) => set("categoryEn", e.target.value)} />
          <input className={field} placeholder="Auteur" value={form.author} onChange={(e) => set("author", e.target.value)} /><input className={field} placeholder="Temps de lecture" value={form.readTime} onChange={(e) => set("readTime", e.target.value)} />
        </div>
        <button className="mt-5 rounded-lg bg-[#11120f] px-6 py-3 text-sm font-semibold text-[#e2c66d] hover:bg-[#292a22]">Publier l’article</button>{saved && <span className="ml-4 text-sm text-green-700">Article enregistré.</span>}
      </form>
      <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm md:p-8"><div className="mb-5 flex items-center gap-3"><FileText className="text-[#9b7921]" /><h2 className="font-serif text-2xl">Publications ({articles.length})</h2></div><div className="max-h-[900px] space-y-3 overflow-auto">{articles.map((article) => <article key={article.id} className="rounded-xl border border-black/[0.08] p-4"><p className="text-xs font-semibold uppercase text-[#9b7921]">{article.category.fr}</p><h3 className="mt-1 font-medium">{article.title.fr}</h3><p className="mt-2 text-xs text-black/40">{article.date} · {article.readTime}</p><button onClick={() => deleteArticle(article.id)} className="mt-3 inline-flex items-center gap-1.5 text-xs text-red-700"><Trash2 size={14} /> Supprimer</button></article>)}</div></section>
    </div>
  </main>;
}
