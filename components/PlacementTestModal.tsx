"use client";

import { useState, useEffect } from "react";
import { PLACEMENT_TESTS, PlacementQuestion } from "@/data/placementTests";

type PlacementTestModalProps = {
  levelSlug: string;
  levelTitle: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function PlacementTestModal({
  levelSlug,
  levelTitle,
  onClose,
  onSuccess,
}: PlacementTestModalProps) {
  const questions: PlacementQuestion[] = PLACEMENT_TESTS[levelSlug] || [];

  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionConfirmed, setIsOptionConfirmed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  const [hasCheated, setHasCheated] = useState(false);

  // 1. Système de détection anti-triche
  useEffect(() => {
    if (testFinished || hasCheated) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setHasCheated(true);
      }
    };

    const handleWindowBlur = () => {
      setHasCheated(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [testFinished, hasCheated]);

  // 2. Initialisation de la reconnaissance vocale
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.lang = "en-US";
        rec.interimResults = false;

        rec.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setSpokenText(text);
        };

        rec.onend = () => setIsListening(false);
        setRecognition(rec);
      }
    }
  }, []);

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div className="bg-[#121212] border border-[#c9a84c]/30 p-6 sm:p-8 rounded-2xl max-w-sm w-full text-center">
          <p className="text-white/70 text-sm sm:text-base">
            Aucune question configurée pour ce niveau.
          </p>
          <button
            onClick={onClose}
            className="mt-4 w-full sm:w-auto bg-[#c9a84c] text-black px-4 py-2 rounded-xl text-sm font-medium"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  const startListening = () => {
    if (!recognition) return;
    setSpokenText("");
    setIsListening(true);
    recognition.start();
  };

  const normalize = (t: string) =>
    t
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .trim();

  const handleNext = () => {
    const isOptionCorrect = selectedOption === currentQuestion.correctOption;
    const targetPhrase = normalize(currentQuestion.englishFull);
    const userPhrase = normalize(spokenText);
    const isSpeechCorrect =
      userPhrase.length > 0 &&
      (targetPhrase.includes(userPhrase) ||
        userPhrase.includes(targetPhrase) ||
        targetPhrase === userPhrase);

    if (isOptionCorrect && isSpeechCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    setSelectedOption(null);
    setIsOptionConfirmed(false);
    setSpokenText("");

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setTestFinished(true);
    }
  };

  const finalScorePercent = Math.round(
    (correctAnswersCount / questions.length) * 100,
  );
  const hasPassed = finalScorePercent >= 80;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-[#0f0f0f] border border-[#c9a84c]/30 rounded-2xl max-w-2xl w-full p-4 sm:p-8 relative shadow-2xl shadow-yellow-500/5 max-h-[calc(100vh-2rem)] overflow-y-auto">
        {/* ÉCRAN ANTI-TRICHE */}
        {hasCheated ? (
          <div className="text-center py-4 sm:py-8 animate-fadeIn">
            <span className="text-4xl sm:text-6xl block mb-4">⚠️</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-red-500 mb-2">
              Test Annulé pour Triche
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mb-6 max-w-md mx-auto leading-relaxed px-2">
              Vous avez quitté la fenêtre ou changé d'onglet pendant le test.
              Par souci d'équité et d'authenticité, toute sortie est
              éliminatoire.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
              <button
                onClick={() => {
                  setStep(0);
                  setCorrectAnswersCount(0);
                  setTestFinished(false);
                  setHasCheated(false);
                }}
                className="w-full sm:w-auto bg-[#c9a84c] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#e8c96a] transition text-xs sm:text-sm"
              >
                Recommencer honnêtement
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto border border-white/10 text-white/50 px-6 py-3 rounded-xl text-xs sm:text-sm hover:text-white transition"
              >
                Quitter
              </button>
            </div>
          </div>
        ) : !testFinished ? (
          /* ÉCRAN DE JEU CLASSIQUE */
          <div className="animate-fadeIn">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/40 hover:text-white text-xl p-2"
            >
              ✕
            </button>

            <h2 className="text-xl sm:text-2xl text-[#c9a84c] mb-1 font-serif pr-8">
              Test d'accès : {levelTitle}
            </h2>
            <p className="text-[10px] sm:text-xs text-red-400/80 uppercase tracking-widest mb-4 font-mono font-medium">
              ⚠️ Interdiction de quitter cet onglet
            </p>

            <div className="text-xs sm:text-sm text-white/50 mb-3 font-mono">
              Question {step + 1} / {questions.length}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 mb-4 text-center">
              <p className="text-lg sm:text-xl text-white font-light tracking-wide break-words">
                {currentQuestion.textWithBlank.replace(
                  "___",
                  selectedOption ? `[ ${selectedOption} ]` : "______",
                )}
              </p>
              <p className="text-[11px] sm:text-xs text-white/40 mt-2 italic">
                Traduisez : {currentQuestion.frenchTranslation}
              </p>
            </div>

            {/* Grille adaptative pour les options sur mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt}
                  disabled={isOptionConfirmed}
                  onClick={() => setSelectedOption(opt)}
                  className={`py-3 px-4 rounded-lg text-xs sm:text-sm transition font-medium border text-center break-words ${
                    selectedOption === opt
                      ? "bg-[#c9a84c] text-black border-[#c9a84c]"
                      : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selectedOption && !isOptionConfirmed && (
              <button
                onClick={() => setIsOptionConfirmed(true)}
                className="w-full bg-white/10 text-white py-3 rounded-lg text-xs sm:text-sm border border-white/20 hover:bg-white/20 transition mb-4 font-medium"
              >
                Confirmer l'option & Étape Vocale
              </button>
            )}

            {isOptionConfirmed && (
              <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-xl p-4 sm:p-6 text-center animate-fadeIn space-y-4">
                <p className="text-[10px] sm:text-xs uppercase text-[#c9a84c] tracking-widest">
                  Étape Orale : Lisez la phrase complète
                </p>
                <p className="text-base sm:text-lg text-white/90 font-serif leading-relaxed break-words px-2">
                  "
                  {currentQuestion.textWithBlank.replace(
                    "___",
                    selectedOption || "",
                  )}
                  "
                </p>

                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={startListening}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full text-xl sm:text-2xl transition flex items-center justify-center ${
                      isListening
                        ? "bg-red-500 animate-pulse text-white"
                        : "bg-[#c9a84c] text-black"
                    }`}
                  >
                    {isListening ? "🛑" : "🎙️"}
                  </button>
                  <p className="text-[10px] sm:text-[11px] text-white/40 mt-2">
                    {isListening
                      ? "Parlez maintenant..."
                      : "Cliquez pour parler"}
                  </p>
                </div>

                {spokenText && (
                  <div className="bg-black/40 p-3 rounded-lg text-xs sm:text-sm border border-white/5 text-left break-words">
                    <span className="text-green-400 text-[10px] sm:text-xs block mb-1 font-medium">
                      Texte détecté :
                    </span>
                    <span className="text-white italic">"{spokenText}"</span>
                  </div>
                )}

                {spokenText && (
                  <button
                    onClick={handleNext}
                    className="w-full bg-[#c9a84c] text-black py-3 rounded-xl font-semibold hover:bg-[#e8c96a] transition text-xs sm:text-sm shadow-lg shadow-yellow-500/10"
                  >
                    {step + 1 === questions.length
                      ? "Terminer le test ➔"
                      : "Question suivante ➔"}
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ÉCRAN DE RÉSULTAT FINAL */
          <div className="text-center py-4 sm:py-6">
            <span className="text-4xl sm:text-5xl">
              {hasPassed ? "🎉" : "🔒"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif mt-4 mb-2 text-white">
              {hasPassed ? "Test Réussi !" : "Score Insuffisant"}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mb-6 max-w-sm mx-auto px-2 leading-relaxed">
              Vous avez obtenu un score de{" "}
              <strong className="text-[#c9a84c] text-base sm:text-lg">
                {finalScorePercent}%
              </strong>{" "}
              ({correctAnswersCount} sur {questions.length} correctes).
              {!hasPassed &&
                " Un score de 80% minimum est requis pour déverrouiller ce palier d'apprentissage."}
            </p>

            {hasPassed ? (
              <button
                onClick={onSuccess}
                className="w-full sm:w-auto bg-[#c9a84c] text-black px-10 py-3 rounded-xl font-semibold hover:bg-[#e8c96a] transition text-xs sm:text-sm"
              >
                Débloquer et Entrer
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                <button
                  onClick={() => {
                    setStep(0);
                    setCorrectAnswersCount(0);
                    setTestFinished(false);
                  }}
                  className="w-full sm:w-auto bg-white/10 text-white px-6 py-3 rounded-xl border border-white/10 text-xs sm:text-sm hover:bg-white/20 transition"
                >
                  Recommencer le test
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto border border-white/20 text-white/60 px-6 py-3 rounded-xl text-xs sm:text-sm hover:text-white transition"
                >
                  Retour
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
