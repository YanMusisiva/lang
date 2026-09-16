"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import type { StoryPhoto } from "@/data/testimonials";
import RevealWrapper from "@/components/motion/RevealWrapper";

export default function PhotoGallery({ photos }: { photos: StoryPhoto[] }) {
  const { t } = useLang();
  const [selected, setSelected] = useState<StoryPhoto | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!selected || !element) return;
    element.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = overflow; };
  }, [selected]);

  if (!photos.length) return null;
  return (
    <>
      <div className="story-photo-grid">
        {photos.map((photo, index) => (
          <RevealWrapper key={photo.id} delay={index % 3 * 80}>
            <button className="story-photo-card" onClick={() => setSelected(photo)} aria-label={`${t("Agrandir", "Enlarge")} : ${t(photo.caption.fr, photo.caption.en)}`}>
              <span className="story-photo-image"><Image src={photo.src} alt={t(photo.caption.fr, photo.caption.en)} fill sizes="(max-width: 767px) 90vw, 40vw" /><span className="circle-button"><Expand size={18} /></span></span>
              <span className="story-photo-caption">{t(photo.caption.fr, photo.caption.en)}</span>
            </button>
          </RevealWrapper>
        ))}
      </div>
      <dialog ref={dialog} className="story-lightbox" aria-label={selected ? t(selected.caption.fr, selected.caption.en) : t("Photo", "Photo")} onClose={() => setSelected(null)} onCancel={() => setSelected(null)}>
        {selected && <>
          <button className="circle-button story-lightbox-close" onClick={() => setSelected(null)} aria-label={t("Fermer la photo", "Close photo")}><X /></button>
          <div className="story-lightbox-image"><Image src={selected.src} alt={t(selected.caption.fr, selected.caption.en)} fill sizes="90vw" /></div>
          <p>{t(selected.caption.fr, selected.caption.en)}</p>
        </>}
      </dialog>
    </>
  );
}
