"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, ArrowUpRight, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function CertificateViewer({ src, name }: { src: string; name: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = overflow; };
  }, [open]);
  const label = t(`Certificat de ${name}`, `${name}’s certificate`);
  return <>
    <button className="story-certificate" onClick={() => setOpen(true)} aria-haspopup="dialog">
      <span className="story-certificate-icon"><Award size={21} aria-hidden="true" /></span>
      <span><strong>{t("Une étape accomplie", "A milestone reached")}</strong><span>{t("Voir son certificat", "View certificate")}</span></span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </button>
    <dialog ref={dialog} className="story-lightbox" aria-label={label} onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
      {open && <><button className="circle-button story-lightbox-close" onClick={() => setOpen(false)} aria-label={t("Fermer le certificat", "Close certificate")}><X /></button><div className="story-lightbox-image"><Image unoptimized src={src} alt={label} fill sizes="90vw" /></div><p>{label}</p></>}
    </dialog>
  </>;
}
