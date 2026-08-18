export type PremiumExercise = {
  id: string;
  type: "written_answer" | "spoken_answer" | "shadowing";
  prompt: { fr: string; en: string };
  referenceAnswer?: string;
  acceptedAnswers?: string[];
  audioUrl?: string;
  transcript?: string;
};

export type PremiumLesson = {
  id: string;
  title: { fr: string; en: string };
  summary: { fr: string; en: string };
  content: { fr: string; en: string };
  videoUrl?: string;
  audience: "developer" | "business" | "professional";
  exercises: PremiumExercise[];
};

export const PREMIUM_LESSONS: PremiumLesson[] = [
  {
    id: "developer-standup",
    title: { fr: "Présenter son travail en daily stand-up", en: "Presenting your work in a daily stand-up" },
    summary: { fr: "Expliquez ce que vous avez fait, ce que vous allez faire et vos blocages.", en: "Explain what you did, what you will do, and what is blocking you." },
    content: {
      fr: "Un daily stand-up efficace repose sur trois idées : Yesterday, Today et Blockers. Utilisez des phrases courtes et précises. Exemple : Yesterday, I fixed the authentication bug. Today, I am working on the payment flow. I am blocked by missing API credentials.",
      en: "An effective daily stand-up uses three ideas: Yesterday, Today, and Blockers. Keep your sentences short and precise. Example: Yesterday, I fixed the authentication bug. Today, I am working on the payment flow. I am blocked by missing API credentials.",
    },
    videoUrl: "https://www.youtube.com/embed/k827TUGQcs8",
    audience: "developer",
    exercises: [
      {
        id: "dev-written-1",
        type: "written_answer",
        prompt: { fr: "Présentez en anglais ce que vous avez accompli hier et ce que vous ferez aujourd'hui.", en: "Explain what you completed yesterday and what you will do today." },
        referenceAnswer: "Yesterday, I completed the login page. Today, I am working on the dashboard.",
      },
      {
        id: "dev-spoken-1",
        type: "spoken_answer",
        prompt: { fr: "Répondez oralement : What are you working on today?", en: "Answer aloud: What are you working on today?" },
        referenceAnswer: "Today, I am working on a new feature for the dashboard.",
      },
      {
        id: "dev-shadow-1",
        type: "shadowing",
        prompt: { fr: "Écoutez puis répétez en suivant le même rythme.", en: "Listen, then repeat with the same rhythm." },
        transcript: "Today, I am working on the authentication flow for our mobile application.",
      },
    ],
  },
  {
    id: "business-pitch",
    title: { fr: "Présenter une entreprise clairement", en: "Presenting a company clearly" },
    summary: { fr: "Construisez une présentation courte orientée client et valeur.", en: "Build a short company introduction focused on clients and value." },
    content: {
      fr: "Commencez par le problème que vous résolvez, présentez votre solution puis le résultat obtenu par le client. Structure utile : We help [client] to [result] by [solution].",
      en: "Start with the problem you solve, introduce your solution, then explain the client outcome. Useful structure: We help [client] to [result] by [solution].",
    },
    audience: "business",
    exercises: [
      {
        id: "business-written-1",
        type: "written_answer",
        prompt: { fr: "Présentez votre entreprise en trois phrases en anglais.", en: "Introduce your company in three English sentences." },
        referenceAnswer: "We help small businesses manage their online sales. Our platform brings orders and payments into one place. This saves our clients time and reduces errors.",
      },
      {
        id: "business-spoken-1",
        type: "spoken_answer",
        prompt: { fr: "Répondez oralement : What problem does your company solve?", en: "Answer aloud: What problem does your company solve?" },
        referenceAnswer: "Our company helps small businesses manage their customers more efficiently.",
      },
    ],
  },
];
