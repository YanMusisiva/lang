"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Clock3, RotateCcw, Sparkles } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { QUESTIONS } from "@/data/level-test";
import { newTestSession, parseTestSession, scoreTest, testLevel, TEST_STORAGE_KEY, TEST_TTL, type TestSession } from "@/lib/level-test";

const levelNames: [string, string][] = [
  ["Débutant", "Beginner"], ["Débutant +", "Beginner +"],
  ["Intermédiaire", "Intermediate"], ["Avancé", "Advanced"],
];
const modules = ["Foundation English", "Everyday English", "Intermediate English", "Advanced English"];
const advice: [string, string][] = [
  ["Votre prochaine étape : construire votre vocabulaire et prendre plaisir à écouter l’anglais chaque jour.", "Your next step: build your vocabulary and enjoy listening to English every day."],
  ["Les bases sont là. Renforcez-les avec des conversations simples et régulières.", "The foundations are there. Strengthen them with simple, regular conversations."],
  ["Vous pouvez déjà communiquer. Place maintenant à plus d’aisance et de spontanéité.", "You can already communicate. Now build greater confidence and spontaneity."],
  ["Vous avez de solides acquis. Affinez les nuances et faites rayonner votre expertise en anglais.", "You have a strong foundation. Refine the nuances and let your expertise shine in English."],
];

