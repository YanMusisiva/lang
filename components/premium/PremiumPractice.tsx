"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, Headphones, LoaderCircle, MessageCircle, Mic, PenLine, Square, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLang } from "@/context/LangContext";
import { PREMIUM_LESSONS, type PremiumExercise, type PremiumLesson } from "@/data/premium";

type Feedback = {
  correct: boolean;
  score: number;
  correctedAnswer: string;
  naturalAnswer: string;
  errors: { original: string; correction: string; explanationFr: string }[];
  explanationFr: string;
  confidence: number;
};

function FeedbackPanel({ feedback, provider }: { feedback: Feedback; provider: string }) {
  return (
    <div className="mt-6 rounded-lg border border-white/10 bg-black/30 p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-white">Correction écrite</h3>
        <span className="rounded bg-[#c9a84c]/15 px-3 py-1 text-sm text-[#e8c96a]">{feedback.score}/100</span>
      </div>
      <p className="mt-4 text-sm text-white/65">{feedback.explanationFr}</p>
      {feedback.errors.length > 0 && <div className="mt-4 space-y-3">{feedback.errors.map((error, index) => (
        <div key={`${error.original}-${index}`} className="rounded border border-red-400/15 p-3 text-sm">
          <p className="text-red-300 line-through">{error.original}</p>
          <p className="mt-1 text-green-300">{error.correction}</p>
          <p className="mt-1 text-white/50">{error.explanationFr}</p>
        </div>
      ))}</div>}
      <p className="mt-5 text-xs uppercase tracking-wider text-white/35">Formulation naturelle</p>
      <p className="mt-2 text-white">{feedback.naturalAnswer}</p>
      <p className="mt-5 text-xs text-white/30">Analyse automatique via {provider}. Elle peut se tromper; votre coach reste la référence.</p>
    </div>
  );
}

function AiAnswerExercise({ exercise, spoken = false }: { exercise: PremiumExercise; spoken?: boolean }) {
  const { t } = useLang();
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ feedback: Feedback; provider: string } | null>(null);
  const [error, setError] = useState("");
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  function startListening() {
    const SpeechRecognition = (window as typeof window & { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any }).SpeechRecognition ||
      (window as typeof window & { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;
    if (!SpeechRecognition) { setAnswer("La reconnaissance vocale n'est pas disponible dans ce navigateur. Utilisez Chrome ou Edge."); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results as ArrayLike<any>).map((item: any) => item[0].transcript).join(" ");
      setAnswer(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  }

  async function correct() {
    if (!answer.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const response = await fetch("/api/ai/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId: exercise.id, mode: spoken ? "spoken" : "written", prompt: t(exercise.prompt.fr, exercise.prompt.en), answer, referenceAnswer: exercise.referenceAnswer }),
      });
      const data = await response.json();
      if (!response.ok) setError(data.error || "La correction est indisponible.");
      else {
        setResult(data);
        if (data.aiWarning) setError(data.aiWarning);
      }
    } catch {
      setError("Impossible de joindre le service de correction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-3 text-[#e8c96a]">{spoken ? <Mic size={20} /> : <PenLine size={20} />}<span className="text-xs font-bold uppercase tracking-widest">{spoken ? "Réponse vocale" : "Réponse écrite libre"}</span></div>
      <h3 className="mt-4 text-xl text-white">{t(exercise.prompt.fr, exercise.prompt.en)}</h3>
      {spoken && <p className="mt-2 text-sm text-white/45">Le navigateur transcrit votre voix. L'IA corrige ensuite uniquement le texte obtenu et n'évalue pas votre accent.</p>}
      <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} rows={5} placeholder={spoken ? "La transcription apparaîtra ici..." : "Write your answer in English..."} className="mt-5 w-full rounded border border-white/15 bg-black/40 p-4 text-white outline-none focus:border-[#c9a84c]" />
      <div className="mt-4 flex flex-wrap gap-3">
        {spoken && <button onClick={() => listening ? recognitionRef.current?.stop() : startListening()} className="inline-flex items-center gap-2 rounded border border-white/20 px-4 py-2.5 text-sm text-white">{listening ? <Square size={16} /> : <Mic size={16} />}{listening ? "Arrêter" : "Commencer à parler"}</button>}
        <button onClick={correct} disabled={loading || !answer.trim()} className="inline-flex items-center gap-2 rounded bg-[#c9a84c] px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-40">{loading && <LoaderCircle className="animate-spin" size={16} />}Demander à l'IA de corriger</button>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-amber-300">{error}</p>}
      {result && <FeedbackPanel {...result} />}
    </div>
  );
}

function ShadowingExercise({ exercise }: { exercise: PremiumExercise }) {
  const { t } = useLang();
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);

  function start() {
    const SpeechRecognition = (window as typeof window & { webkitSpeechRecognition?: new () => any; SpeechRecognition?: new () => any }).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const heard = event.results[0][0].transcript as string;
      setTranscript(heard);
      const expected = new Set((exercise.transcript || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/));
      const actual = heard.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/);
      setScore(Math.round((actual.filter((word) => expected.has(word)).length / Math.max(expected.size, actual.length, 1)) * 100));
    };
    if (exercise.audioUrl) void new Audio(exercise.audioUrl).play();
    recognition.start();
  }

  return (
    <div className="rounded-lg border border-[#c9a84c]/25 bg-[#c9a84c]/[0.04] p-6">
      <div className="flex items-center gap-3 text-[#e8c96a]"><Headphones size={20} /><span className="text-xs font-bold uppercase tracking-widest">Shadowing expérimental</span></div>
      <h3 className="mt-4 text-xl text-white">{t(exercise.prompt.fr, exercise.prompt.en)}</h3>
      <p className="mt-4 rounded bg-black/30 p-4 text-lg text-white">{exercise.transcript}</p>
      {!exercise.audioUrl && <p className="mt-3 text-sm text-amber-300/75">Audio de référence non encore chargé : ce prototype mesure les mots reconnus, pas encore la tonalité.</p>}
      <button onClick={start} className="mt-5 inline-flex items-center gap-2 rounded bg-[#c9a84c] px-5 py-2.5 font-semibold text-black"><Volume2 size={17} />Commencer</button>
      {transcript && <div className="mt-5 rounded border border-white/10 p-4"><p className="text-xs uppercase text-white/35">Texte entendu</p><p className="mt-2 text-white">{transcript}</p><p className="mt-3 text-[#e8c96a]">Correspondance lexicale : {score}%</p><p className="mt-2 text-xs text-white/35">Ce score ne mesure pas encore l'accent, la tonalité ou la prosodie.</p></div>}
    </div>
  );
}

