"use client";

import { Phone, Presentation, Target, Headphones } from "lucide-react";
import { useLang } from "@/context/LangContext";

const METHOD = [
  { icon: Phone, fr: "4 appels par semaine", en: "4 calls a week", detail: { fr: "Pratiquez avec votre formateur", en: "Practice with your teacher" } },
  { icon: Presentation, fr: "Une journée d’exposé", en: "A presentation day", detail: { fr: "Prenez la parole en anglais", en: "Present your ideas in English" } },
  { icon: Target, fr: "Des objectifs chaque semaine", en: "Weekly goals", detail: { fr: "Avancez étape par étape", en: "Make progress step by step" } },
  { icon: Headphones, fr: "Des audios à écouter", en: "Audio listening practice", detail: { fr: "Entraînez votre compréhension", en: "Build your listening skills" } },
];

export default function ProgramMethod() {
  const { t } = useLang();
  return <div className="program-method">
    <p className="program-method-label">{t("Le rythme de votre formation", "Your learning routine")}</p>
    <div className="program-method-grid">{METHOD.map(({ icon: Icon, fr, en, detail }) => <div className="program-method-item" key={en}>
      <span><Icon size={19} aria-hidden="true" /></span><div><h3>{t(fr, en)}</h3><p>{t(detail.fr, detail.en)}</p></div>
    </div>)}</div>
  </div>;
}
