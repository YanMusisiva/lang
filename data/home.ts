import type { Plan, BulletCard } from "@/types/";

export { TESTIMONIALS } from "@/data/testimonials";

export const PLANS: Plan[] = [
  {
    name: { fr: "Programme en groupe", en: "Group program" },
    price: { fr: "49", en: "49" },
    desc: { fr: "Pratiquez ensemble, progressez avec votre formateur.", en: "Practice together, progress with your teacher." },
    features: [
      { fr: "Cours d’anglais professionnel", en: "Professional English lessons" },
      { fr: "Séances de pratique en groupe", en: "Group practice sessions" },
      { fr: "Speaking, listening et shadowing", en: "Speaking, listening and shadowing" },
      { fr: "Simulations de situations réelles", en: "Real-world simulations" },
      { fr: "Accompagnement et corrections du formateur", en: "Teacher support and feedback" },
    ],
  },
  {
    name: { fr: "Coaching individuel", en: "One-to-one coaching" },
    price: { fr: "149", en: "149" },
    featured: true,
    tag: { fr: "Populaire", en: "Popular" },
    desc: {
      fr: "Votre coach personnel, un parcours adapté à votre métier.",
      en: "Your personal coach, a path tailored to your profession.",
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
