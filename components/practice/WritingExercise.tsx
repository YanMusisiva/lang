"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLang } from "@/context/LangContext";
import { useEffect } from "react";

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

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [hasProgress, setHasProgress] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("translation-progress");

    if (saved) {
      const data = JSON.parse(saved);

      if (data.step >= questions.length) {
        localStorage.removeItem("translation-progress");
        return;
      }

      setStep(data.step || 0);
      setScore(data.score || 0);
      setAnswers(data.answers || []);
      // setStarted(data.started || false);
      setHasProgress(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "translation-progress",
      JSON.stringify({
        step,
        score,
        answers,
        started,
      }),
    );
  }, [step, score, answers, started]);

  const restartProgress = () => {
    localStorage.removeItem("translation-progress");

    setStep(0);
    setScore(0);
    setAnswers([]);
    setInput("");
    setShowAnswer(false);
    setHasProgress(false);
  };

  const showMilestone = step > 0 && step % 100 === 0 && !showAnswer;

  {
    showMilestone && (
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl p-6 mb-8 text-center">
        <h3 className="text-[#c9a84c] text-2xl font-semibold mb-3">
          🎉 Congratulations!
        </h3>

        <p className="text-white/80">
          You have completed {step} translation exercises.
        </p>

        <p className="text-white/60 mt-2">
          Consistency is one of the most important keys to learning a language.
        </p>
      </div>
    );
  }

  if (!started) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <Navbar />

        <div className="max-w-3xl text-center pt-20">
          <h1
            className="text-5xl text-white mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            English Translation Practice
          </h1>

          {hasProgress ? (
            <>
              <p className="text-white/70 text-lg mb-8">
                Welcome back.
                <br />
                You stopped at question {step + 1}.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold"
              >
                Continue Learning
              </button>
              <button
                onClick={restartProgress}
                className="mt-4 ml-4 border border-white/20 text-white px-8 py-3 rounded"
              >
                Start Again From Question 1
              </button>
            </>
          ) : (
            <>
              <p className="text-white/70 text-lg mb-8">
                Translate French sentences into English and improve your writing
                skills.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold"
              >
                Start Practice
              </button>
            </>
          )}
        </div>
      </section>
    );
  }

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
      .replace(/[.,!?;:'"]/g, "") // ignore la ponctuation
      .replace(/\s+/g, " ") // remplace plusieurs espaces par un seul
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

  const progress = ((step + 1) / questions.length) * 100;

  if (!started) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <Navbar />

        <div className="max-w-3xl text-center pt-20">
          <h1
            className="text-5xl text-white mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Test d'Expression Écrite
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Traduisez chaque phrase du français vers l'anglais.
            <br />
            Après avoir confirmé votre réponse, la correction apparaîtra
            immédiatement.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition"
          >
            Commencer le test
          </button>
        </div>
      </section>
    );
  }

  if (step >= questions.length) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <Navbar />

        <div className="max-w-2xl text-center pt-20">
          <h2
            className="text-5xl text-[#c9a84c] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Test terminé
          </h2>

          <p className="text-white/70 text-lg">
            Vous avez terminé toutes les questions.
          </p>
          <div className="my-8">
            <p className="text-white/50 uppercase tracking-widest text-sm mb-2">
              Final Score
            </p>

            <h2
              className="text-[#c9a84c] text-7xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {score}/{questions.length}
            </h2>

            <p className="text-white/60 mt-3">
              {Math.round((score / questions.length) * 100)}% Correct
            </p>
          </div>
          <div className="text-white/70 text-lg">
            Contactez-nous pour recevoir des conseils personnalisés pour ce qui
            semble difficile.
          </div>
          <a
            href="https://wa.me/243981984788?text=Bonjour%20Teacher%2C%20je%20viens%20de%20terminer%20le%20test."
            className="border border-white/25 text-white font-light px-9 py-4 rounded text-base hover:border-[#e8c96a] hover:text-[#e8c96a] transition-all duration-200"
          >
            {t("Ecrire un formateur", "Write to a tutor")}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <Navbar />

      <div className="max-w-3xl w-full pt-20">
        <div className="w-full bg-white/10 h-2 rounded mb-10">
          <div
            className="h-2 bg-[#c9a84c] rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mb-8">
          <p className="text-white/50 uppercase tracking-widest text-sm">
            Current Score
          </p>

          <h2
            className="text-[#c9a84c] text-6xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {score}/{questions.length}
          </h2>
        </div>

        <div className="text-center mb-6 text-white/50">
          Question {step + 1} / {questions.length}
        </div>

        <h2
          className="text-4xl text-white text-center mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Traduisez :
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <p className="text-2xl text-[#e8c96a] text-center">
            "{currentQuestion.french}"
          </p>
        </div>

        <textarea
          value={input}
          disabled={showAnswer}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your translation here..."
          className="w-full min-h-35 bg-white/5 border border-white/20 rounded-lg p-4 text-white outline-none focus:border-[#c9a84c]"
        />

        {!showAnswer && (
          <div className="text-center mt-8">
            <button
              onClick={confirmAnswer}
              disabled={!input.trim()}
              className="bg-[#c9a84c] text-black px-8 py-3 rounded font-semibold hover:bg-[#e8c96a] transition disabled:opacity-40"
            >
              Confirmer ma réponse
            </button>
          </div>
        )}

        {showAnswer && (
          <div className="mt-10">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-3">
                Réponse attendue :
              </h3>

              <p className="text-white text-xl">{currentQuestion.english}</p>
            </div>

            <div className="text-center mt-8 mb-20">
              <button
                onClick={nextQuestion}
                className="bg-[#c9a84c] text-black px-8 py-3 rounded font-semibold hover:bg-[#e8c96a] transition"
              >
                Question suivante
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
