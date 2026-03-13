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
    price: { fr: "99 $", en: "99 $" },
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
        fr: "20h d'appels avec le formateur",
        en: "20 hours of calls with the trainer",
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
    price: { fr: "237 $ (save 20%)", en: "237 $ (save 20%)" },
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
        fr: "60h d'appels avec le formateur",
        en: "60 hours of calls with the trainer",
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
      fr: "Habituez votre oreille à l’anglais réel",
      en: "Train your ear to real English",
    },
    desc: {
      fr: "Vous écoutez l'anglais sous plusieurs tonalités et accents afin d'habituer votre cerveau aux sons réels de la langue. Grâce à la répétition guidée et à plus de 20 heures d'appels de pratique avec des formateurs, vous développez naturellement compréhension et fluidité. Avec cette combinaison, il devient extrêmement difficile de rester bloqué à l'oral.",
      en: "You listen to English in multiple tones and accents to train your brain to recognize real language sounds. Through guided repetition and more than 20 hours of live practice calls with trainers, you naturally build comprehension and speaking fluency. With this combination, remaining unable to speak becomes extremely unlikely.",
    },
  },
  {
    num: "02",
    title: {
      fr: "Progressez en 5 niveaux en seulement 30 jours chacun",
      en: "Advance through 5 levels in just 30 days each",
    },
    desc: {
      fr: "Notre programme est structuré en 5 niveaux : les 3 premiers niveaux sur 90 jours vous permettent de parler anglais couramment, tandis que les 2 niveaux suivants vous aident à améliorer lecture et écriture et à vous préparer à la grammaire avancée ainsi qu'aux examens comme IELTS ou TOEFL. Chaque niveau est conçu pour progresser rapidement grâce à l'écoute active et aux exercices pratiques.",
      en: "Our program is structured in 5 levels: the first 3 levels over 90 days help you speak English fluently, while the last 2 levels improve your reading and writing and prepare you for advanced grammar and exams like IELTS or TOEFL. Each level is designed for rapid progress through active listening and practical exercises.",
    },
  },
  {
    num: "03",
    title: {
      fr: "Apprenez en privé avec un formateur dédié, en ligne et à votre rythme",
      en: "Learn privately with a dedicated trainer, online and on your schedule",
    },
    desc: {
      fr: "Notre programme se déroule en sessions privées avec un formateur dédié qui se concentre uniquement sur vous. Contrairement aux applications ou à l’intelligence artificielle, votre formateur adapte chaque séance à votre niveau, corrige vos erreurs en temps réel et vous aide à parler naturellement. Comme tout se fait en ligne, vous bénéficiez d’une grande flexibilité : apprenez où que vous soyez et aux moments qui vous conviennent. Cette attention personnalisée garantit des progrès rapides et une vraie aisance à l’oral.",
      en: "Our program takes place in private sessions with a dedicated trainer focused entirely on you. Unlike apps or AI, your trainer adapts each session to your level, corrects mistakes in real time, and helps you speak naturally. Since everything happens online, you gain full flexibility—learn from anywhere and at times that suit your schedule. This personalized attention ensures faster progress and real speaking confidence.",
    },
  },
];
