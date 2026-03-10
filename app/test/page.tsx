"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import Navbar from "@/components/Navbar";

export default function LanguageTest() {
  const { t } = useLang();

  const QUESTIONS = [
    {
      q: t(
        "Quand vous apprenez une nouvelle langue, vous commencez généralement par :",
        "When you learn a new language, you usually start by:",
      ),
      options: [
        t("Étudier les règles de grammaire", "Studying grammar rules"),
        t(
          "Mémoriser beaucoup de vocabulaire",
          "Memorizing a lot of vocabulary",
        ),
        t(
          "Écouter la langue le plus possible",
          "Listening to the language as much as possible",
        ),
        t("Traduire dans ma langue", "Translating into my language"),
      ],
      correct: 2,
    },
    {
      q: t(
        "Un enfant apprend sa langue maternelle principalement en :",
        "A child learns their native language mainly by:",
      ),
      options: [
        t("Lisant des livres", "Reading books"),
        t("Écoutant les adultes parler", "Listening to adults speaking"),
        t("Étudiant la grammaire", "Studying grammar"),
        t("Mémorisant du vocabulaire", "Memorizing vocabulary"),
      ],
      correct: 1,
    },
    {
      q: t(
        "Si vous ne comprenez pas quand quelqu'un parle anglais, c'est souvent parce que :",
        "If you don't understand when someone speaks English, it is often because:",
      ),
      options: [
        t("Le vocabulaire est difficile", "The vocabulary is difficult"),
        t("Vous n'êtes pas habitué aux sons", "You are not used to the sounds"),
        t("Votre grammaire est faible", "Your grammar is weak"),
        t(
          "Vous ne connaissez pas assez de règles",
          "You don't know enough rules",
        ),
      ],
      correct: 1,
    },
    {
      q: t(
        "Combien d'heures d'écoute réelle avez-vous chaque semaine ?",
        "How many hours of real listening do you have each week?",
      ),
      options: [
        t("0 à 30 minutes", "0 to 30 minutes"),
        t("1 à 2 heures", "1 to 2 hours"),
        t("3 à 5 heures", "3 to 5 hours"),
        t("Plus de 5 heures", "More than 5 hours"),
      ],
    },
    {
      q: t(
        "Quand quelqu'un parle anglais rapidement vous :",
        "When someone speaks English fast you:",
      ),
      options: [
        t("Comprenez presque tout", "Understand almost everything"),
        t("Comprenez quelques mots", "Understand a few words"),
        t("Ne comprenez presque rien", "Understand almost nothing"),
        t("Paniquez", "Panic"),
      ],
    },
    {
      q: t(
        "Quand vous voulez parler anglais :",
        "When you want to speak English:",
      ),
      options: [
        t("Vous traduisez dans votre tête", "You translate in your head"),
        t("Les mots viennent naturellement", "Words come naturally"),
        t("Vous cherchez les règles", "You search for grammar rules"),
        t("Vous bloquez", "You get stuck"),
      ],
    },
    {
      q: t(
        "Quelle méthode avez-vous utilisée le plus souvent ?",
        "Which method have you used the most?",
      ),
      options: [
        t("Livres de grammaire", "Grammar books"),
        t("Applications", "Apps"),
        t("Cours scolaires", "School courses"),
        t("Conversations + écoute", "Conversations + listening"),
      ],
    },
    {
      q: t(
        "Selon vous, la chose la plus importante pour parler une langue est :",
        "According to you, the most important thing to speak a language is:",
      ),
      options: [
        t("La grammaire", "Grammar"),
        t("Le vocabulaire", "Vocabulary"),
        t("L'écoute", "Listening"),
        t("L'écriture", "Writing"),
      ],
      correct: 2,
    },
    {
      q: t(
        "Quand vous écoutez une langue étrangère :",
        "When you listen to a foreign language:",
      ),
      options: [
        t("Les sons sont confus", "The sounds are confusing"),
        t("Vous comprenez les phrases", "You understand sentences"),
        t("Vous comprenez seulement les mots", "You only understand words"),
        t("Vous devez traduire", "You must translate"),
      ],
    },
    {
      q: t(
        "Combien de temps pensez-vous qu'il faut pour commencer à parler une langue ?",
        "How long do you think it takes to start speaking a language?",
      ),
      options: [
        t("Plusieurs années", "Several years"),
        t("1 an", "1 year"),
        t("Quelques mois", "A few months"),
        t("Quelques semaines", "A few weeks"),
      ],
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const select = (i: number) => {
    const copy = [...answers];
    copy[step] = i;
    setAnswers(copy);
  };

  const next = () => {
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setStep(QUESTIONS.length);
  };

  const score = answers.filter(
    (a, i) => QUESTIONS[i].correct !== undefined && a === QUESTIONS[i].correct,
  ).length;

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  if (step >= QUESTIONS.length) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 text-center">
        <Navbar />
        <div className="max-w-2xl">
          <h2
            className="text-4xl text-white mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("Résultat de votre test", "Your test result")}
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-10">
            {score <= 2
              ? t(
                  "Votre principal blocage est le manque d'écoute. Le cerveau humain apprend une langue grâce à l'écoute répétée.",
                  "Your main problem is lack of listening. The human brain learns languages through repeated listening.",
                )
              : score === 3
                ? t(
                    "Vous connaissez des règles mais vous ne comprenez pas les sons. Vous avez besoin d'entraînement intensif à l'écoute.",
                    "You know rules but you don't understand sounds. You need intensive listening training.",
                  )
                : t(
                    "Votre cerveau traduit encore avant de parler. Notre méthode vous aide à penser directement en anglais.",
                    "Your brain still translates before speaking. Our method helps you think directly in English.",
                  )}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/#pricing"
              className="bg-[#c9a84c] text-black font-semibold px-8 py-4 rounded hover:bg-[#e8c96a] transition"
            >
              {t("Commencer un niveau 30 jours", "Start a 30-day level")}
            </a>

            <a
              href="/#leadmagnet"
              className="border border-white/25 text-white px-8 py-4 rounded hover:border-[#e8c96a] hover:text-[#e8c96a]"
            >
              {t(
                "Accéder aux leçons audio gratuites",
                "Access free audio lessons",
              )}
            </a>
          </div>
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
