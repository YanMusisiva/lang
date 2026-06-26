"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLang } from "@/context/LangContext";
import { PRACTICE } from "@/data/practice";

type Question = {
  french: string;
  english: string;
};

type WritingExerciseProps = {
  questions: Question[];
  level: string;
  module: string;
};

export default function WritingExercise({
  questions,
  level,
  module,
}: WritingExerciseProps) {
  const { t } = useLang();

  // Clé unique propre à ce niveau et ce module
  const storageKey = `translation-progress-${level}-${module}`;

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [hasProgress, setHasProgress] = useState(false);

  // États liés au verrouillage séquentiel
  const [isLocked, setIsLocked] = useState(false);
  const [previousModuleTitle, setPreviousModuleTitle] = useState("");

  // 1. Vérification des prérequis de blocage (Vérifie le module précédent)
  useEffect(() => {
    const currentLevelData = PRACTICE[level as keyof typeof PRACTICE];
    if (!currentLevelData) return;

    const moduleKeys = Object.keys(currentLevelData.modules);
    const currentIndex = moduleKeys.indexOf(module);

    // Si ce n'est pas le premier module du niveau
    if (currentIndex > 0) {
      const prevModuleKey = moduleKeys[currentIndex - 1];
      const prevModuleData = currentLevelData.modules[
        prevModuleKey as keyof typeof currentLevelData.modules
      ] as
        | { title?: string; dataset?: string; type?: "speaking" | "writing" }
        | undefined;

      setPreviousModuleTitle(prevModuleData?.title ?? "");

      // Vérifie s'il existe une progression sur le module précédent (indifféremment Speaking ou Writing)
      const prevSpeakingSaved = localStorage.getItem(
        `speaking-progress-${level}-${prevModuleKey}`,
      );
      const prevWritingSaved = localStorage.getItem(
        `translation-progress-${level}-${prevModuleKey}`,
      );

      // Si aucune sauvegarde n'est détectée pour le module précédent, on bloque l'accès
      if (!prevSpeakingSaved && !prevWritingSaved) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    }
  }, [level, module]);

  // 2. Récupération de la progression spécifique à ce module
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const data = JSON.parse(saved);

      if (data.step >= questions.length) {
        localStorage.removeItem(storageKey);
        return;
      }

      setStep(data.step || 0);
      setScore(data.score || 0);
      setAnswers(data.answers || []);
      setHasProgress(true);
    }
  }, [storageKey, questions.length]);

  // ==========================================
  // 1. BLOCAGE SI LE MODULE PRÉCÉDENT N'A PAS >= 50%
  // ==========================================
  useEffect(() => {
    const currentLevelData = PRACTICE[level as keyof typeof PRACTICE];
    if (!currentLevelData) return;

    const moduleKeys = Object.keys(currentLevelData.modules);
    const currentIndex = moduleKeys.indexOf(module);

    // Si ce n'est pas le premier module du niveau, on inspecte le précédent
    if (currentIndex > 0) {
      const prevModuleKey = moduleKeys[currentIndex - 1];
      const prevModuleData = currentLevelData.modules[
        prevModuleKey as keyof typeof currentLevelData.modules
      ] as
        | { title?: string; dataset?: string; type?: "speaking" | "writing" }
        | undefined;

      setPreviousModuleTitle(prevModuleData?.title ?? "");

      const prevSpeakingSaved = localStorage.getItem(
        `speaking-progress-${level}-${prevModuleKey}`,
      );
      const prevWritingSaved = localStorage.getItem(
        `translation-progress-${level}-${prevModuleKey}`,
      );

      let isPrevFinished = false;
      let prevScorePercent = 0;

      // Détection de la complétion et calcul du score sur 100
      if (prevSpeakingSaved) {
        const data = JSON.parse(prevSpeakingSaved);
        isPrevFinished = data.isFinished === true;
        if (data.totalQuestions) {
          prevScorePercent = Math.round(
            (data.score / data.totalQuestions) * 100,
          );
        }
      } else if (prevWritingSaved) {
        const data = JSON.parse(prevWritingSaved);
        isPrevFinished = data.isFinished === true;
        if (data.totalQuestions) {
          prevScorePercent = Math.round(
            (data.score / data.totalQuestions) * 100,
          );
        }
      }

      // Sécurité stricte : Verrouillage si non terminé OU moins de 50% de réussite
      if (!isPrevFinished || prevScorePercent < 50) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    }
  }, [level, module]);

  // ==========================================
  // 2. SAUVEGARDE ENREGISTRANT LE TOTAL DE QUESTIONS ET LA COMPLÉTION
  // ==========================================
  useEffect(() => {
    if (!started && !hasProgress) return;

    // Le module est considéré terminé si l'utilisateur a répondu à toutes les questions
    const finished = step >= questions.length && questions.length > 0;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        step,
        score,
        answers,
        started,
        hasProgress: true,
        totalQuestions: questions.length, // Permet le calcul du taux de réussite sur la liste
        isFinished: finished,
      }),
    );
  }, [
    step,
    score,
    answers,
    started,
    hasProgress,
    storageKey,
    questions.length,
  ]);

  const restartProgress = () => {
    localStorage.removeItem(storageKey);
    setStep(0);
    setScore(0);
    setAnswers([]);
    setInput("");
    setShowAnswer(false);
    setHasProgress(false);
    setStarted(true);
  };

  const currentQuestion = questions[step];

  const normalize = (text: string) => {
    const contractions: Record<string, string> = {
      "i'm": "i am",
      "you're": "you are",
      "he's": "he is",
      "she's": "she is",
      "it's": "it is",
      "we're": "we are",
      "they're": "they are",
      "that's": "that is",
      "there's": "there is",
      "who's": "who is",
      "what's": "what is",
      "where's": "where is",
      "when's": "when is",
      "why's": "why is",
      "how's": "how is",
      "i've": "i have",
      "you've": "you have",
      "we've": "we have",
      "they've": "they have",
      "can't": "cannot",
      "don't": "do not",
      "didn't": "did not",
      "doesn't": "does not",
      "won't": "will not",
      "shouldn't": "should not",
      "couldn't": "could not",
      "wouldn't": "would not",
      "haven't": "have not",
      "hasn't": "has not",
      "hadn't": "had not",
    };

    const expanded = text
      .toLowerCase()
      .replace(
        /\b(?:i'm|you're|he's|she's|it's|we're|they're|that's|there's|who's|what's|where's|when's|why's|how's|i've|you've|we've|they've|can't|don't|didn't|doesn't|won't|shouldn't|couldn't|wouldn't|haven't|hasn't|hadn't|ain't)\b/g,
        (match) => contractions[match],
      );

    return expanded
      .replace(/[.,!?;:'"]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const confirmAnswer = () => {
    const copy = [...answers];
    copy[step] = input;
    setAnswers(copy);

    const userAnswer = normalize(input);
    const correctAnswer = normalize(currentQuestion.english);

    if (userAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setStep(step + 1);
    setInput(answers[step + 1] || "");
    setShowAnswer(false);
  };

  // 4. Calcul dynamique du lien vers le module suivant
  const getNextModuleUrl = () => {
    const currentLevelData = PRACTICE[level as keyof typeof PRACTICE];
    if (!currentLevelData) return `/practice/${level}`;

    const moduleKeys = Object.keys(currentLevelData.modules);
    const currentIndex = moduleKeys.indexOf(module);

    if (currentIndex !== -1 && currentIndex < moduleKeys.length - 1) {
      const nextModuleKey = moduleKeys[currentIndex + 1];
      return `/practice/${level}/${nextModuleKey}`;
    }
    return `/practice/${level}`;
  };

  const progress = ((step + 1) / questions.length) * 100;

  // RENDER : Écran d'interdiction / Verrouillage
  if (isLocked) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <Navbar />
        <div className="max-w-md w-full bg-white/5 border border-yellow-500/20 rounded-xl p-8 text-center mt-12">
          <span className="text-5xl">🔒</span>
          <h2 className="text-[#c9a84c] text-2xl font-bold mt-4 mb-2">
            Module Verrouillé
          </h2>
          <p className="text-white/70 text-sm mb-6 leading-relaxed">
            Pour commencer ce test, vous devez d'avance terminer le module
            précédent : <br />
            <strong className="text-white">"{previousModuleTitle}"</strong>.
          </p>
          <Link
            href={`/practice/${level}`}
            className="bg-[#c9a84c] text-black px-6 py-2.5 rounded font-semibold hover:bg-[#e8c96a] transition text-sm"
          >
            Retourner aux modules
          </Link>
        </div>
      </section>
    );
  }

  // RENDER : Écran d'accueil avant de démarrer
  if (!started) {
    const savedRaw =
      typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    const isAlreadyDone = savedRaw ? JSON.parse(savedRaw).isFinished : false;
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 text-white">
        <Navbar />

        <div className="max-w-3xl w-full text-center pt-10">
          <div className="text-left mb-6">
            <Link
              href={`/practice/${level}`}
              className="text-sm text-white/50 hover:text-[#c9a84c] transition"
            >
              ← Back to Level
            </Link>
          </div>

          <h1
            className="text-5xl mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Test d'Expression Écrite
          </h1>

          {isAlreadyDone ? (
            <div className="bg-white/5 border border-green-500/20 rounded-xl p-8 mb-8">
              <h2 className="text-green-400 text-2xl mb-2">✓ Module Terminé</h2>
              <p className="text-white/70 mb-6">
                Félicitations, vous avez validé ce test écrit.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={restartProgress}
                  className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition"
                >
                  Refaire le test
                </button>
                <Link
                  href={`/practice/${level}`}
                  className="border border-white/20 text-white px-8 py-4 rounded hover:bg-white/10 transition"
                >
                  Retour aux modules
                </Link>
              </div>
            </div>
          ) : hasProgress ? (
            <>
              <div className="bg-white/5 border border-[#c9a84c]/20 rounded-xl p-8 mb-8">
                <h2 className="text-[#c9a84c] text-2xl mb-4">Welcome Back</h2>
                <p className="text-white/70 text-lg mb-2">
                  Vous aviez interrompu cet exercice.
                </p>
                <p className="text-white/50 text-sm">
                  Question actuelle :{" "}
                  <strong className="text-[#c9a84c] text-lg">
                    {step + 1} / {questions.length}
                  </strong>
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setStarted(true)}
                  className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition"
                >
                  Continuer le test
                </button>
                <button
                  onClick={restartProgress}
                  className="border border-white/20 text-white px-8 py-4 rounded hover:border-red-400 hover:text-red-400 transition"
                >
                  Recommencer à la question 1
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                Traduisez chaque phrase du français vers l'anglais. Après avoir
                confirmé votre réponse, la correction apparaîtra immédiatement.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition"
              >
                Commencer le test
              </button>
            </>
          )}
        </div>
      </section>
    );
  }

  // RENDER : Écran de fin d'exercice (Exercice Complété)
  if (step >= questions.length) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 text-white">
        <Navbar />

        <div className="max-w-2xl w-full pt-10 text-center">
          <h2
            className="text-5xl text-[#c9a84c] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Test terminé
          </h2>

          <p className="text-white/70 text-lg mb-6">
            Vous avez fini d'évaluer toutes les questions de ce module.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8 text-center">
            <p className="text-white/50 uppercase tracking-widest text-xs mb-2">
              Final Score
            </p>
            <h2
              className="text-[#c9a84c] text-6xl font-bold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {score}/{questions.length}
            </h2>
            <p className="text-white/60 text-sm">
              Taux de précision : {Math.round((score / questions.length) * 100)}
              %
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <button
              onClick={restartProgress}
              className="bg-white/5 border border-white/20 text-white py-4 rounded-lg font-semibold hover:border-white transition"
            >
              🔄 Refaire le test
            </button>
            <Link
              href={getNextModuleUrl()}
              className="bg-[#c9a84c] text-black py-4 rounded-lg font-semibold hover:bg-[#e8c96a] transition flex items-center justify-center gap-1"
            >
              Exercice suivant ➔
            </Link>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-xl p-6 mb-8 text-sm text-white/60 leading-relaxed">
            Besoin d'un retour ou de conseils sur vos erreurs d'écriture ?
            Contactez un formateur :
            <div className="mt-4">
              <a
                href="https://wa.me/243981984788?text=Bonjour%20Teacher%2C%20je%20viens%20de%20terminer%20le%20test%20d%27ecriture."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600/20 border border-green-500/30 text-green-400 font-medium px-6 py-2.5 rounded-lg hover:bg-green-600/40 transition"
              >
                {t("Ecrire un formateur", "Write to a tutor")}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // RENDER : Interface d'entraînement principale (Session en cours)
  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 text-white py-12">
      <Navbar />

      <div className="max-w-3xl w-full pt-10">
        <div className="flex justify-between items-center mb-6">
          <Link
            href={`/practice/${level}`}
            className="text-xs text-white/50 hover:text-[#c9a84c] transition underline"
          >
            ← Abandonner le test
          </Link>
          <span className="text-xs bg-white/10 px-3 py-1 rounded text-white/70 uppercase tracking-widest">
            Writing Mode
          </span>
        </div>

        {/* Barre de progression supérieure */}
        <div className="w-full bg-white/10 h-1.5 rounded-full mb-8">
          <div
            className="h-1.5 bg-[#c9a84c] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center mb-8">
          <p className="text-white/50 uppercase tracking-widest text-xs mb-1">
            Score Actuel
          </p>
          <h2
            className="text-[#c9a84c] text-5xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {score}/{questions.length}
          </h2>
          <p className="text-white/40 text-xs mt-2">
            Phrase {step + 1} sur {questions.length}
          </p>
        </div>

        <h2 className="text-2xl text-white/60 text-center mb-4 font-light">
          Traduisez la phrase suivante :
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-6 text-center">
          <p className="text-2xl text-[#e8c96a] font-medium">
            "{currentQuestion.french}"
          </p>
        </div>

        <textarea
          value={input}
          disabled={showAnswer}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Saisissez votre traduction anglaise ici..."
          className="w-full min-h-[120px] bg-white/5 border border-white/20 rounded-xl p-4 text-white outline-none focus:border-[#c9a84c] transition resize-none text-lg"
        />

        {!showAnswer && (
          <div className="text-center mt-6">
            <button
              onClick={confirmAnswer}
              disabled={!input.trim()}
              className="bg-[#c9a84c] text-black px-10 py-3.5 rounded-xl font-semibold hover:bg-[#e8c96a] transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
            >
              Confirmer ma réponse
            </button>
          </div>
        )}

        {showAnswer && (
          <div className="mt-8 animate-fadeIn">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6">
              <h3 className="text-green-400 text-xs uppercase tracking-wider font-semibold mb-2">
                Correction attendue :
              </h3>
              <p className="text-white text-xl font-medium">
                "{currentQuestion.english}"
              </p>
            </div>

            <div className="text-center mb-12">
              <button
                onClick={nextQuestion}
                className="bg-[#c9a84c] text-black px-12 py-3.5 rounded-xl font-semibold hover:bg-[#e8c96a] transition shadow-md"
              >
                {step + 1 === questions.length
                  ? "Terminer le test ➔"
                  : "Question suivante ➔"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
