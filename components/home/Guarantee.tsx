"use client";

import { useLang } from "@/context/LangContext";
import RevealWrapper from "@/components/motion/RevealWrapper";
import { ShieldCheck, Infinity as InfinityIcon } from "lucide-react";

export default function Guarantee() {
  const { t } = useLang();
  return <section id="garantie" className="commitment-section">
    <RevealWrapper className="commitment-layout">
      <div className="commitment-intro">
        <p className="eyebrow"><ShieldCheck size={18} aria-hidden="true" />{t("Notre engagement", "Our commitment")}</p>
        <h2>{t("Un vrai formateur.", "A real teacher.")}<span>{t("Jusqu’à votre objectif.", "All the way to your goal.")}</span></h2>
        <p>{t("Vous échangez et pratiquez avec un humain. Dès le départ, nous définissons ensemble le niveau d’anglais à atteindre.", "You talk and practice with a real person. From the start, we agree together on the English level you want to reach.")}</p>
        <span className="commitment-signature"><span className="status-dot" />{t("Un objectif défini ensemble. Un engagement jusqu’au bout.", "A shared goal. A commitment all the way.")}</span>
      </div>
      <div className="commitment-promises">
        <div className="commitment-promise">
          <span className="commitment-seal" aria-hidden="true">5<small>{t("jours", "days")}</small></span>
          <div><h3>{t("Le droit de changer d’avis.", "Room to change your mind.")}</h3><p>{t("La formation ne vous convient plus ? Demandez votre remboursement dans les 5 jours suivant son démarrage.", "Training no longer suits you? Request your refund within 5 days of starting.")}</p></div>
        </div>
        <div className="commitment-promise">
          <span className="commitment-seal" aria-hidden="true"><InfinityIcon size={36} /></span>
          <div><h3>{t("On continue, gratuitement.", "We keep going, free of charge.")}</h3><p>{t("À la fin de votre programme d’un ou de trois mois, si le niveau convenu n’est pas atteint, nous poursuivons votre accompagnement gratuitement jusqu’à ce que vous l’atteigniez.", "If you have not reached the agreed level by the end of your one- or three-month program, we continue supporting you free of charge until you do.")}</p></div>
        </div>
      </div>
    </RevealWrapper>
  </section>;
}
