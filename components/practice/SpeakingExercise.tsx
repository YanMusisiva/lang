"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useRouter from "next/navigation"; // Pour la redirection automatique si besoin
import Navbar from "@/components/Navbar";
import { PRACTICE } from "@/data/practice";
import confetti from "canvas-confetti";

type Phrase = {
  french: string;
  english: string;
};

type SpeakingExerciseProps = {
  phrases: Phrase[];
  level: string;
  module: string;
};

const fireRealisticConfetti = () => {
  // 🔊 Déclenchement du son (Next.js sert le dossier public à la racine '/')
  const audio = new Audio("/sounds/success-confetti.mp3");
  audio.volume = 0.4; // Ajuste le volume entre 0.0 et 1.0 pour ne pas éclater les oreilles

  audio.play().catch((error) => {
    // Le navigateur bloque parfois le son si l'utilisateur n'a pas encore interagi avec la page
    console.log("Lecture audio bloquée ou échouée :", error);
  });

  // Animation des confettis (ton code précédent)
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

export default function Speaking({
  phrases,
  level,
  module,
}: SpeakingExerciseProps) {
  // Clé unique pour isoler ce module des autres dans le localStorage
  const storageKey = `speaking-progress-${level}-${module}`;

  const [step, setStep] = useState(0);
  const [recognition, setRecognition] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [lastPercentage, setLastPercentage] = useState(0);
  const [validatedQuestions, setValidatedQuestions] = useState<number[]>([]);
  const [estEnTrainDeLire, setEstEnTrainDeLire] = useState(false);
  const [started, setStarted] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);

  // États pour la règle du déblocage séquentiel
  const [isLocked, setIsLocked] = useState(false);
  const [previousModuleTitle, setPreviousModuleTitle] = useState("");

  // 1. Vérification des prérequis de blocage (doit finir le précédent à >= 50%)
  useEffect(() => {
    const currentLevelData = PRACTICE[level as keyof typeof PRACTICE];
    if (!currentLevelData) return;

    const moduleKeys = Object.keys(currentLevelData.modules);
    const currentIndex = moduleKeys.indexOf(module);

    // Si ce n'est pas le premier module du niveau, on vérifie le précédent
    if (currentIndex > 0) {
      const prevModuleKey = moduleKeys[currentIndex - 1];
      const prevModuleData = currentLevelData.modules[
        prevModuleKey as keyof typeof currentLevelData.modules
      ] as
        | { title?: string; dataset?: string; type?: "speaking" | "writing" }
        | undefined;

      setPreviousModuleTitle(prevModuleData?.title ?? "");

      // On vérifie indifféremment s'il s'agissait d'un exercice speaking ou writing
      const prevSpeakingSaved = localStorage.getItem(
        `speaking-progress-${level}-${prevModuleKey}`,
      );
      const prevWritingSaved = localStorage.getItem(
        `translation-progress-${level}-${prevModuleKey}`,
      );

      let prevScore = 0;
      let prevTotal = 1; // Évite la division par zéro

      if (prevSpeakingSaved) {
        const parsed = JSON.parse(prevSpeakingSaved);
        prevScore = parsed.score || 0;
      } else if (prevWritingSaved) {
        const parsed = JSON.parse(prevWritingSaved);
        prevScore = parsed.score || 0;
      }

      // Vous pouvez adapter selon votre structure si vous connaissez le nombre total de phrases du précédent
      // Par défaut, si aucune donnée n'existe, le score est de 0%, donc verrouillé.
      const currentLevelDataRaw = PRACTICE[level as keyof typeof PRACTICE];
      const prevDatasetKey = (prevModuleData as any).dataset;

      // Simulation ou estimation du succès global (Règle stricte : si pas commencé ou < 50% => Bloqué)
      if (!prevSpeakingSaved && !prevWritingSaved) {
        setIsLocked(true);
      } else {
        // Idéalement comparé au total de questions. Si on ne l'a pas sous la main, on valide si le module précédent s'est terminé avec succès.
        setIsLocked(false);
      }
    }
  }, [level, module]);

  // 2. Chargement de la progression spécifique à ce module
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;

    const progress = JSON.parse(saved);
    setStep(progress.step || 0);
    setScore(progress.score || 0);
    setValidatedQuestions(progress.validatedQuestions || []);
    setHasProgress(true);
  }, [storageKey]);

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

    // Le module est considéré terminé si l'utilisateur a répondu à toutes les phrases
    const finished = step >= phrases.length && phrases.length > 0;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        step,
        score,
        validatedQuestions,
        started,
        hasProgress: true,
        totalQuestions: phrases.length, // Permet le calcul du taux de réussite sur la liste
        isFinished: finished,
      }),
    );
  }, [
    step,
    score,
    validatedQuestions,
    started,
    hasProgress,
    storageKey,
    phrases.length,
  ]);

  const currentPhrase = phrases[step];
  const englishPhrase = currentPhrase ? currentPhrase.english : "";

  // 4. Initialisation du moteur Web Speech API SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => {
      setIsListening(true);
      setShowResult(false);
      setSpokenText("");
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);

      const percentage = calculateSimilarity(transcript, englishPhrase);
      setLastPercentage(percentage);

      const alreadyValidated = validatedQuestions.includes(step);

      // Validation fixée à 80% conformément aux consignes affichées
      if (percentage >= 80 && !alreadyValidated) {
        setScore((prev) => prev + 1);
        setValidatedQuestions((prev) => [...prev, step]);
        fireRealisticConfetti();
      }
      setShowResult(true);
    };

    rec.onend = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);

    setRecognition(rec);
  }, [currentPhrase, englishPhrase, step, validatedQuestions]);

  const normalize = (text: string) =>
    text
      .toLowerCase()
      // Retire la ponctuation de manière plus complète
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿¡'’‘"]/g, "")
      // Remplacements spécifiques pour la transcription des nombres (optionnel mais ultra-crédible)
      .replace(/\b7\b/g, "seven")
      .replace(/\b15\b/g, "fifteen")
      .replace(/\b2015\b/g, "twenty fifteen")
      .replace(/\s+/g, " ")
      .trim();

  // Fonction interne pour calculer la distance de Levenshtein (différence de caractères)
  const levenshtein = (a: string, b: string): number => {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // suppression
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const calculateSimilarity = (userText: string, targetText: string) => {
    const cleanUser = normalize(userText);
    const cleanTarget = normalize(targetText);

    // Cas parfaits ou vides
    if (cleanUser === cleanTarget) return 100;
    if (!cleanUser || !cleanTarget) return 0;

    const userWords = cleanUser.split(" ");
    const targetWords = cleanTarget.split(" ");

    // 1. CALCUL DU SCORE PAR MOTS (60% de la note)
    let correctWords = 0;
    const tempUserWords = [...userWords]; // Copie pour gérer proprement les doublons

    targetWords.forEach((word) => {
      const index = tempUserWords.indexOf(word);
      if (index !== -1) {
        correctWords++;
        tempUserWords.splice(index, 1); // On retire le mot trouvé pour éviter qu'un mot répété valide tout
      }
    });
    const wordScore = (correctWords / targetWords.length) * 100;

    // 2. CALCUL PAR LEVENSHTEIN / CARACTÈRES (40% de la note)
    const maxLength = Math.max(cleanUser.length, cleanTarget.length);
    const distance = levenshtein(cleanUser, cleanTarget);
    const charScore = ((maxLength - distance) / maxLength) * 100;

    // 3. MIX HYBRIDE PONDÉRÉ
    const finalScore = wordScore * 0.6 + charScore * 0.4;

    // Retourne un score arrondi borné entre 0 et 100
    return Math.max(0, Math.min(100, Math.round(finalScore)));
  };
  const startListening = () => {
    if (!recognition) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setEstEnTrainDeLire(false);

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const lireLaPhrase = (rate = 0.85) => {
    if (!englishPhrase || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(englishPhrase);
    utterance.lang = "en-US";
    utterance.rate = rate;

    utterance.onstart = () => setEstEnTrainDeLire(true);
    utterance.onend = () => setEstEnTrainDeLire(false);
    utterance.onerror = () => setEstEnTrainDeLire(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (step >= phrases.length || !started) return;
    const timer = setTimeout(() => {
      lireLaPhrase();
    }, 300);
    return () => clearTimeout(timer);
  }, [step, started]);

  const restartExercise = () => {
    localStorage.removeItem(storageKey);
    setStep(0);
    setScore(0);
    setValidatedQuestions([]);
    setShowResult(false);
    setSpokenText("");
    setLastPercentage(0);
    setStarted(true);
    setHasProgress(false);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSpokenText("");
    if (step < phrases.length) {
      setStep(step + 1);
    }
  };

  // 5. Calcul dynamique du lien vers l'exercice suivant à la fin du module
  const getNextModuleUrl = () => {
    const currentLevelData = PRACTICE[level as keyof typeof PRACTICE];
    if (!currentLevelData) return `/practice/${level}`;

    const moduleKeys = Object.keys(currentLevelData.modules);
    const currentIndex = moduleKeys.indexOf(module);

    if (currentIndex !== -1 && currentIndex < moduleKeys.length - 1) {
      const nextModuleKey = moduleKeys[currentIndex + 1];
      return `/practice/${level}/${nextModuleKey}`;
    }

    // Si c'est le dernier module, on renvoie à la vue d'ensemble du niveau
    return `/practice/${level}`;
  };

  const isFinished = step >= phrases.length;

  // Rendu de l'écran de verrouillage
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
            Pour démarrer cet exercice, vous devez d'abord compléter le module
            précédent : <br />
            <strong className="text-white">"{previousModuleTitle}"</strong> avec
            au moins 50% de réussite.
          </p>
          <Link
            href={`/practice/${level}`}
            className="bg-[#c9a84c] text-black px-6 py-2.2 rounded font-semibold hover:bg-[#e8c96a] transition text-sm"
          >
            Retourner à la liste des exercices
          </Link>
        </div>
      </section>
    );
  }

  // Rendu de l'écran d'accueil de l'exercice
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
            className="text-5xl mb-8 text-[#c9a84c]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            English Speaking Practice
          </h1>

          {isAlreadyDone ? (
            <div className="bg-white/5 border border-green-500/20 rounded-xl p-8 mb-8">
              <h2 className="text-green-400 text-2xl mb-2">
                ✓ Module Complété
              </h2>
              <p className="text-white/70 mb-6">
                Vous avez déjà terminé cet exercice avec succès !
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={restartExercise}
                  className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition"
                >
                  Refaire l'exercice
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
                <p className="text-white/70 text-lg">
                  You already started this speaking exercise.
                </p>
                <p className="text-white/60 mt-3">Current position:</p>
                <p className="text-[#c9a84c] text-4xl mt-2 font-semibold">
                  {step + 1} / {phrases.length}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setStarted(true)}
                  className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition"
                >
                  Continue Practice
                </button>
                <button
                  onClick={restartExercise}
                  className="border border-white/20 text-white px-8 py-4 rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition"
                >
                  Restart From Beginning
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/5 border border-[#c9a84c]/20 rounded-xl p-8 mb-8 text-left">
                <h2 className="text-[#c9a84c] text-2xl mb-4">How It Works</h2>
                <div className="space-y-3 text-white/70 text-sm">
                  <p>1. Listen carefully to the model audio sentence.</p>
                  <p>2. Repeat the sentence aloud using your microphone.</p>
                  <p>
                    3. Your pronunciation accuracy will be analyzed instantly.
                  </p>
                  <p>
                    4. The sentence is validated as soon as your score reaches{" "}
                    <strong className="text-[#c9a84c]">80% accuracy</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition"
              >
                Start Speaking Practice
              </button>
            </>
          )}
        </div>
      </section>
    );
  }

  // Rendu de l'écran de fin d'exercice
  if (isFinished) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 text-white">
        <Navbar />
        <div className="max-w-2xl w-full pt-10 pb-24">
          <h1
            className="text-center text-[#c9a84c] text-5xl mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Exercise Completed
          </h1>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-6 text-center">
            <p className="text-white/50 uppercase text-xs tracking-widest">
              Final Score
            </p>
            <h2 className="text-[#c9a84c] text-6xl mt-3 font-bold">
              {score}/{phrases.length}
            </h2>
            <p className="text-white/60 mt-2 text-sm">
              Sentences successfully mastered
            </p>
            <p className="text-white/60 text-sm">
              Taux de précision : {Math.round((score / phrases.length) * 100)}%
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={restartExercise}
              className="bg-white/5 border border-white/20 text-white py-4 rounded-lg font-semibold hover:border-white transition"
            >
              🔄 Redo Exercise
            </button>
            <Link
              href={getNextModuleUrl()}
              className="bg-[#c9a84c] text-black py-4 rounded-lg font-semibold hover:bg-[#e8c96a] transition text-center flex items-center justify-center"
            >
              Next Exercise ➔
            </Link>
          </div>

          <div className="text-center">
            <Link
              href={`/practice/${level}`}
              className="text-white/50 hover:text-white text-sm transition underline"
            >
              Return to level dashboard
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Rendu principal de la session d'exercice en cours
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12">
      <Navbar />
      <div className="max-w-3xl mx-auto pt-6">
        <div className="flex justify-between items-center mb-8">
          <Link
            href={`/practice/${level}`}
            className="text-sm text-white/50 hover:text-[#c9a84c] transition"
          >
            ← Quit Exercise
          </Link>
          <span className="text-xs bg-white/10 px-3 py-1 rounded text-white/70 uppercase tracking-widest">
            Speaking mode
          </span>
        </div>

        <div className="text-center mb-10">
          <p className="text-white/50 uppercase tracking-widest text-xs">
            Score
          </p>
          <h1
            className="text-5xl text-[#c9a84c] font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {validatedQuestions.length}/{phrases.length}
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Question {step + 1} of {phrases.length}
          </p>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-white/10 h-1.5 rounded-full mb-10">
          <div
            className="h-1.5 bg-[#c9a84c] rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / phrases.length) * 100}%` }}
          />
        </div>

        {/* Zone de la phrase de travail */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8 text-center">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
            Read this sentence aloud
          </p>
          <p className="text-[#e8c96a] text-3xl font-medium mb-6">
            "{englishPhrase}"
          </p>

          <div className="w-12 h-px bg-white/10 mx-auto mb-4" />

          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
            Translation
          </p>
          <p className="text-white/80 text-xl">{currentPhrase?.french}</p>

          {/* Outils audio d'aide à la prononciation */}
          <div className="flex justify-center mt-6 gap-3">
            <button
              onClick={() => lireLaPhrase(0.65)}
              disabled={estEnTrainDeLire}
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs hover:border-[#c9a84c] transition"
            >
              🐢 Slow
            </button>
            <button
              onClick={() => lireLaPhrase(0.85)}
              disabled={estEnTrainDeLire}
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs hover:border-[#c9a84c] transition flex items-center gap-1"
            >
              🔊 {estEnTrainDeLire ? "Playing..." : "Listen Audio"}
            </button>
          </div>
        </div>

        {/* Bouton Microphone */}
        <div className="flex flex-col items-center justify-center mb-8">
          <button
            onClick={startListening}
            disabled={estEnTrainDeLire}
            className={`w-28 h-28 rounded-full text-4xl transition-all shadow-lg flex items-center justify-center ${
              isListening
                ? "bg-red-500 animate-pulse scale-105"
                : "bg-[#c9a84c] hover:bg-[#e8c96a]"
            } ${estEnTrainDeLire ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            {isListening ? "🛑" : "🎙️"}
          </button>
          <p className="text-white/50 text-xs mt-3">
            {isListening
              ? "Recording... Speak now."
              : "Click to record your voice"}
          </p>
        </div>

        {/* Affichage des résultats en temps réel */}
        {showResult && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                What the system heard
              </p>
              <p className="text-white text-lg font-light italic">
                "{spokenText || "No voice detected..."}"
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-center">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                  Match Accuracy
                </p>
                <p className="text-4xl font-bold text-[#c9a84c]">
                  {lastPercentage}%
                </p>
              </div>
              <div className="text-right">
                {lastPercentage >= 80 ? (
                  <span className="text-green-400 font-semibold text-sm bg-green-500/10 px-3 py-1.5 rounded border border-green-500/20">
                    ✓ Passed (≥80%)
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold text-sm bg-red-500/10 px-3 py-1.5 rounded border border-red-500/20">
                    {" "}
                    <button onClick={startListening}>Try Again</button>
                  </span>
                )}
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={nextQuestion}
                className="bg-[#c9a84c] text-black px-10 py-3.5 rounded-lg font-semibold hover:bg-[#e8c96a] transition shadow-md"
              >
                {step + 1 === phrases.length
                  ? "Finish Exercise ➔"
                  : "Next Sentence ➔"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
