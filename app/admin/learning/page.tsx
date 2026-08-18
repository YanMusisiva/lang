"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const initialForm = { slug: "", titleFr: "", titleEn: "", summaryFr: "", summaryEn: "", contentFr: "", contentEn: "", videoUrl: "", track: "professional", level: "beginner" };

export default function LearningAdminPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [exercise, setExercise] = useState({ lessonId: "", type: "written_answer", promptFr: "", promptEn: "", referenceAnswer: "", transcript: "" });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [exerciseStatus, setExerciseStatus] = useState("");
  const field = "w-full rounded border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-[#c9a84c]";
  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value, ...(key === "titleFr" && !current.slug ? { slug: value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") } : {}) }));
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setStatus("");
    const response = await fetch("/api/premium/lessons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: form.slug, title: { fr: form.titleFr, en: form.titleEn || form.titleFr }, summary: { fr: form.summaryFr, en: form.summaryEn || form.summaryFr }, content: { fr: form.contentFr, en: form.contentEn || form.contentFr }, videoUrl: form.videoUrl, track: form.track, level: form.level }) });
    const data = await response.json(); setSaving(false);
    if (response.ok) { setStatus("Leçon publiée."); setForm(initialForm); } else setStatus(data.error || "Publication impossible.");
  }
  async function submitExercise(event: React.FormEvent) {
    event.preventDefault(); setExerciseStatus("Enregistrement...");
    let audioUrl = "";
    if (exercise.type === "shadowing") {
      if (!audioFile) { setExerciseStatus("Choisissez un fichier audio."); return; }
      const supabase = createClient();
      if (!supabase) { setExerciseStatus("Supabase non configuré."); return; }
      const extension = audioFile.name.split(".").pop() || "webm";
      const path = `${exercise.lessonId}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from("premium-audio").upload(path, audioFile, { contentType: audioFile.type, upsert: false });
      if (error) { setExerciseStatus(error.message); return; }
      audioUrl = supabase.storage.from("premium-audio").getPublicUrl(path).data.publicUrl;
    }
    const response = await fetch("/api/premium/exercises", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lessonId: exercise.lessonId, type: exercise.type, prompt: { fr: exercise.promptFr, en: exercise.promptEn || exercise.promptFr }, referenceAnswer: exercise.referenceAnswer, transcript: exercise.transcript, audioUrl }) });
    const data = await response.json();
    setExerciseStatus(response.ok ? "Exercice publié." : data.error || "Publication impossible.");
    if (response.ok) { setExercise((current) => ({ ...current, promptFr: "", promptEn: "", referenceAnswer: "", transcript: "" })); setAudioFile(null); }
  }
  return <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 text-white"><div className="mx-auto max-w-4xl"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-widest text-[#c9a84c]">Administration</p><h1 className="mt-2 font-serif text-4xl">Contenu premium</h1></div><Link href="/admin" className="text-sm text-white/50">Retour au blog</Link></div><form onSubmit={submit} className="mt-10 space-y-5 rounded-lg border border-white/10 bg-white/[0.03] p-7"><h2 className="text-2xl">Nouvelle mini-leçon</h2><div className="grid gap-5 md:grid-cols-2"><input required value={form.titleFr} onChange={(e) => update("titleFr", e.target.value)} placeholder="Titre français" className={field}/><input value={form.titleEn} onChange={(e) => update("titleEn", e.target.value)} placeholder="English title" className={field}/></div><input required value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="slug-de-la-lecon" className={field}/><div className="grid gap-5 md:grid-cols-2"><textarea required rows={3} value={form.summaryFr} onChange={(e) => update("summaryFr", e.target.value)} placeholder="Résumé français" className={field}/><textarea rows={3} value={form.summaryEn} onChange={(e) => update("summaryEn", e.target.value)} placeholder="English summary" className={field}/></div><div className="grid gap-5 md:grid-cols-2"><textarea required rows={8} value={form.contentFr} onChange={(e) => update("contentFr", e.target.value)} placeholder="Explication du concept en français" className={field}/><textarea rows={8} value={form.contentEn} onChange={(e) => update("contentEn", e.target.value)} placeholder="Concept explanation in English" className={field}/></div><input value={form.videoUrl} onChange={(e) => update("videoUrl", e.target.value)} placeholder="Lien YouTube ou URL vidéo (facultatif)" className={field}/><div className="grid gap-5 md:grid-cols-2"><select value={form.track} onChange={(e) => update("track", e.target.value)} className={field}><option value="developer">Developer English</option><option value="business">Business English</option><option value="professional">Professional English</option></select><input required value={form.level} onChange={(e) => update("level", e.target.value)} placeholder="Niveau" className={field}/></div>{status && <p className="text-sm text-[#e8c96a]">{status}</p>}<button disabled={saving} className="rounded bg-[#c9a84c] px-7 py-3 font-semibold text-black disabled:opacity-50">{saving ? "Publication..." : "Publier la leçon"}</button></form>
  <form onSubmit={submitExercise} className="mt-8 space-y-5 rounded-lg border border-white/10 bg-white/[0.03] p-7"><h2 className="text-2xl">Ajouter un exercice à une leçon</h2><input required value={exercise.lessonId} onChange={(e) => setExercise({ ...exercise, lessonId: e.target.value })} placeholder="UUID de la leçon" className={field}/><select value={exercise.type} onChange={(e) => setExercise({ ...exercise, type: e.target.value })} className={field}><option value="written_answer">Réponse écrite libre</option><option value="spoken_answer">Réponse vocale</option><option value="shadowing">Shadowing</option></select><div className="grid gap-5 md:grid-cols-2"><textarea required value={exercise.promptFr} onChange={(e) => setExercise({ ...exercise, promptFr: e.target.value })} placeholder="Consigne française" className={field}/><textarea value={exercise.promptEn} onChange={(e) => setExercise({ ...exercise, promptEn: e.target.value })} placeholder="English instruction" className={field}/></div>{exercise.type !== "shadowing" && <textarea value={exercise.referenceAnswer} onChange={(e) => setExercise({ ...exercise, referenceAnswer: e.target.value })} placeholder="Exemple de réponse correcte" className={field}/>} {exercise.type === "shadowing" && <><textarea required value={exercise.transcript} onChange={(e) => setExercise({ ...exercise, transcript: e.target.value })} placeholder="Transcription exacte de l'audio" className={field}/><input required type="file" accept="audio/mpeg,audio/wav,audio/webm,audio/ogg" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className={field}/></>}<p className="text-sm text-[#e8c96a]">{exerciseStatus}</p><button className="rounded bg-[#c9a84c] px-7 py-3 font-semibold text-black">Publier l'exercice</button></form></div></main>;
}
