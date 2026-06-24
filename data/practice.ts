export const DATASETS = {
  greetings: [
    {
      french: "Bonjour",
      english: "Hello",
    },
    {
      french: "Comment allez-vous ?",
      english: "How are you?",
    },
    {
      french: "Je vais bien",
      english: "I am fine",
    },
    {
      french: "Merci beaucoup",
      english: "Thank you very much",
    },
    {
      french: "À bientôt",
      english: "See you soon",
    },
  ],

  introductions: [
    {
      french: "Je m'appelle John",
      english: "My name is John",
    },
    {
      french: "Je suis développeur",
      english: "I am a developer",
    },
    {
      french: "J'habite à Goma",
      english: "I live in Goma",
    },
    {
      french: "J'ai vingt ans",
      english: "I am twenty years old",
    },
    {
      french: "Ravi de vous rencontrer",
      english: "Nice to meet you",
    },
  ],

  businessBasics: [
    {
      french: "Bonjour, comment puis-je vous aider ?",
      english: "Hello, how can I help you?",
    },
    {
      french: "Je souhaiterais prendre rendez-vous.",
      english: "I would like to schedule an appointment.",
    },
    {
      french: "Pouvez-vous m'envoyer un devis ?",
      english: "Can you send me a quote?",
    },
    {
      french: "Merci pour votre temps.",
      english: "Thank you for your time.",
    },
    {
      french: "Je vous recontacterai bientôt.",
      english: "I will contact you again soon.",
    },
  ],

  meetings: [
    {
      french: "La réunion commence à neuf heures.",
      english: "The meeting starts at nine o'clock.",
    },
    {
      french: "Pouvez-vous partager votre écran ?",
      english: "Can you share your screen?",
    },
    {
      french: "Je suis d'accord avec cette proposition.",
      english: "I agree with this proposal.",
    },
    {
      french: "Nous devons revoir le budget.",
      english: "We need to review the budget.",
    },
    {
      french: "Merci à tous pour votre participation.",
      english: "Thank you all for your participation.",
    },
  ],
};

export const PRACTICE = {
  "level-1": {
    title: "Foundation",

    modules: {
      "module-1": {
        title: "Greetings Speaking",
        type: "speaking",
        dataset: "greetings",
        estimatedMinutes: 8,
      },

      "module-2": {
        title: "Greetings Writing",
        type: "writing",
        dataset: "greetings",
        estimatedMinutes: 6,
      },

      "module-3": {
        title: "Introductions Speaking",
        type: "speaking",
        dataset: "introductions",
        estimatedMinutes: 8,
      },

      "module-4": {
        title: "Introductions Writing",
        type: "writing",
        dataset: "introductions",
        estimatedMinutes: 6,
      },
    },
  },

  "level-2": {
    title: "Beginner",

    modules: {
      "module-1": {
        title: "Beginner Speaking",
        type: "speaking",
        dataset: "greetings",
        estimatedMinutes: 8,
      },
    },
  },

  "level-3": {
    title: "Intermediate",

    modules: {
      "module-1": {
        title: "Intermediate Speaking",
        type: "speaking",
        dataset: "greetings",
        estimatedMinutes: 8,
      },
    },
  },

  "level-4": {
    title: "Advanced",

    modules: {
      "module-1": {
        title: "Advanced Speaking",
        type: "speaking",
        dataset: "greetings",
        estimatedMinutes: 8,
      },
    },
  },

  "level-5": {
    title: "Fluent",

    modules: {
      "module-1": {
        title: "Fluent Speaking",
        type: "speaking",
        dataset: "greetings",
        estimatedMinutes: 8,
      },
    },
  },

  "business-1": {
    title: "Business English 1",

    modules: {
      "module-1": {
        title: "Business Basics Speaking",
        type: "speaking",
        dataset: "businessBasics",
        estimatedMinutes: 10,
      },

      "module-2": {
        title: "Business Basics Writing",
        type: "writing",
        dataset: "businessBasics",
        estimatedMinutes: 8,
      },
    },
  },

  "business-2": {
    title: "Business English 2",

    modules: {
      "module-1": {
        title: "Meetings Speaking",
        type: "speaking",
        dataset: "meetings",
        estimatedMinutes: 10,
      },

      "module-2": {
        title: "Meetings Writing",
        type: "writing",
        dataset: "meetings",
        estimatedMinutes: 8,
      },
    },
  },
} as const;
