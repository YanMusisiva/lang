"use client";

import { useEffect, useRef } from "react";

/** A circular marker follows the reader along a section's vertical rule. */
export default function ScrollAccent() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const marker = ref.current;
    const section = marker?.closest("section");
    if (!marker || !section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    const paint = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = motion.matches ? 0 : Math.max(0, Math.min(1, (window.innerHeight * 0.6 - rect.top) / rect.height));
      marker.style.top = `${progress * 100}%`;
    };
    const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const sync = () => {
      window.removeEventListener("scroll", update);
      if (visible && !motion.matches) window.addEventListener("scroll", update, { passive: true });
      update();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(section);
    window.addEventListener("resize", update);
    motion.addEventListener("change", sync);
    paint();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); motion.removeEventListener("change", sync); };
  }, []);
  return <span className="scroll-accent" aria-hidden="true"><span ref={ref} /></span>;
}