export default function LevelTest() {
  const { t } = useLang();
  const [session, setSession] = useState<TestSession | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [sync, setSync] = useState<"idle" | "pending" | "saved" | "waiting">("idle");
  const heading = useRef<HTMLHeadingElement>(null);
  const current = useRef(session);
  current.current = session;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TEST_STORAGE_KEY);
      const saved = parseTestSession(raw);
      if (saved) setSession(saved);
      else if (raw) localStorage.removeItem(TEST_STORAGE_KEY);
    } catch { setStorageAvailable(false); }
    setReady(true);
  }, []);

  function persist(next: TestSession) {
    setSession(next);
    current.current = next;
    try {
      localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(next));
      setStorageAvailable(true);
    } catch { setStorageAvailable(false); }
  }

  // Expire 24 hours after the last interaction, including in an open tab.
  useEffect(() => {
    if (!session) return;
    const timer = window.setTimeout(() => {
      setSession(null);
      setActive(false);
      try { localStorage.removeItem(TEST_STORAGE_KEY); } catch { /* Storage may be disabled. */ }
    }, Math.max(0, session.expiresAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [session]);

  const attemptId = session?.id;
  const completed = session?.completed ?? false;
  useEffect(() => {
    if (!completed || !attemptId) return;
    let stopped = false;
    let sending = false;
    let controller: AbortController | null = null;
    async function send() {
      const latest = current.current;
      if (stopped || sending || !latest || latest.id !== attemptId) return;
      if (latest.submitted) { setSync("saved"); return; }
      sending = true;
      setSync("pending");
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 15_000);
      try {
        const response = await fetch("/api/level-test", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: latest.id, version: latest.version, answers: latest.answers }),
          signal: controller.signal,
        });
        if (!response.ok || !(await response.json()).saved) throw new Error("Not saved");
        if (!stopped && current.current?.id === attemptId) {
          const saved = { ...current.current, submitted: true };
          current.current = saved;
          setSession(saved);
          try { localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(saved)); }
          catch { setStorageAvailable(false); }
          setSync("saved");
        }
      } catch { if (!stopped) setSync("waiting"); }
      finally { window.clearTimeout(timeout); sending = false; }
    }
    void send();
    window.addEventListener("online", send);
    const retry = window.setInterval(send, 60_000);
    return () => {
      stopped = true;
      controller?.abort();
      window.clearInterval(retry);
      window.removeEventListener("online", send);
    };
  }, [attemptId, completed]);

  useEffect(() => {
    if (active) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [active, session?.step, completed]);

  function start(fresh = false) {
    if (fresh || !session || session.expiresAt <= Date.now()) persist(newTestSession());
    setActive(true);
  }

  const answered = session?.answers.filter((answer) => answer !== null).length ?? 0;
  const score = session ? scoreTest(session.answers) : 0;
  const level = testLevel(score);
  const question = QUESTIONS[session?.step ?? 0];

  return (
    <main className="level-test">
      <div className="test-shell">
        {!active || !session ? (
          <section className="test-intro test-enter">
            <div className="test-intro-copy">
              <p className="eyebrow"><span className="status-dot" />{t("Votre prochain pas commence ici", "Your next step starts here")}</p>
              <h1>{t("Et si votre anglais", "What if your English")}<em>{t("vous surprenait ?", "surprised you?")}</em></h1>
              <p className="test-lead">{t("20 questions pour découvrir votre niveau et savoir par où commencer. À vous de jouer.", "20 questions to discover your level and find your next step. Give it a go.")}</p>
              <div className="test-facts"><span><Clock3 size={15} />{t("Environ 5 min", "About 5 min")}</span><span>{t("Gratuit", "Free")}</span><span>{t("Résultat immédiat", "Instant result")}</span></div>
              {ready && session && <p className="test-resume">{session.completed ? t("Votre dernier résultat vous attend.", "Your last result is waiting for you.") : t(`${answered} réponse${answered > 1 ? "s" : ""} conservée${answered > 1 ? "s" : ""}. Reprenez à votre rythme.`, `${answered} answer${answered > 1 ? "s" : ""} saved. Pick up where you left off.`)}</p>}
              <div className="test-actions">
                <button className="pill-button pill-gold" disabled={!ready} onClick={() => start()}>
                  {!ready ? t("Un instant…", "One moment…") : session ? (session.completed ? t("Revoir mon résultat", "View my result") : t("Reprendre mon test", "Resume my test")) : t("Découvrir mon niveau", "Discover my level")}<ArrowRight size={18} />
                </button>
                {ready && session && <button className="test-text-button" onClick={() => start(true)}><RotateCcw size={14} />{t("Nouveau test", "New test")}</button>}
              </div>
              <p className="test-note">{t("Sans inscription. Seul votre score est enregistré anonymement pour nos statistiques.", "No sign-up. Only your score is recorded anonymously for our statistics.")}</p>
            </div>
            <div className="test-orbit" aria-hidden="true"><div className="test-orbit-line" /><div className="test-orbit-core"><Sparkles size={26} /><strong>20</strong><span>questions</span></div><span className="test-orbit-label">{t("Un petit pas. Un nouveau départ.", "One small step. A fresh start.")}</span></div>
          </section>
        ) : session.completed ? (
          <section className="test-result test-enter">
            <div className="test-result-top"><p className="eyebrow"><Check size={16} />{t("Test terminé. Bien joué !", "Test complete. Well done!")}</p><button className="test-text-button" onClick={() => start(true)}><RotateCcw size={14} />{t("Refaire le test", "Try again")}</button></div>
            <div className="test-result-grid">
              <div className="test-score" style={{ "--score": `${score}%` } as CSSProperties}><div><strong>{score}<small>/100</small></strong><span>{t("Votre score", "Your score")}</span></div></div>
              <div><p className="test-kicker">{t(`Niveau estimé · ${level}/4`, `Estimated level · ${level}/4`)}</p><h1 ref={heading} tabIndex={-1}>{t(...levelNames[level - 1])}</h1><p className="test-lead">{t(...advice[level - 1])}</p><p className="test-note">{t("Ce test donne un repère, pas une certification de votre niveau oral ou écrit.", "This test is a guide, not a certification of your speaking or writing level.")}</p></div>
            </div>
            <div className="test-recommendation">
              <Image src={`/modules/level${level}.jpg`} alt={modules[level - 1]} width={100} height={135} />
              <div><p className="test-kicker">{t("Et maintenant ?", "What’s next?")}</p><h2>{modules[level - 1]}</h2><p>{t("Échangez avec notre formateur pour comprendre vos réponses et choisir la suite de votre parcours.", "Talk to our teacher to understand your answers and choose your next step.")}</p><a className="pill-button pill-gold" href={`https://wa.me/243981984788?text=${encodeURIComponent(t(`Bonjour Teacher, je viens de terminer le test : ${score}/100, niveau ${level}. Je souhaite recevoir la correction et découvrir ${modules[level - 1]}.`, `Hello Teacher, I completed the test: ${score}/100, level ${level}. I would like feedback and more information about ${modules[level - 1]}.`))}`} target="_blank" rel="noopener noreferrer">{t("Parler de mon résultat", "Discuss my result")}<ArrowRight size={16} /></a></div>
            </div>
            <p className="test-note" role="status">{sync === "saved" ? t("Merci ! Votre score a été enregistré anonymement.", "Thank you! Your score was recorded anonymously.") : sync === "waiting" ? t("Votre résultat est prêt. Son enregistrement sera réessayé automatiquement.", "Your result is ready. Saving it will be retried automatically.") : t("Enregistrement anonyme du score…", "Saving your anonymous score…")}</p>
          </section>
        ) : (
          <section className="test-workspace">
            <div className="test-toolbar"><button onClick={() => setActive(false)} className="test-text-button"><ArrowLeft size={15} />{t("Faire une pause", "Take a break")}</button><span>{t("Test de niveau", "Level test")}</span></div>
            <div className="test-progress-heading"><span>{t("Votre progression", "Your progress")}</span><strong>{answered}<span> / {QUESTIONS.length}</span></strong></div>
            <progress className="test-progress" value={answered} max={QUESTIONS.length} aria-label={t("Questions répondues", "Answered questions")} />
            <div className="test-question-card test-enter" key={session.step}>
              <p className="test-kicker">Question {String(session.step + 1).padStart(2, "0")} <span>/ {QUESTIONS.length}</span></p>
              <h1 ref={heading} tabIndex={-1} lang="en" id="test-question">{question.q}</h1>
              <p className="test-instruction">{t("Choisissez la réponse qui vous semble la plus juste.", "Choose the answer that feels right.")}</p>
              <div className="test-options" role="radiogroup" aria-labelledby="test-question">
                {question.options.map((option, index) => <label className={`test-option ${session.answers[session.step] === index ? "is-selected" : ""}`} key={index}>
                  <input type="radio" name={`question-${session.step}`} value={index} checked={session.answers[session.step] === index} onChange={() => { const answers = [...session.answers]; answers[session.step] = index; persist({ ...session, answers, expiresAt: Date.now() + TEST_TTL }); }} />
                  <span className="test-option-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span><span lang="en">{option}</span><Check className="test-option-check" size={18} aria-hidden="true" />
                </label>)}
              </div>
              <div className="test-question-actions"><button className="circle-button" disabled={session.step === 0} aria-label={t("Question précédente", "Previous question")} onClick={() => persist({ ...session, step: session.step - 1, expiresAt: Date.now() + TEST_TTL })}><ArrowLeft size={19} /></button><button className="pill-button pill-gold" disabled={session.answers[session.step] === null} onClick={() => persist({ ...session, step: Math.min(session.step + 1, QUESTIONS.length - 1), completed: session.step === QUESTIONS.length - 1, expiresAt: Date.now() + TEST_TTL })}>{session.step === QUESTIONS.length - 1 ? t("Voir mon résultat", "See my result") : t("Continuer", "Continue")}<ArrowRight size={18} /></button></div>
            </div>
            <p className="test-note test-save-note"><Clock3 size={13} />{t("À votre rythme, sans chronomètre.", "At your pace, without a timer.")}{storageAvailable && <> {t("Progression conservée 24 h sur cet appareil.", "Progress saved for 24 hours on this device.")}</>}</p>
          </section>
        )}
        {!storageAvailable && <p className="test-note" role="status">{t("La sauvegarde sur cet appareil est indisponible. Gardez cette page ouverte pour continuer votre test.", "Saving on this device is unavailable. Keep this page open to continue your test.")}</p>}
      </div>
    </main>
  );
}
