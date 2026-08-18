import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const bilingual = z.object({ fr: z.string().min(1), en: z.string().min(1) });
const articleSchema = z.object({
  title: bilingual,
  slug: z.string().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: bilingual,
  content: bilingual,
  category: bilingual,
  author: bilingual,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  readTime: z.string().max(30).optional(),
});

export async function GET() {
  if (!isSupabaseConfigured()) return NextResponse.json({ articles: [] });
  const supabase = await createClient();
  const { data, error } = await supabase.from("articles").select("*").order("published_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const articles = data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    date: row.published_at,
    readTime: row.read_time || undefined,
  }));
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase non configuré" }, { status: 503 });
  const parsed = articleSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Article invalide" }, { status: 400 });
  const supabase = await createClient();
  const article = parsed.data;
  const { data, error } = await supabase.from("articles").insert({
    slug: article.slug, title: article.title, excerpt: article.excerpt,
    content: article.content, category: article.category, author: article.author,
    published_at: article.date, read_time: article.readTime || null,
  }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: error.code === "42501" ? 403 : 400 });
  return NextResponse.json({ id: data.id }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase non configuré" }, { status: 503 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Identifiant requis" }, { status: 400 });
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 403 });
  return NextResponse.json({ deleted: true });
}
