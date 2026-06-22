"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useLang } from "@/context/LangContext";
import { useEffect } from "react";

export default function WritingTest() {
  const { t } = useLang();
  const QUESTIONS = [
    {
      french: "Il y a un homme sur la route.",
      answer: "There is a man on the road.",
    },
    {
      french: "Qu’y a-t-il sur la route ?",
      answer: "What is there on the road?",
    },
    {
      french: "Il y a un bébé dans le berceau.",
      answer: "There is a baby in the crib.",
    },
    {
      french: "Il y a une femme à la porte.",
      answer: "There is a woman at the door.",
    },
    {
      french: "Y a-t-il une dame à la porte ?",
      answer: "Is there a lady at the door?",
    },
    {
      french: "Il y a trois enfants dans le jardin.",
      answer: "There are three children in the garden.",
    },
    {
      french: "Combien d’enfants y a-t-il dans le jardin ?",
      answer: "How many children are there in the garden?",
    },
    {
      french: "Il y a un garçon sur la bicyclette.",
      answer: "There is one boy on the bicycle.",
    },
    {
      french: "Père est derrière la table.",
      answer: "Father is behind the table.",
    },
    {
      french: "Père est un homme grand.",
      answer: "Father is a tall man.",
    },
    {
      french: "Où est Père ?",
      answer: "Where is father?",
    },
    {
      french: "Où est-il ?",
      answer: "Where is he?",
    },
    {
      french: "Mère est devant la maison.",
      answer: "Mother is in front of the house.",
    },
    {
      french: "Mère est petite.",
      answer: "Mother is small.",
    },
    {
      french: "Tante Clara et oncle Joe sont sur le banc.",
      answer: "Aunt Clara and uncle Joe are on the bench.",
    },
    {
      french: "Ils sont jeunes.",
      answer: "They are young.",
    },
    {
      french: "Grand-père est devant grand-mère.",
      answer: "Grandfather is in front of grandmother.",
    },
    {
      french: "Ils sont âgés.",
      answer: "They are old.",
    },
    {
      french: "Êtes-vous la cousine Jeanne ?",
      answer: "Are you cousin Jane?",
    },
    {
      french: "Non, je ne suis pas Jeanne, je suis Marie.",
      answer: "No, I am not Jane, I am Mary.",
    },
    {
      french: "Êtes-vous de gros garçons ?",
      answer: "Are you fat boys?",
    },
    {
      french: "Oui, nous le sommes.",
      answer: "Yes, we are.",
    },
    {
      french: "Nous ne sommes pas minces.",
      answer: "We are not thin.",
    },
    {
      french: "La famille est grande.",
      answer: "The family is large.",
    },
    {
      french: "Père a deux frères et trois sœurs.",
      answer: "Father has two brothers and three sisters.",
    },
    {
      french: "Ils ont chacun plusieurs fils et plusieurs filles.",
      answer: "They each have several sons and daughters.",
    },
    {
      french: "Mes grands-parents ont plusieurs petits-fils et petites-filles.",
      answer: "My grandparents have many grandsons and granddaughters.",
    },
    {
      french: "Nous avons trois neveux et cinq nièces.",
      answer: "We have three nephews and five nieces.",
    },
    {
      french: "Je n’ai pas de femme.",
      answer: "I have no wife.",
    },
    {
      french: "Ma sœur n’a pas de mari.",
      answer: "My sister has no husband.",
    },
    {
      french: "Nous sommes trop jeunes.",
      answer: "We are too young.",
    },
    {
      french: "Tante Clara et oncle Joe ne le sont pas.",
      answer: "Aunt Clara and uncle Joe are not.",
    },
    {
      french: "M. Dixon se lève tôt.",
      answer: "Mr. Dixon is getting up early.",
    },
    {
      french: "Il prend son petit-déjeuner.",
      answer: "He is having his breakfast.",
    },
    {
      french: "Il est assis sur une chaise.",
      answer: "He is sitting on a chair.",
    },
    {
      french: "Il mange des rôties avec du beurre et de la confiture.",
      answer: "He is eating toast with butter and jam.",
    },
    {
      french: "Il boit une tasse de café.",
      answer: "He is drinking a cup of coffee.",
    },
    {
      french: "Il sort de la maison.",
      answer: "He is coming out of the house.",
    },
    {
      french: "Il prend l'autobus.",
      answer: "He is taking the bus.",
    },
    {
      french: "Il entre dans son bureau.",
      answer: "He is stepping into his office.",
    },
    {
      french: "Il rédige un rapport.",
      answer: "He is writing a report.",
    },
    {
      french: "Le téléphone sonne.",
      answer: "The telephone is ringing.",
    },
    {
      french: "Sa secrétaire répond.",
      answer: "His secretary is answering.",
    },
    {
      french: "C'est l'heure du déjeuner.",
      answer: "It is lunchtime.",
    },
    {
      french: "M. Dixon se rend au restaurant avec deux collègues.",
      answer: "Mr. Dixon is going to a restaurant with two colleagues.",
    },
    {
      french: "M. Dixon est assis dans son bureau avec son patron.",
      answer: "Mr. Dixon is sitting in his office with his boss.",
    },
    {
      french: "M. Brown et M. White sont des clients de la société.",
      answer: "Mr. Brown and Mr. White are customers of the house.",
    },
    {
      french: "À la fin de la journée, M. Dixon rentre chez lui.",
      answer: "At the end of the day, Mr. Dixon is going back home.",
    },
    {
      french: "Sa femme met la table.",
      answer: "His wife is setting the table.",
    },
    {
      french: "Sa fille aide sa mère.",
      answer: "His daughter is helping her mother.",
    },
    {
      french: "Ses petits frères jouent avec leurs jouets.",
      answer: "Her small brothers are playing with their toys.",
    },
    {
      french: "Le chat court après sa souris mécanique.",
      answer: "The cat is running after its mechanical mouse.",
    },
    {
      french: "Le chat essaie d'attraper sa queue.",
      answer: "The cat is trying to catch its tail.",
    },
    {
      french: "M. Dixon règle la télévision.",
      answer: "Mr. Dixon is turning on the television.",
    },
    {
      french: "Il regarde les nouvelles locales.",
      answer: "He is watching the local news.",
    },
    {
      french: "Tout le monde s'assemble autour de la table.",
      answer: "Everybody is gathering around the table.",
    },
    {
      french: "Après le dîner, les enfants disent bonsoir à leurs parents.",
      answer:
        "After supper, the children are saying goodnight to their parents.",
    },
    {
      french: "La jeune fille entre dans la maison.",
      answer: "The girl is going into the house.",
    },
    {
      french: "M. Dixon sort du bureau.",
      answer: "Mr. Dixon is coming out of the office.",
    },
    {
      french: "Il vient du bureau.",
      answer: "He is coming from the office.",
    },
    {
      french: "Un nuage est au-dessus de la maison.",
      answer: "A cloud is above the house.",
    },
    {
      french: "Le garçon saute par-dessus la clôture.",
      answer: "The boy jumps over the fence.",
    },
    {
      french: "La femme est dans la voiture.",
      answer: "The woman is inside the car.",
    },
    {
      french: "L'homme est à l'extérieur de la voiture.",
      answer: "The man is outside the car.",
    },
    {
      french: "Le chat monte à l'arbre.",
      answer: "The cat is going up the tree.",
    },
    {
      french: "La pluie tombe des nuages.",
      answer: "The rain is coming down from the clouds.",
    },
    {
      french: "Le jardin est devant la maison.",
      answer: "The garden is in front of the house.",
    },
    {
      french: "Jack est sous l'arbre.",
      answer: "Jack is under the tree.",
    },
    {
      french: "La maison est entre deux vieux arbres.",
      answer: "The house is between two old trees.",
    },
    {
      french: "Le vent souffle dans les arbres.",
      answer: "The wind is blowing in the trees.",
    },
  ];

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

      if (data.step >= QUESTIONS.length) {
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

  const currentQuestion = QUESTIONS[step];

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
    const correctAnswer = normalize(currentQuestion.answer);

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

  const progress = ((step + 1) / QUESTIONS.length) * 100;

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

  if (step >= QUESTIONS.length) {
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
              {score}/{QUESTIONS.length}
            </h2>

            <p className="text-white/60 mt-3">
              {Math.round((score / QUESTIONS.length) * 100)}% Correct
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
            {score}/{QUESTIONS.length}
          </h2>
        </div>

        <div className="text-center mb-6 text-white/50">
          Question {step + 1} / {QUESTIONS.length}
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

              <p className="text-white text-xl">{currentQuestion.answer}</p>
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
