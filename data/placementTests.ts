// src/data/placementTests.ts

export type PlacementQuestion = {
  id: number;
  textWithBlank: string; // Ex: "I ___ a software developer."
  options: string[]; // Ex: ["am", "is", "are"]
  correctOption: string; // Ex: "am"
  englishFull: string; // La phrase complète attendue au micro: "I am a software developer"
  frenchTranslation: string;
};

export const PLACEMENT_TESTS: Record<string, PlacementQuestion[]> = {
  level2: [
    {
      id: 1,
      textWithBlank: "Where ___ you live?",
      options: ["do", "does", "are"],
      correctOption: "do",
      englishFull: "Where do you live",
      frenchTranslation: "Où habites-tu ?",
    },
    {
      id: 2,
      textWithBlank: "She ___ to the gym every morning.",
      options: ["go", "goes", "going"],
      correctOption: "goes",
      englishFull: "She goes to the gym every morning",
      frenchTranslation: "Elle va à la salle de sport chaque matin.",
    },
    // Ajoutez jusqu'à 5 ou 10 questions par niveau
  ],
  level3: [
    {
      id: 1,
      textWithBlank: "I have ___ learning English for two years.",
      options: ["be", "been", "being"],
      correctOption: "been",
      englishFull: "I have been learning English for two years",
      frenchTranslation: "J'apprends l'anglais depuis deux ans.",
    },
  ],
  level4: [
    {
      id: 1,
      textWithBlank: "If I ___ more time, I would travel around the world.",
      options: ["have", "had", "would have"],
      correctOption: "had",
      englishFull: "If I had more time I would travel around the world",
      frenchTranslation:
        "Si j'avais plus de temps, je voyagerais autour du monde.",
    },
  ],
  level5: [
    {
      id: 1,
      textWithBlank: "Hardly ___ had I arrived when the meeting started.",
      options: ["have", "had", "did"],
      correctOption: "had",
      englishFull: "Hardly had I arrived when the meeting started",
      frenchTranslation: "À peine étais-je arrivé que la réunion a commencé.",
    },
  ],
  business2: [
    {
      id: 1,
      textWithBlank: "We need to ___ this issue at the next board meeting.",
      options: ["address", "speak", "talk"],
      correctOption: "address",
      englishFull: "We need to address this issue at the next board meeting",
      frenchTranslation:
        "Nous devons aborder ce problème lors de la prochaine réunion du conseil.",
    },
  ],
};
