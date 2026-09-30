import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TestimonyPage from "@/components/testimony/TestimonyPage";
import "./testimony.css";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { toStudentStory, type TestimonialRow } from "@/lib/testimonials";
import { TESTIMONIALS, type StudentStory } from "@/data/testimonials";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Témoignages — Leurs mots, leurs progrès | LangListening",
  description: "Découvrez les témoignages de nos apprenants, les moments de notre communauté et notre méthode d'apprentissage en vidéo.",
};

export default async function Page() {
  let published: StudentStory[] = [];
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from("testimonials").select("*").eq("published", true).order("created_at", { ascending: false });
      if (!error && data) published = (data as TestimonialRow[]).map(toStudentStory);
    } catch {
      // Keep the existing stories available when the database cannot be reached.
    }
  }
  return (
    <>
      <Navbar />
      <TestimonyPage stories={[...published, ...TESTIMONIALS]} />
      <Footer />
    </>
  );
}
