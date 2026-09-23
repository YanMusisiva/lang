export type ChocQuestion = { french: string; english: string };

type Fragment = { fr: string; en: string };
type Theme = {
  id: string;
  title: string;
  level: 1 | 2 | 3 | 4 | 5;
  subjects: Fragment[];
  endings: Fragment[];
};

const matrix = (subjects: Fragment[], endings: Fragment[]): ChocQuestion[] =>
  subjects.flatMap((subject) => endings.map((ending) => ({
    french: `${subject.fr} ${ending.fr}`,
    english: `${subject.en} ${ending.en}`,
  })));

// 20 thèmes × 16 phrases = 320 questions uniques. La progression reprend la
// méthode du document : phrase globale, situations concrètes et répétition.
const THEMES: Theme[] = [
  {
    id: "family_positions", title: "Family & Positions", level: 1,
    subjects: [
      { en: "My father is", fr: "Mon père est" }, { en: "My mother is", fr: "Ma mère est" },
      { en: "The baby is", fr: "Le bébé est" }, { en: "My cousins are", fr: "Mes cousins sont" },
    ],
    endings: [
      { en: "in front of the house.", fr: "devant la maison." }, { en: "behind the table.", fr: "derrière la table." },
      { en: "in the garden.", fr: "dans le jardin." }, { en: "near the door.", fr: "près de la porte." },
    ],
  },
  {
    id: "basic_questions", title: "Everyday Questions", level: 1,
    subjects: [
      { en: "Is the baby", fr: "Le bébé est-il" }, { en: "Is your sister", fr: "Votre sœur est-elle" },
      { en: "Is the bicycle", fr: "La bicyclette est-elle" }, { en: "Is your uncle", fr: "Votre oncle est-il" },
    ],
    endings: [
      { en: "in the house?", fr: "dans la maison ?" }, { en: "in the garden?", fr: "dans le jardin ?" },
      { en: "near the road?", fr: "près de la route ?" }, { en: "behind the door?", fr: "derrière la porte ?" },
    ],
  },
  {
    id: "daily_routine", title: "Daily Routine", level: 1,
    subjects: [
      { en: "My parents", fr: "Mes parents" }, { en: "My brothers", fr: "Mes frères" },
      { en: "My colleagues", fr: "Mes collègues" }, { en: "Our teachers", fr: "Nos professeurs" },
    ],
    endings: [
      { en: "get up early every day.", fr: "se lèvent tôt chaque jour." }, { en: "have breakfast at home.", fr: "prennent le petit-déjeuner à la maison." },
      { en: "start work at eight.", fr: "commencent le travail à huit heures." }, { en: "rest in the evening.", fr: "se reposent le soir." },
    ],
  },
  {
    id: "days_school", title: "Days & School", level: 1,
    subjects: [
      { en: "The children", fr: "Les enfants" }, { en: "The students", fr: "Les élèves" },
      { en: "My friends", fr: "Mes amis" }, { en: "The teachers", fr: "Les professeurs" },
    ],
    endings: [
      { en: "go to school on Monday.", fr: "vont à l’école le lundi." }, { en: "study English in the morning.", fr: "étudient l’anglais le matin." },
      { en: "have classes in the afternoon.", fr: "ont cours l’après-midi." }, { en: "rest at the weekend.", fr: "se reposent le week-end." },
    ],
  },
  {
    id: "movement", title: "Movement & Direction", level: 2,
    subjects: [
      { en: "The girl is", fr: "La jeune fille est en train de" }, { en: "The man is", fr: "L’homme est en train de" },
      { en: "The cat is", fr: "Le chat est en train de" }, { en: "The children are", fr: "Les enfants sont en train de" },
    ],
    endings: [
      { en: "going into the house.", fr: "entrer dans la maison." }, { en: "coming out of the office.", fr: "sortir du bureau." },
      { en: "walking across the road.", fr: "traverser la route." }, { en: "running toward the garden.", fr: "courir vers le jardin." },
    ],
  },
  {
    id: "weather", title: "Weather & Seasons", level: 2,
    subjects: [
      { en: "The day is", fr: "La journée est" }, { en: "The morning is", fr: "La matinée est" },
      { en: "The week is", fr: "La semaine est" }, { en: "The evening is", fr: "La soirée est" },
    ],
    endings: [
      { en: "cold and windy.", fr: "froide et venteuse." }, { en: "warm and sunny.", fr: "chaude et ensoleillée." },
      { en: "wet and cloudy.", fr: "humide et nuageuse." }, { en: "calm but chilly.", fr: "calme mais fraîche." },
    ],
  },
  {
    id: "clothes", title: "Clothes & Colours", level: 2,
    subjects: [
      { en: "Mr. Brown is wearing", fr: "M. Brown porte" }, { en: "My sister is buying", fr: "Ma sœur achète" },
      { en: "The customer is choosing", fr: "Le client choisit" }, { en: "Our manager prefers", fr: "Notre responsable préfère" },
    ],
    endings: [
      { en: "a blue shirt.", fr: "une chemise bleue." }, { en: "a black coat.", fr: "un manteau noir." },
      { en: "comfortable shoes.", fr: "des chaussures confortables." }, { en: "a grey suit.", fr: "un costume gris." },
    ],
  },
  {
    id: "descriptions", title: "People & Descriptions", level: 2,
    subjects: [
      { en: "My neighbour has", fr: "Mon voisin a" }, { en: "Her daughter has", fr: "Sa fille a" },
      { en: "The new employee has", fr: "Le nouvel employé a" }, { en: "Their teacher has", fr: "Leur professeur a" },
    ],
    endings: [
      { en: "short black hair.", fr: "les cheveux noirs et courts." }, { en: "bright green eyes.", fr: "des yeux verts et brillants." },
      { en: "a friendly smile.", fr: "un sourire chaleureux." }, { en: "a calm voice.", fr: "une voix calme." },
    ],
  },
  {
    id: "perception", title: "See, Hear & Feel", level: 3,
    subjects: [
      { en: "I can", fr: "Je peux" }, { en: "We can", fr: "Nous pouvons" },
      { en: "The children can", fr: "Les enfants peuvent" }, { en: "Our guide can", fr: "Notre guide peut" },
    ],
    endings: [
      { en: "hear the wind in the trees.", fr: "entendre le vent dans les arbres." }, { en: "see the lights from here.", fr: "voir les lumières d’ici." },
      { en: "smell the flowers in the garden.", fr: "sentir les fleurs du jardin." }, { en: "feel the cold air outside.", fr: "sentir l’air froid dehors." },
    ],
  },
  {
    id: "home_visit", title: "A Visit at Home", level: 3,
    subjects: [
      { en: "Our guest would like", fr: "Notre invité aimerait" }, { en: "My neighbour wants", fr: "Mon voisin veut" },
      { en: "The visitor needs", fr: "Le visiteur a besoin de" }, { en: "My colleague hopes", fr: "Mon collègue espère" },
    ],
    endings: [
      { en: "to visit the living room.", fr: "visiter le salon." }, { en: "to sit near the window.", fr: "s’asseoir près de la fenêtre." },
      { en: "to speak with the family.", fr: "parler avec la famille." }, { en: "to see the new furniture.", fr: "voir les nouveaux meubles." },
    ],
  },
  {
    id: "post_office", title: "At the Post Office", level: 3,
    subjects: [
      { en: "I would like", fr: "Je voudrais" }, { en: "The customer would like", fr: "Le client voudrait" },
      { en: "My colleague needs", fr: "Mon collègue a besoin de" }, { en: "The assistant is going", fr: "L’assistant va" },
    ],
    endings: [
      { en: "to buy three stamps.", fr: "acheter trois timbres." }, { en: "to send this parcel.", fr: "envoyer ce colis." },
      { en: "to check the address.", fr: "vérifier l’adresse." }, { en: "to wait at the counter.", fr: "attendre au guichet." },
    ],
  },
  {
    id: "money", title: "Money & Purchases", level: 3,
    subjects: [
      { en: "This customer", fr: "Ce client" }, { en: "My friend", fr: "Mon ami" },
      { en: "The shop owner", fr: "Le propriétaire du magasin" }, { en: "Our neighbour", fr: "Notre voisin" },
    ],
    endings: [
      { en: "paid in cash.", fr: "a payé en espèces." }, { en: "asked for the price.", fr: "a demandé le prix." },
      { en: "checked the change.", fr: "a vérifié la monnaie." }, { en: "saved enough money.", fr: "a économisé assez d’argent." },
    ],
  },
  {
    id: "measurements", title: "Measurements & Quantities", level: 4,
    subjects: [
      { en: "The living room is", fr: "Le salon fait" }, { en: "The classroom is", fr: "La salle de classe fait" },
      { en: "The office is", fr: "Le bureau fait" }, { en: "The kitchen is", fr: "La cuisine fait" },
    ],
    endings: [
      { en: "two metres long.", fr: "deux mètres de long." }, { en: "five metres wide.", fr: "cinq mètres de large." },
      { en: "larger than expected.", fr: "plus grand que prévu." }, { en: "smaller than the dining room.", fr: "plus petit que la salle à manger." },
    ],
  },
  {
    id: "groceries", title: "At the Grocery Store", level: 4,
    subjects: [
      { en: "We need", fr: "Nous avons besoin de" }, { en: "The family bought", fr: "La famille a acheté" },
      { en: "The cook chose", fr: "Le cuisinier a choisi" }, { en: "My neighbour brought", fr: "Mon voisin a apporté" },
    ],
    endings: [
      { en: "some fresh vegetables.", fr: "quelques légumes frais." }, { en: "a basket of fruit.", fr: "un panier de fruits." },
      { en: "two loaves of bread.", fr: "deux pains." }, { en: "enough food for dinner.", fr: "assez de nourriture pour le dîner." },
    ],
  },
  {
    id: "school_actions", title: "Actions at School", level: 4,
    subjects: [
      { en: "The student has", fr: "L’élève a" }, { en: "The teacher has", fr: "Le professeur a" },
      { en: "My classmate has", fr: "Mon camarade a" }, { en: "Our group has", fr: "Notre groupe a" },
    ],
    endings: [
      { en: "just opened the book.", fr: "vient d’ouvrir le livre." }, { en: "just answered the question.", fr: "vient de répondre à la question." },
      { en: "already finished the exercise.", fr: "déjà terminé l’exercice." }, { en: "not written the answer yet.", fr: "pas encore écrit la réponse." },
    ],
  },
  {
    id: "farm", title: "A Day at the Farm", level: 4,
    subjects: [
      { en: "The farmer was", fr: "Le fermier était en train de" }, { en: "The children were", fr: "Les enfants étaient en train de" },
      { en: "My uncle was", fr: "Mon oncle était en train de" }, { en: "The workers were", fr: "Les ouvriers étaient en train de" },
    ],
    endings: [
      { en: "feeding the horses.", fr: "nourrir les chevaux." }, { en: "walking near the barn.", fr: "marcher près de la grange." },
      { en: "repairing the old fence.", fr: "réparer la vieille clôture." }, { en: "working in the field.", fr: "travailler dans le champ." },
    ],
  },
  {
    id: "vacation", title: "Vacation Plans", level: 5,
    subjects: [
      { en: "Next summer, I will", fr: "L’été prochain, je vais" }, { en: "During the holidays, we will", fr: "Pendant les vacances, nous allons" },
      { en: "Next month, my friends will", fr: "Le mois prochain, mes amis vont" }, { en: "This weekend, my family will", fr: "Ce week-end, ma famille va" },
    ],
    endings: [
      { en: "travel by train.", fr: "voyager en train." }, { en: "stay near the sea.", fr: "séjourner près de la mer." },
      { en: "visit a historic town.", fr: "visiter une ville historique." }, { en: "prepare a detailed itinerary.", fr: "préparer un itinéraire détaillé." },
    ],
  },
  {
    id: "accident", title: "Reporting an Accident", level: 5,
    subjects: [
      { en: "The witness said that", fr: "Le témoin a dit que" }, { en: "The driver explained that", fr: "Le conducteur a expliqué que" },
      { en: "The police officer confirmed that", fr: "Le policier a confirmé que" }, { en: "The doctor reported that", fr: "Le médecin a signalé que" },
    ],
    endings: [
      { en: "the road was slippery.", fr: "la route était glissante." }, { en: "the ambulance arrived quickly.", fr: "l’ambulance était arrivée rapidement." },
      { en: "nobody was seriously injured.", fr: "personne n’était grièvement blessé." }, { en: "the car had hit the wall.", fr: "la voiture avait heurté le mur." },
    ],
  },
  {
    id: "conditionals", title: "Plans & Conditions", level: 5,
    subjects: [
      { en: "I would travel more", fr: "Je voyagerais davantage" }, { en: "We would buy the house", fr: "Nous achèterions la maison" },
      { en: "She would accept the job", fr: "Elle accepterait le poste" }, { en: "They would start the project", fr: "Ils commenceraient le projet" },
    ],
    endings: [
      { en: "if there were enough time.", fr: "s’il y avait assez de temps." }, { en: "if the price were lower.", fr: "si le prix était plus bas." },
      { en: "if the conditions were better.", fr: "si les conditions étaient meilleures." }, { en: "if funding were available.", fr: "si le financement était disponible." },
    ],
  },
  {
    id: "time_picnic", title: "Time & Picnic Plans", level: 5,
    subjects: [
      { en: "At half past six, we will", fr: "À six heures et demie, nous allons" }, { en: "At a quarter to noon, they will", fr: "À midi moins le quart, ils vont" },
      { en: "At eight o’clock, my friends will", fr: "À huit heures, mes amis vont" }, { en: "At twenty past nine, the family will", fr: "À neuf heures vingt, la famille va" },
    ],
    endings: [
      { en: "leave for the lake.", fr: "partir pour le lac." }, { en: "prepare the picnic basket.", fr: "préparer le panier de pique-nique." },
      { en: "meet near the station.", fr: "se retrouver près de la gare." }, { en: "look for a quiet place.", fr: "chercher un endroit calme." },
    ],
  },
];

export const CHOC_DATASETS = Object.fromEntries(
  THEMES.map((theme) => [`choc_${theme.id}`, matrix(theme.subjects, theme.endings)]),
) as Record<string, ChocQuestion[]>;

function modulesForLevel(level: Theme["level"]) {
  return Object.fromEntries(THEMES.filter((theme) => theme.level === level).flatMap((theme) => [
    [`choc-${theme.id}-speaking`, { title: `${theme.title} - Speaking`, type: "speaking" as const, dataset: `choc_${theme.id}`, estimatedMinutes: 8 }],
    [`choc-${theme.id}-writing`, { title: `${theme.title} - Writing`, type: "writing" as const, dataset: `choc_${theme.id}`, estimatedMinutes: 8 }],
  ]));
}

export const CHOC_MODULES = {
  "level-1": modulesForLevel(1),
  "level-2": modulesForLevel(2),
  "level-3": modulesForLevel(3),
  "level-4": modulesForLevel(4),
  "level-5": modulesForLevel(5),
};

export const CHOC_QUESTION_COUNT = Object.values(CHOC_DATASETS).reduce((total, questions) => total + questions.length, 0);
