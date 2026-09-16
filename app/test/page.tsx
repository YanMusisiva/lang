import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import LevelTest from "@/components/practice/level-test/LevelTest";
import "./test.css";

export const metadata: Metadata = {
  title: "Test de niveau | LangListening",
  description: "20 questions pour découvrir votre niveau et votre prochaine étape. Gratuit, sans inscription.",
};
export default function TestPage() { return <><Navbar /><LevelTest /></>; }
