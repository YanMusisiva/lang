"use client";
import React from "react";
import Link from "next/link";
import { use } from "react";
import { useLang } from "@/context/LangContext";
import { useBlog } from "@/context/BlogContext";
import Nav from "@/components/Navbar";

function ArticleContent({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const { getArticle } = useBlog();
  const article = getArticle(slug);

  if (!article) {
    return (
      <main className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/30 font-mono mb-4">
            {t("Article introuvable", "Article not found")}
          </p>
          <Link
            href="/blog"
            className="text-[#e8c96a] font-mono text-sm hover:underline"
          >
            {t("blog.back")}
          </Link>
        </div>
      </main>
    );
  }

  // Simple markdown-ish renderer
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## "))
        return (
          <h2
            key={i}
            className="font-display text-2xl font-bold text-white mt-10 mb-4"
          >
            {line.slice(3)}
          </h2>
        );
      if (line.startsWith("### "))
        return (
          <h3
            key={i}
            className="font-display text-xl font-bold text-white mt-8 mb-3"
          >
            {line.slice(4)}
          </h3>
        );
      if (line.startsWith("- "))
        return (
          <li
            key={i}
            className="text-white/60 text-sm leading-relaxed mb-2 ml-4"
          >
            {line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, m) => m)}
          </li>
        );
      if (line.startsWith("**") && line.endsWith("**"))
        return (
          <p key={i} className="font-medium text-white mt-6 mb-2">
            {line.slice(2, -2)}
          </p>
        );
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-white/60 text-sm leading-relaxed mb-3">
          {line}
        </p>
      );
    });
  };

  return (
    <main className="bg-[#050505] min-h-screen">
      <Nav />
      <article className="max-w-3xl mx-auto px-6 pt-36 pb-28">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[11px] text-white/30 hover:text-[#e8c96a] uppercase tracking-widest mb-12 transition-colors"
        >
          {t("blog.back")}
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#e8c96a] bg-[#22c55e]/10 border border-[#22c55e]/20 px-2.5 py-1">
            {t(article.category.fr, article.category.en)}
          </span>
          <span className="font-mono text-[10px] text-white/20">
            {new Date(article.date).toLocaleDateString(
              lang === "fr" ? "fr-FR" : "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            )}
          </span>
          {article.readTime && (
            <span className="font-mono text-[10px] text-white/20">
              {article.readTime}
            </span>
          )}
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-6">
          {t(article.title.fr, article.title.en)}
        </h1>
        <p className="text-white/40 text-base leading-relaxed mb-10 border-l-2 border-[#22c55e]/30 pl-5">
          {t(article.excerpt.fr, article.excerpt.en)}
        </p>

        <div className="border-t border-white/5 pt-10 ">
          <div className="prose-custom space-y-1">
            {renderContent(t(article.content.fr, article.content.en))}
          </div>
        </div>

        {/* Author */}
        <div className="mt-16 border-t border-white/5 pt-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
            <span className="text-[#e8c96a] font-mono text-xs">L</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">
              {t(article.author.fr, article.author.en)}
            </p>
            <p className="font-mono text-[10px] text-white/30">LangListening</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#0a0a0a] border border-white/8 p-8 text-center">
          <p className="font-display text-2xl font-bold text-white mb-3">
            {t("Prêt à utiliser notre méthode?", "Ready to use our method ?")}
          </p>
          <p className="text-white/40 text-sm mb-6">
            {t(
              "Rejoignez nos étudiants gratuitement",
              "Join our students for free",
            )}
          </p>
          <Link
            href="/#leadmagnet"
            className="inline-block btn-primary px-8 py-3 text-sm uppercase tracking-widest text-[#e8c96a]"
          >
            {t("Essayer nos cours gratuits", "Try our free courses")}
          </Link>
        </div>
      </article>
    </main>
  );
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <ArticleContent slug={slug} />;
}
