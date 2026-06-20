"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import Navbar from "@/components/Navbar";

export default function LanguageTest() {
  const { t } = useLang();

  const QUESTIONS = [
    {
      q: t(
        "Complétez : Excuse me, where is the bank?",
        "Complete: Excuse me, where is the bank?",
      ),
      options: ["The small one", "It's over there", "You can go"],
      correct: 1,
    },
    {
      q: t("Complétez : Can I help you?", "Complete: Can I help you?"),
      options: ["No, I don't worry", "It's very good", "Sorry, I can't"],
      correct: 2,
    },
    {
      q: t(
        "Complétez : Tom wants to go surfing in Hawaii.",
        "Complete: Tom wants to go surfing in Hawaii.",
      ),
      options: ["Maybe not", "Be careful", "Really?"],
      correct: 2,
    },
    {
      q: t(
        "Complétez : Let's go watch a movie.",
        "Complete: Let's go watch a movie.",
      ),
      options: ["Ok, I'll buy popcorn", "No, we weren't", "Yes, I'm sure"],
      correct: 0,
    },
    {
      q: t("How many eggs do you need?", "How many eggs do you need?"),
      options: ["Not enough", "Not much", "Not many"],
      correct: 2,
    },
    {
      q: t(
        "Not ..... knows the answer to this question.",
        "Not ..... knows the answer to this question.",
      ),
      options: ["Somebody", "Everybody", "Anybody", "Nobody"],
      correct: 3,
    },
    {
      q: t(
        "I started school ..... I was five years old.",
        "I started school ..... I was five years old.",
      ),
      options: ["About", "Since", "When", "That"],
      correct: 2,
    },
    {
      q: t(
        "Leo has his driving test tomorrow, so he's feeling ....",
        "Leo has his driving test tomorrow, so he's feeling ....",
      ),
      options: ["Disappointed", "Confused", "Surprised", "Stressed"],
      correct: 3,
    },
    {
      q: t(
        "Please can you ..... the dishes?",
        "Please can you ..... the dishes?",
      ),
      options: ["Make", "Help", "Give", "Do"],
      correct: 3,
    },
    {
      q: t(
        "I need to hurry or I'll be late ..... work.",
        "I need to hurry or I'll be late ..... work.",
      ),
      options: ["For", "At", "In", "Over"],
      correct: 0,
    },
    {
      q: t(
        "This city is ..... because of the traffic.",
        "This city is ..... because of the traffic.",
      ),
      options: ["Lively", "Polluted", "Crowded", "Unspoiled"],
      correct: 2,
    },
    {
      q: t(
        "As soon as it ..... dark, she'll light a fire.",
        "As soon as it ..... dark, she'll light a fire.",
      ),
      options: ["Would be", "Will get", "Will be", "Gets"],
      correct: 3,
    },
    {
      q: t(
        "Turn the music down! I won't ..... up with this noise anymore.",
        "Turn the music down! I won't ..... up with this noise anymore.",
      ),
      options: ["Keep", "Pick", "Put", "Set"],
      correct: 2,
    },
    {
      q: t(
        "Sita was ..... to leave the office when her boss called a meeting.",
        "Sita was ..... to leave the office when her boss called a meeting.",
      ),
      options: ["Soon after", "Not long", "Thinking", "About"],
      correct: 3,
    },
    {
      q: t(
        "The gallery owner ..... that Martina stole the painting.",
        "The gallery owner ..... that Martina stole the painting.",
      ),
      options: ["Claimed", "Accused", "Doubted", "Admitted"],
      correct: 0,
    },
    {
      q: t(
        "There is so ..... water left and I'm thirsty!",
        "There is so ..... water left and I'm thirsty!",
      ),
      options: ["Much", "Little", "Few", "Any"],
      correct: 1,
    },
    {
      q: t(
        "I ..... remember meeting you years ago.",
        "I ..... remember meeting you years ago.",
      ),
      options: ["Distinctly", "Strongly", "Closely", "Highly"],
      correct: 0,
    },
    {
      q: t(
        "They'd rather you ..... the concept to David.",
        "They'd rather you ..... the concept to David.",
      ),
      options: ["Would explain", "Will explain", "Explained", "To explain"],
      correct: 2,
    },
    {
      q: t(
        "..... before had a song reached the top of the charts so quickly.",
        "..... before had a song reached the top of the charts so quickly.",
      ),
      options: ["Sometime", "Hardly", "Rarely", "Never"],
      correct: 3,
    },
    {
      q: t(
        "Ahmed was so ..... in his book that he didn't hear the doorbell.",
        "Ahmed was so ..... in his book that he didn't hear the doorbell.",
      ),
      options: ["Engrossed", "Enthralled", "Captivated"],
      correct: 0,
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const [started, setStarted] = useState(false);

  const select = (i: number) => {
    const copy = [...answers];
    copy[step] = i;
    setAnswers(copy);
  };

  const next = () => {
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setStep(QUESTIONS.length);
  };

  const score =
    (answers.filter((a, i) => a === QUESTIONS[i].correct).length /
      QUESTIONS.length) *
    100;

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  let level = "";
  let description = "";

  if (score <= 25) {
    level = "LEVEL 1 - Beginner";
    description =
      "You are at the beginner level. You need to build basic vocabulary and listening habits.";
  } else if (score <= 50) {
    level = "LEVEL 2 - Beginner+";
    description =
      "You know some English but still struggle with common structures and vocabulary.";
  } else if (score <= 75) {
    level = "LEVEL 3 - Intermediate";
    description =
      "You can communicate in many situations but still need more fluency and listening practice.";
  } else {
    level = "LEVEL 4 - Advanced";
    description =
      "You have a strong command of English and can understand complex structures.";
  }

  if (!started) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] px-6 py-24">
        <Navbar />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-5xl md:text-6xl text-white mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("Test d'anglais", "English Assessment Test")}
            </h1>

            <p className="text-white/60 max-w-2xl mx-auto">
              {t(
                "Découvrez votre niveau actuel d'anglais en répondant à 20 questions.",
                "Discover your current English level by answering 20 questions.",
              )}
            </p>
          </div>

          <div className="bg-white/5 border border-[#c9a84c]/20 rounded-2xl p-8 md:p-10">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-4 py-2 mb-8">
              <span className="text-[#c9a84c] text-sm font-medium">
                {t(
                  "20 Questions • Gratuit • 5 Minutes",
                  "20 Questions • Free • 5 Minutes",
                )}
              </span>
            </div>

            <p className="text-white/80 leading-relaxed mb-8">
              {t(
                "Ce test contient 20 questions conçues pour évaluer votre niveau actuel d'anglais.",
                "This assessment contains 20 questions designed to evaluate your current level of English.",
              )}
            </p>

            <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl p-6 mb-8">
              <h3 className="text-[#c9a84c] text-lg font-semibold mb-4">
                {t("Système de notation", "Scoring System")}
              </h3>

              <p className="text-white/80">
                {t(
                  "Chaque bonne réponse vaut 5%.",
                  "Each correct answer is worth 5%.",
                )}
              </p>

              <p className="text-white/60 mt-2">
                {t(
                  "Votre score final sera calculé sur 100%.",
                  "Your final score will be calculated out of 100%.",
                )}
              </p>
            </div>

            <h3 className="text-white text-xl font-semibold mb-5">
              {t("Niveaux d'anglais", "English Levels")}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4">
                <div className="text-red-400 font-semibold">
                  {t("Niveau 1 • Débutant", "Level 1 • Beginner")}
                </div>
                <div className="text-white/60 text-sm mt-1">0% - 25%</div>
              </div>

              <div className="border border-orange-500/20 bg-orange-500/5 rounded-xl p-4">
                <div className="text-orange-400 font-semibold">
                  {t("Niveau 2 • Débutant +", "Level 2 • Beginner+")}
                </div>
                <div className="text-white/60 text-sm mt-1">26% - 50%</div>
              </div>

              <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-4">
                <div className="text-yellow-400 font-semibold">
                  {t("Niveau 3 • Intermédiaire", "Level 3 • Intermediate")}
                </div>
                <div className="text-white/60 text-sm mt-1">51% - 75%</div>
              </div>

              <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-4">
                <div className="text-green-400 font-semibold">
                  {t("Niveau 4 • Avancé", "Level 4 • Advanced")}
                </div>
                <div className="text-white/60 text-sm mt-1">76% - 100%</div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-8">
              <p className="text-white/60 leading-relaxed">
                {t(
                  "À la fin du test, vous recevrez votre score, votre niveau estimé et un récapitulatif de vos réponses. Pour obtenir les bonnes réponses et les explications détaillées, vous pourrez contacter notre formateur.",
                  "At the end of the assessment, you will receive your score, your estimated level and a summary of your answers. To receive the correct answers and detailed explanations, you will be invited to contact our teacher.",
                )}
              </p>
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => setStarted(true)}
                className="bg-[#c9a84c] text-black px-10 py-4 rounded-lg font-semibold hover:bg-[#e8c96a] transition mx-auto"
              >
                {t("Commencer le test", "Start Test")}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (step >= QUESTIONS.length) {
    const whatsappMessage = encodeURIComponent(`
Bonjour Teacher,

Je viens de terminer le test d'anglais.

Mon score : ${Math.round(score)}%
Mon niveau : ${level}

Mes réponses :

${QUESTIONS.map(
  (q, i) =>
    `Question ${i + 1}
${q.q}
My answer: ${q.options[answers[i]]}
`,
).join("\n")}

Je souhaiterais recevoir les bonnes réponses et la correction.
`);

    const whatsappLink = `https://wa.me/243981984788?text=${whatsappMessage}`;

    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <Navbar />

        <div className="max-w-4xl w-full text-center pt-20">
          <h2
            className="text-4xl text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Test Completed
          </h2>

          <h3 className="text-6xl text-[#c9a84c] mb-4 font-bold">
            {Math.round(score)}%
          </h3>

          <p className="text-2xl text-white mb-3">{level}</p>

          <p className="text-white/70 mb-10">{description}</p>

          <div className="text-left border border-white/10 rounded-lg p-6 bg-white/5 mb-10">
            <h4 className="text-white text-2xl mb-6">Your Answers</h4>

            <div className="space-y-6">
              {QUESTIONS.map((q, i) => (
                <div key={i} className="border-b border-white/10 pb-4">
                  <p className="text-white font-medium mb-2">
                    Question {i + 1}
                  </p>

                  <p className="text-white/70 mb-2">{q.q}</p>

                  <p className="text-[#c9a84c]">
                    Your answer: {q.options[answers[i]]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {t(
              "Si vous souhaitez recevoir les bonnes réponses, les explications détaillées et des conseils personnalisés, veuillez contacter notre formateur.",
              "To receive the correct answers, detailed explanations and personalized advice, please contact our teacher.",
            )}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            className="inline-block bg-[#c9a84c] text-black px-10 py-4 rounded font-semibold hover:bg-[#e8c96a] transition mb-10"
          >
            Contact Teacher
          </a>
        </div>
      </section>
    );
  }

  const question = QUESTIONS[step];

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="w-full bg-white/10 h-2 rounded mb-10">
          <div
            className="h-2 bg-[#c9a84c] rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2
          className="text-3xl text-white mb-10 text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {question.q}
        </h2>

        <div className="space-y-4">
          {question.options.map((opt, i) => (
            <label
              key={i}
              className={`block border p-4 rounded cursor-pointer transition
              ${
                answers[step] === i
                  ? "border-[#e8c96a] text-[#e8c96a]"
                  : "border-white/20 text-white hover:border-[#e8c96a]"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={answers[step] === i}
                onChange={() => select(i)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={next}
            disabled={answers[step] === undefined}
            className="bg-[#c9a84c] text-black px-8 py-3 rounded font-semibold hover:bg-[#e8c96a] transition disabled:opacity-40"
          >
            {t("Question suivante", "Next question")}
          </button>
        </div>
      </div>
    </section>
  );
}
