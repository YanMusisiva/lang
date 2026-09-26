import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "../context/LangContext";
import { BlogProvider } from "../context/BlogContext";
import ProgressSync from "@/components/learning/ProgressSync";
import MicroLessonPopup from "@/components/learning/MicroLessonPopup";
import AuthenticatedNavigation from "@/components/layout/AuthenticatedNavigation";
import RecoveryRedirect from "@/components/auth/RecoveryRedirect";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LangListening – Pratiquez l'anglais chaque jour",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon-48.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  description:
    "Progressez en anglais avec des exercices oraux et écrits, un parcours personnalisé et un accompagnement humain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <LangProvider>
          <BlogProvider><RecoveryRedirect /><ProgressSync /><MicroLessonPopup /><AuthenticatedNavigation />{children}</BlogProvider>
        </LangProvider>
      </body>
    </html>
  );
}
