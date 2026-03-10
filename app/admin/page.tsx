"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { useBlog, Article } from "@/context/BlogContext";
import Nav from "@/components/Navbar";

function AdminContent() {
  const { t, lang } = useLang();
  const { articles, addArticle, deleteArticle } = useBlog();

  const ADMIN_CODE = "0979663050";
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: "",
    titleEn: "",
    slug: "",
    excerpt: "",
    excerptEn: "",
    content: "",
    contentEn: "",
    category: "Stratégie",
    categoryEn: "Strategy",
    author: "Nexus Growth",
    authorEn: "Nexus Growth",
    date: new Date().toISOString().split("T")[0],
    readTime: "",
  });

  const handleChange = (k: string, v: string) => {
    setForm((f) => {
      const updated = { ...f, [k]: v };
      // Auto-generate slug from title
      if (k === "title") {
        updated.slug = v
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-");
      }
      return updated;
    });
  };

  const handleAccessSubmit = () => {
    if (accessCode.trim() === ADMIN_CODE) {
      setAccessGranted(true);
      setAccessError(null);
      return;
    }
    setAccessError(t("admin.access_error"));
  };

  const handleSubmit = () => {
    if (!form.title || !form.slug || !form.excerpt || !form.content) return;

    addArticle({
      title: { fr: form.title, en: form.titleEn || form.title },
      slug: form.slug,
      excerpt: { fr: form.excerpt, en: form.excerptEn || form.excerpt },
      content: { fr: form.content, en: form.contentEn || form.content },
      category: { fr: form.category, en: form.categoryEn || form.category },
      author: { fr: form.author, en: form.authorEn || form.author },
      date: form.date,
      readTime: form.readTime,
    });

    setSuccess(true);
    setForm({
      title: "",
      titleEn: "",
      slug: "",
      excerpt: "",
      excerptEn: "",
      content: "",
      contentEn: "",
      category: "Stratégie",
      categoryEn: "Strategy",
      author: "Nexus Growth",
      authorEn: "Nexus Growth",
      date: new Date().toISOString().split("T")[0],
      readTime: "",
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#22c55e]/40 transition-colors font-mono";
  const labelClass =
    "font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-2";

  if (!accessGranted) {
    return (
      <main className="bg-[#050505] min-h-screen">
        <Nav />
        <div className="max-w-md mx-auto px-6 pt-36 pb-28">
          <div className="bg-[#0a0a0a] border border-white/8 p-10 text-center">
            <h1 className="font-display text-4xl font-black text-white mb-4">
              {t("admin.access_title")}
            </h1>
            <p className="text-white/40 mb-6">{t("admin.access_prompt")}</p>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                setAccessError(null);
              }}
              placeholder="Write the code"
              className={inputClass}
            />
            {accessError && (
              <p className="text-red-400 text-sm mt-2">{accessError}</p>
            )}
            <button
              onClick={handleAccessSubmit}
              className="mt-6 w-full btn-primary py-3 text-sm uppercase tracking-widest "
            >
              {t("admin.access_submit")}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#050505] min-h-screen">
      <Nav />
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-28">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#22c55e] mb-3">
              Administration
            </p>
            <h1 className="font-display text-4xl font-black text-white">
              {t("admin.title")}
            </h1>
          </div>
          <Link
            href="/blog"
            className="btn-outline px-5 py-2.5 text-xs uppercase tracking-widest"
          >
            ← {t("nav.blog")}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-[#0a0a0a] border border-white/8 p-8 space-y-5">
            <div>
              <label className={labelClass}>{t("admin.title_field")} *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Mon article sur la croissance"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title (EN)</label>
              <input
                type="text"
                value={form.titleEn}
                onChange={(e) => handleChange("titleEn", e.target.value)}
                placeholder="My article about growth"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.slug_field")}</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="mon-article-sur-la-croissance"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t("admin.category")}</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={inputClass + " cursor-pointer"}
                >
                  {[
                    "Stratégie",
                    "SaaS",
                    "Marketing",
                    "Growth",
                    "Tech",
                    "Insights",
                  ].map((c) => (
                    <option key={c} value={c} className="bg-[#0a0a0a]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Category (EN)</label>
                <select
                  value={form.categoryEn}
                  onChange={(e) => handleChange("categoryEn", e.target.value)}
                  className={inputClass + " cursor-pointer"}
                >
                  {[
                    "Strategy",
                    "SaaS",
                    "Marketing",
                    "Growth",
                    "Tech",
                    "Insights",
                  ].map((c) => (
                    <option key={c} value={c} className="bg-[#0a0a0a]">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t("admin.author")}</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Author (EN)</label>
                <input
                  type="text"
                  value={form.authorEn}
                  onChange={(e) => handleChange("authorEn", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t("admin.date")}</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Temps de lecture</label>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={(e) => handleChange("readTime", e.target.value)}
                  placeholder="5 min"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>{t("admin.excerpt")} *</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                rows={3}
                placeholder="Un résumé accrocheur de votre article..."
                className={inputClass + " resize-none"}
              />
            </div>
            <div>
              <label className={labelClass}>Excerpt (EN)</label>
              <textarea
                value={form.excerptEn}
                onChange={(e) => handleChange("excerptEn", e.target.value)}
                rows={3}
                placeholder="A catchy summary of your article..."
                className={inputClass + " resize-none"}
              />
            </div>
            <div>
              <label className={labelClass}>{t("admin.content")} *</label>
              <textarea
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                rows={10}
                placeholder={
                  "## Introduction\n\nVotre contenu ici...\n\n## Section\n\nSuite du contenu..."
                }
                className={inputClass + " resize-y"}
              />
              <p className="font-mono text-[9px] text-white/20 mt-1">
                Supports: ## Titre, ### Sous-titre, - liste, **gras**
              </p>
            </div>
            <div>
              <label className={labelClass}>Content (EN)</label>
              <textarea
                value={form.contentEn}
                onChange={(e) => handleChange("contentEn", e.target.value)}
                rows={10}
                placeholder={
                  "## Introduction\n\nYour content here...\n\n## Section\n\nMore content..."
                }
                className={inputClass + " resize-y"}
              />
              <p className="font-mono text-[9px] text-white/20 mt-1">
                Supports: ## Title, ### Subtitle, - list, **bold**
              </p>
            </div>

            {success && (
              <div className="border border-[#22c55e]/30 bg-[#22c55e]/5 px-4 py-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <p className="font-mono text-[11px] text-[#22c55e]">
                  {t("admin.success")}
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={
                !form.title || !form.slug || !form.excerpt || !form.content
              }
              className="w-full btn-primary py-4 text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t("admin.submit")}
            </button>
          </div>

          {/* Existing articles */}
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-5">
              {t("admin.list")}
            </h2>
            <div className="space-y-3">
              {articles.map((article: Article) => (
                <div
                  key={article.id}
                  className="bg-[#0a0a0a] border border-white/8 p-5 flex items-start justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[9px] uppercase text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5">
                        {t(article.category.fr, article.category.en)}
                      </span>
                      <span className="font-mono text-[9px] text-white/20">
                        {new Date(article.date).toLocaleDateString(
                          lang === "fr" ? "fr-FR" : "en-US",
                        )}
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium truncate">
                      {t(article.title.fr, article.title.en)}
                    </p>
                    <p className="font-mono text-[10px] text-white/25 mt-0.5 truncate">
                      /{article.slug}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="font-mono text-[10px] text-white/30 hover:text-white border border-white/10 px-3 py-1.5 hover:border-white/25 transition-colors"
                    >
                      Voir
                    </Link>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="font-mono text-[10px] text-red-400/50 hover:text-red-400 border border-red-400/10 hover:border-red-400/25 px-3 py-1.5 transition-colors"
                    >
                      {t("admin.delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  return <AdminContent />;
}
