import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "../context/LangContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LangListening – Parlez anglais couramment en 90 jours",
  description:
    "Apprenez à parler anglais avec la méthode d'écoute active et de conversation humaine. Résultats garantis en 7 semaines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
