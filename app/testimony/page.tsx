import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TestimonyPage from "@/components/testimony/TestimonyPage";
import "./testimony.css";

export const metadata: Metadata = {
  title: "Témoignages — Leurs mots, leurs progrès | LangListening",
  description: "Découvrez les témoignages de nos apprenants, les moments de notre communauté et notre méthode d'apprentissage en vidéo.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <TestimonyPage />
      <Footer />
    </>
  );
}
