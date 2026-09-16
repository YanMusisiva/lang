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
    name: { fr: "Coach personnel", en: "Personal Coach" },
    price: { fr: "149", en: "149" },
    featured: true,
    tag: { fr: "Populaire", en: "Popular" },
    desc: {
      fr: "Votre anglais, votre métier et un coach dédié pendant un mois.",
      en: "Your English, your profession, and a dedicated coach for one month.",
    },
    features: [
      {
        fr: "Séances individuelles avec votre coach",
        en: "One-to-one sessions with your coach",
      },
      {
        fr: "Programme adapté à votre niveau et votre métier",
        en: "A program tailored to your level and profession",
      },
      {
        fr: "Réunions, entretiens et présentations simulés",
        en: "Simulated meetings, interviews, and presentations",
      },
      {
        fr: "Correction personnalisée et travail de prononciation",
        en: "Personal feedback and pronunciation practice",
      },

      {
        fr: "Suivi de votre progression professionnelle",
        en: "Professional progress tracking",
      },
    ],
  },
  {
    name: { fr: "Coach personnel - 3 mois", en: "3-Month Personal Coach" },
    price: { fr: "350", en: "350" },
    desc: {
      fr: "Un accompagnement continu de trois mois avec 97 $ d'économie.",
      en: "Three months of continuous coaching with $97 in savings.",
    },
    features: [
      {
        fr: "Trois mois avec votre coach personnel",
        en: "Three months with your personal coach",
      },
      {
        fr: "Parcours Developer, Business ou Professional English",
        en: "Developer, Business, or Professional English track",
      },
      {
        fr: "Préparation aux réunions, entretiens et clients",
        en: "Preparation for meetings, interviews, and clients",
      },
      {
        fr: "Exercices adaptés à vos situations de travail",
        en: "Exercises tailored to your workplace situations",
      },

      {
        fr: "Suivi continu et corrections personnalisées",
        en: "Ongoing support and personalized feedback",
      },
    ],
  },
];

export const BULLETS: BulletCard[] = [
  {
    num: "01",
    title: {
      fr: "L'anglais de votre quotidien professionnel",
      en: "English for your professional life",
    },
    desc: {
      fr: "Développeur, entrepreneur ou employé de bureau : apprenez à présenter votre travail, expliquer un projet, répondre à un client et intervenir clairement en réunion.",
      en: "Developer, entrepreneur, or office professional: learn to present your work, explain a project, respond to a client, and contribute clearly in meetings.",
    },
  },
  {
    num: "02",
    title: {
      fr: "Learn. Listen. Speak. Interact.",
      en: "Learn. Listen. Speak. Interact.",
    },
    desc: {
      fr: "Apprenez les expressions utiles, entraînez votre oreille, répétez à voix haute puis interagissez avec d'autres apprenants et votre coach jusqu'à pouvoir réellement utiliser l'anglais.",
      en: "Learn useful expressions, train your ear, speak aloud, then interact with other learners and your coach until you can genuinely use English.",
    },
  },
  {
    num: "03",
    title: {
      fr: "Des situations proches de votre métier",
      en: "Situations that match your profession",
    },
    desc: {
      fr: "Travaillez votre présentation, vos daily stand-ups, vos appels, vos emails, vos entretiens, vos négociations et vos prises de parole grâce aux exercices gratuits et aux simulations accompagnées.",
      en: "Practice introductions, daily stand-ups, calls, emails, interviews, negotiations, and presentations through free exercises and guided simulations.",
    },
  },
];
