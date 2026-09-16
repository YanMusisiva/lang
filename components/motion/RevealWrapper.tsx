"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function RevealWrapper({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    // Keep content readable without JS and avoid hiding content already on screen.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.reveal = "visible";
        observer.unobserve(element);
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    const show = () => { if (motion.matches) { element.dataset.reveal = "visible"; observer.disconnect(); } };
    motion.addEventListener("change", show);
    return () => { observer.disconnect(); motion.removeEventListener("change", show); };
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
