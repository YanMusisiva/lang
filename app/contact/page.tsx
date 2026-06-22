"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const { t } = useLang();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    level: "",
    goal: "",
  });

  const handleSubmit = () => {
    const message = `
Nouvelle demande LangListening

👤 Nom : ${form.name}
📱 WhatsApp : ${form.phone}
🎯 Niveau : ${form.level}
🚀 Objectif : ${form.goal}
`;

    const whatsappUrl = `https://wa.me/243981984788?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-24">
      <Navbar />
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block border border-[#c9a84c]/50 text-[#e8c96a] px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-6">
            {t("Contact rapide", "Quick Contact")}
          </div>

          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem,6vw,4rem)",
            }}
          >
            {t("Parlons de votre anglais", "Let's talk about your English")}
          </h1>

          <p className="text-white/60 max-w-md mx-auto">
            {t(
              "Remplissez ce court formulaire et un formateur vous contactera sur WhatsApp.",
              "Fill out this short form and a trainer will contact you on WhatsApp.",
            )}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <input
            type="text"
            maxLength={50}
            placeholder={t("Votre nom", "Your name")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white outline-none focus:border-[#c9a84c]"
          />

          <input
            type="tel"
            maxLength={20}
            placeholder={t("Numéro WhatsApp", "WhatsApp Number")}
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9+]/g, "");

              setForm({
                ...form,
                phone: value,
              });
            }}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white outline-none focus:border-[#c9a84c]"
          />

          <div className="grid grid-cols-3 gap-3">
            {["Débutant", "Intermédiaire", "Avancé"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setForm({ ...form, level })}
                className={`py-4 rounded-lg border transition-all ${
                  form.level === level
                    ? "bg-[#c9a84c] text-black border-[#c9a84c]"
                    : "bg-white/5 text-white border-white/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="relative">
            <textarea
              maxLength={200}
              rows={4}
              placeholder={t(
                "Votre objectif en anglais (ex: parler couramment, faire du business, etc.)",
                "Your English goal (e.g., speak fluently, do business, etc.)",
              )}
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white outline-none resize-none focus:border-[#c9a84c]"
            />

            <p className="text-right text-xs text-white/40 mt-1">
              {form.goal.length}/200
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#c9a84c] text-black font-semibold py-4 rounded-lg hover:bg-[#e8c96a] transition-all"
          >
            {t("Envoyer sur WhatsApp", "Send on WhatsApp")}
          </button>
        </div>
      </div>
    </section>
  );
}
