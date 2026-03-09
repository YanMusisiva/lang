import type { Testimonial, Plan, BulletCard } from "@/types/";

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "KM",
    quote: {
      fr: "En 3 mois, je suis passé de A2 à B2. J'avais essayé Duolingo, des cours en ligne, rien ne fonctionnait vraiment. Ici, j'ai parlé dès la première semaine et ça a tout changé.",
      en: "In 3 months, I went from A2 to B2. I had tried Duolingo, online courses, nothing really worked. Here, I spoke from the first week and it changed everything.",
    },
    name: "Karim M.",
    role: { fr: "Ingénieur, Casablanca", en: "Engineer, Casablanca" },
  },
  {
    initials: "SA",
    quote: {
      fr: "J'avais honte de parler anglais en réunion. Après 7 semaines avec ListenMethod, j'ai animé ma première présentation en anglais devant 50 personnes. Incroyable.",
      en: "I was ashamed to speak English in meetings. After 7 weeks with ListenMethod, I ran my first English presentation in front of 50 people. Incredible.",
    },
    name: "Sophie A.",
    role: { fr: "Manager, Paris", en: "Manager, Paris" },
  },
  {
    initials: "DF",
    quote: {
      fr: "Les formateurs sont extraordinairement patients et engagés. La méthode d'écoute m'a permis de comprendre Netflix en anglais sans sous-titres en 60 jours.",
      en: "The trainers are extraordinarily patient and engaged. The listening method allowed me to understand Netflix in English without subtitles in 60 days.",
    },
    name: "David F.",
    role: { fr: "Étudiant, Montréal", en: "Student, Montreal" },
  },
];

export const PLANS: Plan[] = [
  {
    name: { fr: "1 month", en: "1 month" },
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
    name: { fr: "3 months", en: "3 months" },
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
        fr: "20h d'appels avec le formateur",
        en: "20 hours of calls with the trainer",
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
      fr: "Mémorisez 200 mots en 7 jours",
      en: "Memorize 200 words in 7 days",
    },
    desc: {
      fr: "Grâce à des phrases contextuelles répétées chaque jour, votre cerveau mémorise naturellement sans effort de mémorisation forcée.",
      en: "Through contextual phrases repeated daily, your brain memorizes naturally without forced memorization effort.",
    },
  },
  {
    num: "02",
    title: {
      fr: "Comprenez les films sans sous-titres",
      en: "Understand films without subtitles",
    },
    desc: {
      fr: "30 minutes d'écoute active par jour entraîne votre oreille à capter la vitesse, l'accent et les expressions idiomatiques réelles.",
      en: "30 minutes of active listening per day trains your ear to catch real speed, accents and idiomatic expressions.",
    },
  },
  {
    num: "03",
    title: {
      fr: "Évitez les 5 erreurs de grammaire",
      en: "Avoid the 5 grammar mistakes",
    },
    desc: {
      fr: "90% des étudiants font les mêmes erreurs. Nos formateurs les corrigent naturellement en conversation, sans cours théoriques ennuyeux.",
      en: "90% of students make the same mistakes. Our trainers correct them naturally in conversation, without boring theoretical lessons.",
    },
  },
  {
    num: "04",
    title: {
      fr: "Parlez sans bloquer ni chercher vos mots",
      en: "Speak without blocking or searching for words",
    },
    desc: {
      fr: "Les 280 phrases anticipées vous donnent les outils pour répondre à presque toutes les situations du quotidien avec aisance.",
      en: "The 280 anticipated phrases give you tools to handle almost any daily situation with ease.",
    },
  },
  {
    num: "05",
    title: {
      fr: "Progressez dès la première semaine",
      en: "Progress from the first week",
    },
    desc: {
      fr: "Contrairement aux cours classiques, vous pratiquez la vraie conversation dès le début. Pas d'attente de 6 mois pour « être prêt ».",
      en: 'Unlike traditional courses, you practice real conversation from the start. No waiting 6 months to "be ready".',
    },
  },
  {
    num: "06",
    title: {
      fr: "Avec de vraies personnes, pas une IA",
      en: "With real people, not AI",
    },
    desc: {
      fr: "Chaque session est avec un formateur humain qualifié qui adapte son enseignement à votre niveau et vos objectifs personnels.",
      en: "Each session is with a qualified human trainer who adapts teaching to your level and personal goals.",
    },
  },
];
