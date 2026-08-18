"use client";
import { persistProgress } from "@/lib/progress-client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function SpeakingExercise() {
  const PHRASES = [
    { id: 1, sentence: "There is a man on the road." },
    { id: 2, sentence: "What is there on the road?" },
    { id: 3, sentence: "There is a baby in the crib." },
    { id: 4, sentence: "There is a woman at the door." },
    { id: 5, sentence: "Is there a lady at the door?" },
    { id: 6, sentence: "There are three children in the garden." },
    { id: 7, sentence: "How many children are there in the garden?" },
    { id: 8, sentence: "There is one boy on the bicycle." },
    { id: 9, sentence: "Father is behind the table." },
    { id: 10, sentence: "Father is a tall man." },
    { id: 11, sentence: "Where is father?" },
    { id: 12, sentence: "Where is he?" },
    { id: 13, sentence: "Mother is in front of the house." },
    { id: 14, sentence: "Mother is small." },
    { id: 15, sentence: "Aunt Clara and uncle Joe are on the bench." },
    { id: 16, sentence: "They are young." },
    { id: 17, sentence: "Grandfather is in front of grandmother." },
    { id: 18, sentence: "They are old." },
    { id: 19, sentence: "Are you cousin Jane?" },
    { id: 20, sentence: "No, I am not Jane, I am Mary." },
    { id: 21, sentence: "Are you fat boys?" },
    { id: 22, sentence: "Yes, we are." },
    { id: 23, sentence: "We are not thin." },
    { id: 24, sentence: "The family is large." },
    { id: 25, sentence: "Father has two brothers and three sisters." },
    { id: 26, sentence: "They each have several sons and daughters." },
    {
      id: 27,
      sentence: "My grandparents have many grandsons and granddaughters.",
    },
    { id: 28, sentence: "We have three nephews and five nieces." },
    { id: 29, sentence: "I have no wife." },
    { id: 30, sentence: "My sister has no husband." },
    { id: 31, sentence: "We are too young." },
    { id: 32, sentence: "Aunt Clara and uncle Joe are not." },
    { id: 33, sentence: "Mr. Dixon is getting up early." },
    { id: 34, sentence: "He is having breakfast." },
    { id: 35, sentence: "He is sitting on a chair." },
    { id: 36, sentence: "He is eating toast with butter and jam." },
    { id: 37, sentence: "He is drinking a cup of coffee." },
    { id: 38, sentence: "He is coming out of the house." },
    { id: 39, sentence: "He is taking the bus." },
    { id: 40, sentence: "He is stepping into his office." },
    { id: 41, sentence: "He is writing a report." },
    { id: 42, sentence: "The telephone is ringing." },
    { id: 43, sentence: "His secretary is answering." },
    { id: 44, sentence: "It is lunchtime." },
    {
      id: 45,
      sentence: "Mr. Dixon is going to a restaurant with two colleagues.",
    },
    { id: 46, sentence: "Mr. Dixon is sitting in his office with his boss." },
    { id: 47, sentence: "Mr. Brown and Mr. White are customers of the house." },
    {
      id: 48,
      sentence: "At the end of the day, Mr. Dixon is going back home.",
    },
    { id: 49, sentence: "His wife is setting the table." },
    { id: 50, sentence: "His daughter is helping her mother." },
    { id: 51, sentence: "Her small brothers are playing with their toys." },
    { id: 52, sentence: "The cat is running after its mechanical mouse." },
    { id: 53, sentence: "The cat is trying to catch its tail." },
    { id: 54, sentence: "Mr. Dixon is turning on the television." },
    { id: 55, sentence: "He is watching the local news." },
    { id: 56, sentence: "Everybody is gathering around the table." },
    {
      id: 57,
      sentence:
        "After supper, the children are saying goodnight to their parents.",
    },
    { id: 58, sentence: "The girl is going into the house." },
    { id: 59, sentence: "Mr. Dixon is coming out of the office." },
    { id: 60, sentence: "He is coming from the office." },
    { id: 61, sentence: "A cloud is above the house." },
    { id: 62, sentence: "The boy jumps over the fence." },
    { id: 63, sentence: "The woman is inside the car." },
    { id: 64, sentence: "The man is outside the car." },
    { id: 65, sentence: "The cat is going up the tree." },
    { id: 66, sentence: "The rain is coming down from the clouds." },
    { id: 67, sentence: "The garden is in front of the house." },
    { id: 68, sentence: "Jack is under the tree." },
    { id: 69, sentence: "The house is between two old trees." },
    { id: 70, sentence: "The wind is blowing in the trees." },
  ];

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

  useEffect(() => {
    const saved = localStorage.getItem("speaking-progress");

    if (!saved) return;

    const progress = JSON.parse(saved);

    setStep(progress.step || 0);
    setScore(progress.score || 0);
    setValidatedQuestions(progress.validatedQuestions || []);
    setHasProgress(true);
  }, []);

  useEffect(() => {
    persistProgress(
      "speaking-progress",
      JSON.stringify({
        step,
        score,
        validatedQuestions,
        hasProgress: true,
      }),
    );
  }, [step, score, validatedQuestions, hasProgress]);

  const currentPhrase = PHRASES[step]?.sentence ?? "";

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

      const percentage = calculateSimilarity(transcript, currentPhrase);

      setLastPercentage(percentage);

      const alreadyValidated = validatedQuestions.includes(step);

      if (percentage >= 88 && !alreadyValidated) {
        setScore((prev) => prev + 1);

        setValidatedQuestions((prev) => [...prev, step]);
      }

      setShowResult(true);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onerror = () => {
      setIsListening(false);
    };

    setRecognition(rec);
  }, [currentPhrase]);

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[.,!?;:'"]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const calculateSimilarity = (userText: string, targetText: string) => {
    const userWords = normalize(userText).split(" ");
    const targetWords = normalize(targetText).split(" ");

    let correct = 0;

    targetWords.forEach((word) => {
      if (userWords.includes(word)) {
        correct++;
      }
    });

    return Math.round((correct / targetWords.length) * 100);
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
    if (!currentPhrase) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentPhrase);

    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = 1;

    utterance.onstart = () => setEstEnTrainDeLire(true);
    utterance.onend = () => setEstEnTrainDeLire(false);
    utterance.onerror = () => setEstEnTrainDeLire(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (step >= PHRASES.length) return;
    if (!started) return;

    const timer = setTimeout(() => {
      lireLaPhrase();
    }, 300);

    return () => clearTimeout(timer);
  }, [step, started]);

  const restartExercise = () => {
    localStorage.removeItem("speaking-progress");

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

    if (step < PHRASES.length) {
      setStep(step + 1);
    }
  };

  const isFinished = step >= PHRASES.length;

  if (!started) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <Navbar />

        <div className="max-w-3xl text-center pt-20">
          <h1
            className="text-5xl text-white mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            English Speaking Practice
          </h1>

          {hasProgress ? (
            <>
              <div className="bg-white/5 border border-[#c9a84c]/20 rounded-xl p-8 mb-8">
                <h2 className="text-[#c9a84c] text-2xl mb-4">Welcome Back</h2>

                <p className="text-white/70 text-lg leading-relaxed">
                  You already started this speaking exercise.
                </p>

                <p className="text-white/60 mt-3">Last completed question:</p>

                <p className="text-[#c9a84c] text-4xl mt-2 font-semibold">
                  {step + 1}
                </p>

                <p className="text-white/50 mt-4">
                  Your progress has been automatically saved.
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
                <h2 className="text-[#c9a84c] text-2xl mb-6">How It Works</h2>

                <div className="space-y-4 text-white/70">
                  <p>1. Listen carefully to the model sentence.</p>

                  <p>2. Repeat the sentence aloud using the microphone.</p>

                  <p>3. The system will transcribe what you said.</p>

                  <p>
                    4. Your pronunciation will be compared to the target
                    sentence.
                  </p>

                  <p>
                    5. A sentence is validated when your score reaches at least
                    80%.
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

  if (isFinished) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        {" "}
        <Navbar />
        <div className="max-w-2xl w-full pt-20 pb-24">
          <h1
            className="text-center text-[#c9a84c] text-6xl mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Exercise Completed
          </h1>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-6 text-center">
            <p className="text-white/50 uppercase">Final Score</p>

            <h2 className="text-[#c9a84c] text-7xl mt-3">
              {score}/{PHRASES.length}
            </h2>

            <p className="text-white/60 mt-3">Sentences Mastered</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-6">
            <h3 className="text-white text-xl mb-4">Statistics</h3>

            <p className="text-white/70">Total Sentences: {PHRASES.length}</p>

            <p className="text-white/70">
              Mastered: {validatedQuestions.length}
            </p>

            <p className="text-white/70">
              Remaining: {PHRASES.length - validatedQuestions.length}
            </p>

            <p className="text-white/70">
              Accuracy:{" "}
              {Math.round((validatedQuestions.length / PHRASES.length) * 100)}%
            </p>
          </div>

          <button
            onClick={restartExercise}
            className="w-full bg-[#c9a84c] text-black py-4 rounded-lg font-semibold"
          >
            Restart From Beginning
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] px-6 py-20">
      {" "}
      <Navbar />
      <div className="max-w-3xl mx-auto pt-10">
        <div className="text-center mb-12">
          <p className="text-white/50 uppercase tracking-widest text-sm">
            Speaking Practice Score
          </p>

          <h1
            className="text-6xl text-[#c9a84c]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {validatedQuestions.length}/{PHRASES.length}
          </h1>

          <div className="text-center pt-4">
            <p className="text-white/50">Current Position</p>

            <h3 className="text-white text-3xl">
              {Math.min(step + 1, PHRASES.length)}/{PHRASES.length}
            </h3>
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => lireLaPhrase()}
              disabled={estEnTrainDeLire}
              className="bg-white/5 border border-white/20 px-5 py-3 rounded-lg text-white hover:border-[#c9a84c] transition"
            >
              {estEnTrainDeLire ? "🔊 Playing..." : "🔈 Listen Again"}
            </button>
            <button
              className="bg-white/5 border border-white/20 px-5 py-3 rounded-lg text-white hover:border-[#c9a84c] transition"
              onClick={() => lireLaPhrase(0.7)}
            >
              🐢 Slow
            </button>
            <button
              className="bg-white/5 border border-white/20 px-5 py-3 rounded-lg text-white hover:border-[#c9a84c] transition"
              onClick={() => lireLaPhrase(1)}
            >
              🚀 Normal
            </button>{" "}
          </div>
        </div>

        <div className="w-full bg-white/10 h-2 rounded mb-10">
          <div
            className="h-2 bg-[#c9a84c] rounded"
            style={{
              width: `${((step + 1) / PHRASES.length) * 100}%`,
            }}
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10 text-center">
          <p className="text-white/50 text-sm uppercase mb-3">
            Read this sentence
          </p>

          <p className="text-[#e8c96a] text-3xl">"{currentPhrase}"</p>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={startListening}
            disabled={isListening || estEnTrainDeLire}
            className={`w-32 h-32 rounded-full text-5xl transition-all ${
              isListening ? "bg-red-500 animate-pulse" : "bg-[#c9a84c]"
            }  ${estEnTrainDeLire ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isListening ? "🛑" : "🎙️"}
          </button>
        </div>

        <p className="text-center text-white/60 mb-10">
          {isListening ? "Listening..." : "Tap the microphone"}
        </p>

        {showResult && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-green-400 mb-2">What I heard</p>

              <p className="text-white text-xl">{spokenText}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-[#c9a84c] mb-2">Accuracy</p>

              <p className="text-5xl text-[#c9a84c]">{lastPercentage}%</p>
            </div>

            <div className="text-center">
              <button
                onClick={nextQuestion}
                className="bg-[#c9a84c] text-black px-8 py-3 rounded font-semibold"
              >
                Next Sentence
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
