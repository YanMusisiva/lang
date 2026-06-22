"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import Navbar from "@/components/Navbar";

export default function LanguageTest() {
  const { t } = useLang();

  type Question = {
    q: string;
    options: string[];
    points: Record<number, number>;
  };

  type LevelKey = 1 | 2 | 3 | 4;

  const QUESTIONS: Question[] = [
    {
      q: "Excuse me, where is the bank ?",
      options: ["the small one", "it's over there", "You can go"],
      points: {
        1: 5,
        2: 1,
      },
    },

    {
      q: "Can I help you ?",
      options: ["No,don't worry", "It's very good", "Sorry, I can't"],
      points: {
        2: 1,
        0: 5,
      },
    },

    {
      q: "Tom wants to go surfing in Hawaii.",
      options: ["Maybe not", "Be careful", "Really ?"],
      points: {
        2: 5,
        1: 3,
      },
    },

    {
      q: "Let's go watch a movie.",
      options: ["Ok, I'll buy popcorn", "No, we weren't", "Yes, I'm sure"],
      points: {
        0: 5,
        2: 3,
      },
    },

    {
      q: "How many eggs do you need ?",
      options: ["Not enough", "Not much", "Not many"],
      points: {
        2: 5,
        1: 1,
      },
    },

    {
      q: "Not …….. knows the answer to this question",
      options: ["Somebody", "Everybody", "Anybody", "Nobody"],
      points: {
        1: 5,
        2: 3,
        3: 1,
      },
    },

    {
      q: "I started school ….. I was five years old.",
      options: ["About", "Since", "When", "That"],
      points: {
        2: 5,
        1: 1,
      },
    },

    {
      q: "Leo has his driving test tomorrow, so he's feeling ………",
      options: ["disappointed", "confused", "surprised", "stressed"],
      points: {
        3: 5,
        1: 3,
      },
    },

    {
      q: "Please can you …… the dishes",
      options: ["make", "help", "give", "do"],
      points: {
        3: 5,
        0: 1,
      },
    },

    {
      q: "I need to hurry or I'll be late …… work",
      options: ["for", "at", "in", "over"],
      points: {
        0: 5,
        1: 1,
      },
    },

    {
      q: "This city is ………. because of the traffic.",
      options: ["lively", "polluted", "crowded", "unspoiled"],
      points: {
        2: 5,
        1: 3,
      },
    },

    {
      q: "As soon as it ……. dark, she'll light a fire",
      options: ["would be", "will get", "will be", "gets"],
      points: {
        3: 5,
        2: 1,
      },
    },

    {
      q: "Turn the music down ! I won't …….. up with this noise anymore.",
      options: ["keep", "pick", "put", "set"],
      points: {
        2: 5,
        0: 3,
      },
    },

    {
      q: "Sita was ……. to leave the office when her boss called a meeting.",
      options: ["Soon after", "not long", "thinking", "about"],
      points: {
        3: 5,
        2: 3,
      },
    },

    {
      q: "The gallery's owner …… that Martina stole the painting.",
      options: ["claimed", "accused", "doubted", "admitted"],
      points: {
        0: 5,
        1: 3,
        2: 1,
      },
    },

    {
      q: "There is so …… water left and I'm thirsty !",
      options: ["much", "little", "few", "any"],
      points: {
        1: 5,
        0: 1,
      },
    },

    {
      q: "I ….. remember meeting you years ago.",
      options: ["distinctly", "strongly", "closely", "highly"],
      points: {
        0: 5,
        1: 3,
      },
    },

    {
      q: "They'd rather you …….. the concept to David.",
      options: ["would explain", "will explain", "explained", "to explain"],
      points: {
        2: 5,
        3: 1,
      },
    },

    {
      q: "……….. before had a song reached the top of the charts so quickly.",
      options: ["Sometime", "Hardly", "Rarely", "Never"],
      points: {
        3: 5,
        2: 1,
        0: 3,
      },
    },

    {
      q: "Ahmed was so ……. in his book that he didn't hear the doorbell.",
      options: ["engrossed", "enthralled", "captivated", "concentrated"],
      points: {
        0: 5,
        2: 3,
        1: 1,
        3: 1,
      },
    },
  ];

  const LEVELS: Record<
    LevelKey,
    { title: string; image: string; description: string }
  > = {
    1: {
      title: "Foundation English",
      image: "/modules/level1.jpg",
      description:
        "Essential vocabulary and listening practice based on English for everyone method.",
    },

    2: {
      title: "Everyday English",
      image: "/modules/level2.jpg",
      description:
        "Build confidence in daily conversations based on English for everyone method.",
    },

    3: {
      title: "Intermediate English",
      image: "/modules/level3.jpg",
      description:
        "Improve fluency and comprehension based on English for everyone method.",
    },

    4: {
      title: "Advanced English",
      image: "/modules/level4.jpg",
      description:
        "Master natural English communication based on English for everyone method.",
    },
  };

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

  const score = answers.reduce((total, answer, index) => {
    return total + (QUESTIONS[index].points?.[answer] || 0);
  }, 0);
  const maxScore = QUESTIONS.length * 5;

  const percentage = Math.round((score / maxScore) * 100);
  let levelNumber: LevelKey = 1;
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  let level = "";
  let description = "";

  if (score <= 25) {
    levelNumber = 1;
    level = "LEVEL 1 - Beginner";
    description =
      "You are at the beginner level. You need to build basic vocabulary and listening habits.";
  } else if (score <= 50) {
    levelNumber = 2;
    level = "LEVEL 2 - Beginner+";
    description =
      "You know some English but still struggle with common structures and vocabulary.";
  } else if (score <= 75) {
    levelNumber = 3;
    level = "LEVEL 3 - Intermediate";
    description =
      "You can communicate in many situations but still need more fluency and listening practice.";
  } else {
    levelNumber = 4;
    level = "LEVEL 4 - Advanced";
    description =
      "You have a strong command of English and can understand complex structures.";
  }

  const recommendedModule = LEVELS[levelNumber];

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

          {/* <div className="text-left border border-white/10 rounded-lg p-6 bg-white/5 mb-10">
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
          </div> */}

          <div className="max-w-3xl mx-auto text-center mt-10 mb-10">
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Based on your test results, we recommend starting with the program
              below.
            </p>

            <h3
              className="text-[#c9a84c] text-3xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {recommendedModule.title}
            </h3>

            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
              {recommendedModule.description}
            </p>

            <div className="flex justify-center">
              <img
                src={recommendedModule.image}
                alt={recommendedModule.title}
                className="w-full max-w-md rounded-2xl border border-[#c9a84c]/20 shadow-lg"
              />
            </div>
          </div>

          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {t(
              "Si vous souhaitez recevoir les bonnes réponses, les explications détaillées ou des cours de coaching sur le module recommandé , veuillez contacter notre formateur.",
              "To receive the correct answers, detailed explanations or personalized coaching on the recommended module , please contact our teacher.",
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
      <Navbar />

      <div className="max-w-2xl w-full pt-20 pb-12">
        <div className="text-center mb-10">
          <h1>{t("Test de niveau", "Level Test")}</h1>
          <div className="text-center mb-6 text-white/50">
            Question {step + 1} / {QUESTIONS.length}
          </div>
        </div>
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
