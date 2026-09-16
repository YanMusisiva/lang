"use client";

import { useEffect, useState } from "react";
import { Lightbulb, X } from "lucide-react";
import { MICRO_LESSONS } from "@/data/microLessons";
import { useLang } from "@/context/LangContext";

const INTERVAL_MS = 20_000;
const SESSION_KEY = "langlistening:micro-lessons";

type MicroLessonSession = {
  seenIds: string[];
  nextAt: number;
};

function readSession(): MicroLessonSession {
  const fallback = { seenIds: [], nextAt: Date.now() + INTERVAL_MS };

  try {
    const stored = window.sessionStorage.getItem(SESSION_KEY);
    if (!stored) return fallback;

    const parsed = JSON.parse(stored) as Partial<MicroLessonSession>;
    return {
      seenIds: Array.isArray(parsed.seenIds)
        ? parsed.seenIds.filter((id): id is string => typeof id === "string")
        : [],
      nextAt: typeof parsed.nextAt === "number" ? parsed.nextAt : fallback.nextAt,
    };
  } catch {
    return fallback;
  }
}

function writeSession(session: MicroLessonSession) {
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export default function MicroLessonPopup() {
  const { lang } = useLang();
  const catalogKey = MICRO_LESSONS.map((lesson) => lesson.id).join("|");
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const session = readSession();
    const unseenLessons = MICRO_LESSONS.filter((lesson) => !session.seenIds.includes(lesson.id));
    if (unseenLessons.length === 0) return;

    const showNextLesson = () => {
      if (document.visibilityState !== "visible") {
        session.nextAt = Date.now() + INTERVAL_MS;
        writeSession(session);
        setCycle((current) => current + 1);
        return;
      }

      const lesson = MICRO_LESSONS.find((item) => !session.seenIds.includes(item.id));
      if (!lesson) return;

      session.seenIds.push(lesson.id);
      session.nextAt = Date.now() + INTERVAL_MS;
      writeSession(session);
      setLessonId(lesson.id);
      setVisible(true);
      setCycle((current) => current + 1);
    };

    const remainingTime = Math.max(0, session.nextAt - Date.now());
    const timer = window.setTimeout(showNextLesson, remainingTime);
    return () => window.clearTimeout(timer);
  }, [catalogKey, cycle]);

  const lesson = MICRO_LESSONS.find((item) => item.id === lessonId);
  if (!visible || !lesson) return null;
  return (
    <aside className="fixed bottom-5 right-5 z-[80] w-[calc(100%-2.5rem)] max-w-sm rounded-lg border border-[#c9a84c]/40 bg-[#0a0a0a] p-5 text-white shadow-2xl" role="status">
      <button onClick={() => setVisible(false)} aria-label="Fermer" className="absolute right-3 top-3 text-white/40 hover:text-white"><X size={17} /></button>
      <div className="flex items-center gap-2 text-[#e8c96a]"><Lightbulb size={18} /><p className="text-xs font-bold uppercase tracking-widest">{lang === "fr" ? "Le saviez-vous ?" : "Did you know?"}</p></div>
      <p className="mt-3 pr-5 text-sm leading-6 text-white/75">{lesson[lang]}</p>
      <p className="mt-3 border-l-2 border-[#c9a84c] pl-3 text-sm italic text-white">{lesson.example}</p>
    </aside>
  );
}
