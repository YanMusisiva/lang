"use client";
import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { useBlog } from "@/context/BlogContext";
import Nav from "@/components/Navbar";

function BlogContent() {
  const { t, lang } = useLang();
  const { articles } = useBlog();

  return (
    <main className="bg-[#050505] min-h-screen">
      <Nav />
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-28">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#e8c96a] mb-4">
            Blog
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-5">
            {t("blog.title")}
          </h1>
          <p className="text-white/40 max-w-xl leading-relaxed">
            {t("blog.sub")}
          </p>
        </div>

        {/* Articles grid */}
        {articles.length === 0 ? (
          <div className="border border-white/8 p-16 text-center">
            <p className="text-white/30 font-mono text-sm">{t("blog.empty")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group card-hover bg-[#0a0a0a] border border-white/8 p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#e8c96a] bg-[#22c55e]/10 border border-[#22c55e]/20 px-2.5 py-1">
                    {t(article.category.fr, article.category.en)}
                  </span>
                  {article.readTime && (
                    <span className="font-mono text-[10px] text-white/20">
                      {article.readTime}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-lg font-bold text-white mb-3 group-hover:text-[#e8c96a] transition-colors leading-snug">
                  {t(article.title.fr, article.title.en)}
                </h2>
                <p className="text-white/40 text-sm leading-relaxed flex-1 mb-5">
                  {t(article.excerpt.fr, article.excerpt.en)}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] text-white/25">
                    {new Date(article.date).toLocaleDateString(
                      lang === "fr" ? "fr-FR" : "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                  <span className="font-mono text-[11px] text-[#e8c96a] group-hover:translate-x-1 transition-transform">
                    {t("blog.read")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function BlogPage() {
  return <BlogContent />;
}
