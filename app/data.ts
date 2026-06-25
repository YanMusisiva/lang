import type { Testimonial, Plan, BulletCard } from "@/types/";

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "M",
    quote: {
      fr: "Les audios que vous envoyez sont essentiels pour nous, ils font toute la différence dans notre apprentissage.",
      en: "The audios you send are crucial for us, they make all the difference in our learning.",
    },
    name: "Milka",
    role: { fr: "Étudiante", en: "Student" },
  },
  {
    initials: "F",
    quote: {
      fr: "J’adore votre méthode d’apprentissage ! Elle m’aide vraiment à parler anglais avec confiance.",
      en: "I love your learning method! It truly helps me speak English with confidence.",
    },
    name: "Francis",
    role: { fr: "Voyageur", en: "Traveler" },
  },
  {
    initials: "A",
    quote: {
      fr: "Les audios sont vraiment cools et rendent l’apprentissage super agréable !",
      en: "The audios are really cool and make learning super fun!",
    },
    name: "Ali",
    role: { fr: "Enseignant", en: "Teacher" },
  },
];

export const PLANS: Plan[] = [
  {
    name: { fr: "1 mois", en: "1 month" },
    price: { fr: "49 $", en: "49 $" },
    featured: true,
    tag: { fr: "Populaire", en: "Popular" },
    desc: {
      fr: "Notre programme premium pour un progrès rapide et un accompagnement personnalisé",
      en: "Our premium program for fast progress and personalized support",
    },
    features: [
      {
        fr: "30 jours d'apprentissage naturel",
        en: "30 days of natural learning",
      },
      {
        fr: "10h d'appels avec le formateur",
        en: "10 hours of calls with the trainer",
      },
      {
        fr: "Premier niveau",
        en: "First level",
      },
      {
        fr: "Votre disponibilite est prise en compte",
        en: "Your availability is taken into account",
      },

      {
        fr: "Jour valide selon la performance de l'apprenant",
        en: "Valid day based on the learner's performance",
      },
    ],
  },
  {
    name: { fr: "3 mois", en: "3 months" },
    price: { fr: "147 $ ", en: "147 $" },
    desc: {
      fr: "Pour ceux qui veulent atteindre l'objectif des 90 jours",
      en: "For those who want to reach the 90 days goal",
    },
    features: [
      {
        fr: "90 jours d'apprentissage naturel",
        en: "90 days of natural learning",
      },
      {
        fr: "30h d'appels avec le formateur",
        en: "30 hours of calls with the trainer",
      },
      {
        fr: "3 niveaux",
        en: "3 levels",
      },
      {
        fr: "Votre disponibilite est prise en compte",
        en: "Your availability is taken into account",
      },

      {
        fr: "Jour valide selon la performance de l'apprenant",
        en: "Valid day based on the learner's performance",
      },
    ],
  },
];

export const BULLETS: BulletCard[] = [
  {
    num: "01",
    title: {
      fr: "Habituez votre cerveau aux réalités du terrain",
      en: "Train your brain for real-world scenarios",
    },
    desc: {
      fr: "Vous entraînez votre oreille à l'anglais des affaires sous plusieurs tonalités et accents pour habituer votre cerveau aux sons réels du monde professionnel. Grâce à notre méthode d'écoute active et à la répétition guidée, vous assimilez le vocabulaire corporate de manière instinctive, rendant le blocage à l'oral techniquement impossible lors de vos réunions.",
      en: "You train your ear to business English across multiple tones and accents to condition your brain to the real sounds of the corporate world. Through our active listening method and guided repetition, you absorb corporate vocabulary instinctively, making freezing during meetings technically impossible.",
    },
  },
  {
    num: "02",
    title: {
      fr: "Un plan d'action précis pour un impact sous 90 jours",
      en: "A precise action plan for impact in 90 days",
    },
    desc: {
      fr: "Oubliez la théorie scolaire inutile. Notre parcours est structuré pour transformer votre carrière et votre business en seulement 3 mois. Les premiers paliers débloquent votre fluidité immédiate et votre confiance à l'oral, tandis que les modules avancés vous arment pour négocier, manager et présenter des projets complexes en anglais sans aucune hésitation.",
      en: "Forget useless academic theory. Our curriculum is structured to transform your career and business in just 3 months. The first stages unlock your immediate fluency and speaking confidence, while advanced modules equip you to negotiate, manage, and pitch complex projects in English without hesitation.",
    },
  },
  {
    num: "03",
    title: {
      fr: "Pratique interactive en solo et immersion dans une immense communauté",
      en: "Interactive solo practice and immersion in a massive community",
    },
    desc: {
      fr: "Bénéficiez d'un double écosystème puissant et flexible. Au quotidien, pratiquez gratuitement à votre rythme sur notre plateforme interactive via des exercices oraux et écrits stimulants. Ensuite, passez à l'action en rejoignant notre immense communauté internationale sur WhatsApp pour débattre en temps réel sur des sujets concrets et des situations business réelles.",
      en: "Benefit from a powerful, flexible dual ecosystem. On a daily basis, practice for free at your own pace on our interactive platform with stimulating speaking and writing exercises. Then, take action by joining our massive international community on WhatsApp to debate in real-time on concrete topics and real business scenarios.",
    },
  },
];