export default function PremiumPractice({ track }: { track: string }) {
  const { t } = useLang();
  const [remoteLessons, setRemoteLessons] = useState<PremiumLesson[]>([]);
  useEffect(() => {
    void fetch("/api/premium/lessons").then((response) => response.ok ? response.json() : null).then((data) => {
      if (!data?.lessons) return;
      setRemoteLessons(data.lessons.map((item: any) => ({
        id: item.id, title: item.title, summary: item.summary, content: item.content,
        videoUrl: item.video_url || undefined, audience: item.track,
        exercises: (item.premium_exercises || []).map((exercise: any) => ({ id: exercise.id, type: exercise.type, prompt: exercise.prompt, referenceAnswer: exercise.reference_answer || undefined, acceptedAnswers: exercise.accepted_answers || [], audioUrl: exercise.audio_url || undefined, transcript: exercise.transcript || undefined })),
      })));
    });
  }, []);
  const lessons = useMemo(() => [...PREMIUM_LESSONS, ...remoteLessons].filter((lesson) => lesson.audience === track || track === "professional"), [track, remoteLessons]);
  const [selectedId, setSelectedId] = useState(PREMIUM_LESSONS[0].id);
  const lesson = lessons.find((item) => item.id === selectedId) || lessons[0] || PREMIUM_LESSONS[0];
  const videoUrl = lesson.videoUrl?.replace("youtube.com/watch?v=", "youtube.com/embed/").replace("youtu.be/", "youtube.com/embed/");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-28 lg:grid-cols-[280px_1fr]">
        <aside>
          <Link href="/dashboard" className="text-sm text-white/45 hover:text-[#e8c96a]">← Tableau de bord</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-[#c9a84c]">Parcours premium</p>
          <nav className="mt-4 space-y-2">{lessons.map((item) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded border p-4 text-left text-sm ${item.id === lesson.id ? "border-[#c9a84c] bg-[#c9a84c]/10 text-white" : "border-white/10 text-white/55"}`}>{t(item.title.fr, item.title.en)}</button>)}</nav>
        </aside>
        <section>
          <div className="flex items-center gap-3 text-[#e8c96a]"><BookOpen size={20} /><span className="text-xs font-bold uppercase tracking-widest">Mini-leçon</span></div>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl">{t(lesson.title.fr, lesson.title.en)}</h1>
          <p className="mt-4 text-white/55">{t(lesson.summary.fr, lesson.summary.en)}</p>
          {videoUrl && <div className="mt-8 aspect-video overflow-hidden rounded-lg border border-white/10"><iframe src={videoUrl} title={t(lesson.title.fr, lesson.title.en)} allowFullScreen className="h-full w-full" /></div>}
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-6 leading-7 text-white/75">{t(lesson.content.fr, lesson.content.en)}</div>
          <div className="mt-5 flex flex-wrap gap-3"><span className="inline-flex items-center gap-2 text-sm text-green-300"><CheckCircle2 size={17} />Leçon consultée</span><Link href={`/chat?lesson=${lesson.id}`} className="inline-flex items-center gap-2 text-sm text-[#e8c96a]"><MessageCircle size={17} />Poser une question au coach</Link></div>
          <div className="mt-12 space-y-7">{lesson.exercises.map((exercise) => exercise.type === "written_answer" ? <AiAnswerExercise key={exercise.id} exercise={exercise} /> : exercise.type === "spoken_answer" ? <AiAnswerExercise key={exercise.id} exercise={exercise} spoken /> : <ShadowingExercise key={exercise.id} exercise={exercise} />)}</div>
        </section>
      </div>
    </main>
  );
}
