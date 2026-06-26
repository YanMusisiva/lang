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
    {
      id: 3,
      textWithBlank: "They ___ a new car last week.",
      options: ["buy", "bought", "buys"],
      correctOption: "bought",
      englishFull: "They bought a new car last week",
      frenchTranslation:
        "Ils ont acheté une nouvelle voiture la semaine dernière.",
    },
    {
      id: 4,
      textWithBlank: "I don't have ___ money left.",
      options: ["many", "some", "any"],
      correctOption: "any",
      englishFull: "I don't have any money left",
      frenchTranslation: "Il ne me reste plus d'argent.",
    },
    {
      id: 5,
      textWithBlank: "What ___ you doing right now?",
      options: ["is", "am", "are"],
      correctOption: "are",
      englishFull: "What are you doing right now",
      frenchTranslation: "Que fais-tu en ce moment ?",
    },
    {
      id: 6,
      textWithBlank: "He is ___ than his brother.",
      options: ["tall", "taller", "tallest"],
      correctOption: "taller",
      englishFull: "He is taller than his brother",
      frenchTranslation: "Il est plus grand que son frère.",
    },
    {
      id: 7,
      textWithBlank: "We ___ going to visit London next summer.",
      options: ["are", "will", "have"],
      correctOption: "are",
      englishFull: "We are going to visit London next summer",
      frenchTranslation: "Nous allons visiter Londres l'été prochain.",
    },
    {
      id: 8,
      textWithBlank: "Listen! The baby ___.",
      options: ["cries", "is crying", "cry"],
      correctOption: "is crying",
      englishFull: "Listen The baby is crying",
      frenchTranslation: "Écoute ! Le bébé pleure.",
    },
    {
      id: 9,
      textWithBlank: "This book is ___.",
      options: ["me", "my", "mine"],
      correctOption: "mine",
      englishFull: "This book is mine",
      frenchTranslation: "Ce livre est le mien.",
    },
    {
      id: 10,
      textWithBlank: "Did you ___ the new movie yesterday?",
      options: ["see", "saw", "seen"],
      correctOption: "see",
      englishFull: "Did you see the new movie yesterday",
      frenchTranslation: "As-tu vu le nouveau film hier ?",
    },
    {
      id: 11,
      textWithBlank: "There are ___ apples on the table.",
      options: ["much", "some", "any"],
      correctOption: "some",
      englishFull: "There are some apples on the table",
      frenchTranslation: "Il y a des pommes sur la table.",
    },
    {
      id: 12,
      textWithBlank: "How ___ does this jacket cost?",
      options: ["many", "much", "long"],
      correctOption: "much",
      englishFull: "How much does this jacket cost",
      frenchTranslation: "Combien coûte cette veste ?",
    },
    {
      id: 13,
      textWithBlank: "She usually ___ breakfast at 7 AM.",
      options: ["has", "have", "having"],
      correctOption: "has",
      englishFull: "She usually has breakfast at seven AM",
      frenchTranslation: "D'habitude, elle prend son petit-déjeuner à 7h.",
    },
    {
      id: 14,
      textWithBlank: "We walked ___ the park yesterday.",
      options: ["in", "on", "at"],
      correctOption: "in",
      englishFull: "We walked in the park yesterday",
      frenchTranslation: "Nous nous sommes promenés dans le parc hier.",
    },
    {
      id: 15,
      textWithBlank: "___ you speak English?",
      options: ["Are", "Do", "Have"],
      correctOption: "Do",
      englishFull: "Do you speak English",
      frenchTranslation: "Parles-tu anglais ?",
    },
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
    {
      id: 2,
      textWithBlank: "If it rains tomorrow, we ___ stay at home.",
      options: ["would", "will", "had"],
      correctOption: "will",
      englishFull: "If it rains tomorrow we will stay at home",
      frenchTranslation: "S'il pleut demain, nous resterons à la maison.",
    },
    {
      id: 3,
      textWithBlank: "I haven't finished my report ___.",
      options: ["already", "yet", "never"],
      correctOption: "yet",
      englishFull: "I haven't finished my report yet",
      frenchTranslation: "Je n'ai pas encore fini mon rapport.",
    },
    {
      id: 4,
      textWithBlank: "She is the woman ___ helped me yesterday.",
      options: ["which", "who", "whose"],
      correctOption: "who",
      englishFull: "She is the woman who helped me yesterday",
      frenchTranslation: "C'est la femme qui m'a aidé hier.",
    },
    {
      id: 5,
      textWithBlank: "You ___ smoke in the hospital.",
      options: ["mustn't", "don't have to", "needn't"],
      correctOption: "mustn't",
      englishFull: "You mustn't smoke in the hospital",
      frenchTranslation: "Vous ne devez pas fumer à l'hôpital.",
    },
    {
      id: 6,
      textWithBlank: "While I ___ cooking, the phone rang.",
      options: ["am", "was", "were"],
      correctOption: "was",
      englishFull: "While I was cooking the phone rang",
      frenchTranslation: "Pendant que je cuisinais, le téléphone a sonné.",
    },
    {
      id: 7,
      textWithBlank: "I look forward to ___ you soon.",
      options: ["see", "seeing", "seen"],
      correctOption: "seeing",
      englishFull: "I look forward to seeing you soon",
      frenchTranslation: "Au plaisir de vous revoir bientôt.",
    },
    {
      id: 8,
      textWithBlank: "The keys ___ found on the floor this morning.",
      options: ["were", "was", "are"],
      correctOption: "were",
      englishFull: "The keys were found on the floor this morning",
      frenchTranslation: "Les clés ont été trouvées par terre ce matin.",
    },
    {
      id: 9,
      textWithBlank: "He has been living here ___ 2015.",
      options: ["for", "since", "during"],
      correctOption: "since",
      englishFull: "He has been living here since twenty fifteen",
      frenchTranslation: "Il vit ici depuis 2015.",
    },
    {
      id: 10,
      textWithBlank: "This pizza is good, but that one is even ___.",
      options: ["gooder", "more good", "better"],
      correctOption: "better",
      englishFull: "This pizza is good but that one is even better",
      frenchTranslation:
        "Cette pizza est bonne, mais celle-là est encore meilleure.",
    },
    {
      id: 11,
      textWithBlank: "I used to ___ football when I was young.",
      options: ["play", "playing", "played"],
      correctOption: "play",
      englishFull: "I used to play football when I was young",
      frenchTranslation: "Je jouais au football quand j'étais jeune.",
    },
    {
      id: 12,
      textWithBlank: "He left without ___ goodbye.",
      options: ["say", "saying", "said"],
      correctOption: "saying",
      englishFull: "He left without saying goodbye",
      frenchTranslation: "Il est parti sans dire au revoir.",
    },
    {
      id: 13,
      textWithBlank: "We don't have ___ time before the train leaves.",
      options: ["many", "much", "few"],
      correctOption: "much",
      englishFull: "We don't have much time before the train leaves",
      frenchTranslation:
        "Nous n'avons pas beaucoup de temps avant que le train ne parte.",
    },
    {
      id: 14,
      textWithBlank: "She wonders where ___ her purse.",
      options: ["did she leave", "she left", "has she left"],
      correctOption: "she left",
      englishFull: "She wonders where she left her purse",
      frenchTranslation: "Elle se demande où elle a laissé son sac à main.",
    },
    {
      id: 15,
      textWithBlank: "You should ___ your homework before going out.",
      options: ["do", "make", "did"],
      correctOption: "do",
      englishFull: "You should do your homework before going out",
      frenchTranslation: "Tu devrais faire tes devoirs avant de sortir.",
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
    {
      id: 2,
      textWithBlank: "By the time they arrived, the movie ___ already started.",
      options: ["has", "was", "had"],
      correctOption: "had",
      englishFull: "By the time they arrived the movie had already started",
      frenchTranslation:
        "Au moment où ils sont arrivés, le film avait déjà commencé.",
    },
    {
      id: 3,
      textWithBlank: "I wish I ___ German when I was at school.",
      options: ["studied", "had studied", "would study"],
      correctOption: "had studied",
      englishFull: "I wish I had studied German when I was at school",
      frenchTranslation:
        "J'aurais aimé étudier l'allemand quand j'étais à l'école.",
    },
    {
      id: 4,
      textWithBlank: "He denied ___ the money from the safe.",
      options: ["to steal", "stealing", "stole"],
      correctOption: "stealing",
      englishFull: "He denied stealing the money from the safe",
      frenchTranslation: "Il a nié avoir volé l'argent du coffre-fort.",
    },
    {
      id: 5,
      textWithBlank: "The project ___ by the team before next Friday.",
      options: ["will be completed", "will complete", "is completing"],
      correctOption: "will be completed",
      englishFull:
        "The project will be completed by the team before next Friday",
      frenchTranslation:
        "Le projet sera terminé par l'équipe avant vendredi prochain.",
    },
    {
      id: 6,
      textWithBlank: "In spite of ___ sick, she attended the meeting.",
      options: ["she was", "being", "her sickness"],
      correctOption: "being",
      englishFull: "In spite of being sick she attended the meeting",
      frenchTranslation: "Bien qu'étant malade, elle a assisté à la réunion.",
    },
    {
      id: 7,
      textWithBlank: "I would rather you ___ tell anyone about this.",
      options: ["don't", "not to", "didn't"],
      correctOption: "didn't",
      englishFull: "I would rather you didn't tell anyone about this",
      frenchTranslation: "Je préférerais que tu n'en parles à personne.",
    },
    {
      id: 8,
      textWithBlank: "She is not used to ___ early in the morning.",
      options: ["wake up", "waking up", "woke up"],
      correctOption: "waking up",
      englishFull: "She is not used to waking up early in the morning",
      frenchTranslation:
        "Elle n'a pas l'habitude de se réveiller tôt le matin.",
    },
    {
      id: 9,
      textWithBlank: "Unless you ___ harder, you won't pass the exam.",
      options: ["study", "don't study", "will study"],
      correctOption: "study",
      englishFull: "Unless you study harder you won't pass the exam",
      frenchTranslation:
        "À moins que tu n'étudies plus dur, tu ne réussiras pas l'examen.",
    },
    {
      id: 10,
      textWithBlank: "The man ___ car was stolen called the police.",
      options: ["who", "which", "whose"],
      correctOption: "whose",
      englishFull: "The man whose car was stolen called the police",
      frenchTranslation:
        "L'homme dont la voiture a été volée a appelé la police.",
    },
    {
      id: 11,
      textWithBlank: "He suggested ___ a break after two hours of work.",
      options: ["to take", "taking", "take"],
      correctOption: "taking",
      englishFull: "He suggested taking a break after two hours of work",
      frenchTranslation:
        "Il a suggéré de faire une pause après deux heures de travail.",
    },
    {
      id: 12,
      textWithBlank: "The test was ___ difficult that nobody passed.",
      options: ["so", "such", "too"],
      correctOption: "so",
      englishFull: "The test was so difficult that nobody passed",
      frenchTranslation:
        "L'examen était tellement difficile que personne n'a réussi.",
    },
    {
      id: 13,
      textWithBlank: "You had better ___ an umbrella, it looks like rain.",
      options: ["take", "taking", "to take"],
      correctOption: "take",
      englishFull: "You had better take an umbrella it looks like rain",
      frenchTranslation:
        "Tu ferais mieux de prendre un parapluie, on dirait qu'il va pleuvoir.",
    },
    {
      id: 14,
      textWithBlank: "Neither John ___ his sister could come to the party.",
      options: ["or", "nor", "and"],
      correctOption: "nor",
      englishFull: "Neither John nor his sister could come to the party",
      frenchTranslation: "Ni John ni sa sœur n'ont pu venir à la fête.",
    },
    {
      id: 15,
      textWithBlank: "He works out every day ___ to stay healthy.",
      options: ["for", "so that", "in order"],
      correctOption: "in order",
      englishFull: "He works out every day in order to stay healthy",
      frenchTranslation:
        "Il s'entraîne tous les jours afin de rester en bonne santé.",
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
    {
      id: 2,
      textWithBlank: "It is vital that he ___ the truth immediately.",
      options: ["knows", "know", "has known"],
      correctOption: "know",
      englishFull: "It is vital that he know the truth immediately",
      frenchTranslation: "Il est vital qu'il sache la vérité immédiatement.",
    },
    {
      id: 3,
      textWithBlank: "Little ___ they know about the trap that lay ahead.",
      options: ["did", "had", "were"],
      correctOption: "did",
      englishFull: "Little did they know about the trap that lay ahead",
      frenchTranslation: "Ils ne se doutaient pas du piège qui les attendait.",
    },
    {
      id: 4,
      textWithBlank: "Had I known about the issue, I ___ things differently.",
      options: ["would do", "will have done", "would have done"],
      correctOption: "would have done",
      englishFull:
        "Had I known about the issue I would have done things differently",
      frenchTranslation:
        "Si j'avais été au courant du problème, j'aurais fait les choses différemment.",
    },
    {
      id: 5,
      textWithBlank: "Try ___ he might, he couldn't solve the puzzle.",
      options: ["as", "how", "though"],
      correctOption: "as",
      englishFull: "Try as he might he couldn't solve the puzzle",
      frenchTranslation:
        "Aussi fort qu'il ait essayé, il n'a pas pu résoudre l'énigme.",
    },
    {
      id: 6,
      textWithBlank:
        "The building, ___ construction took five years, opened today.",
      options: ["which", "whose", "of which"],
      correctOption: "whose",
      englishFull:
        "The building whose construction took five years opened today",
      frenchTranslation:
        "Le bâtiment, dont la construction a pris cinq ans, a ouvert aujourd'hui.",
    },
    {
      id: 7,
      textWithBlank: "No sooner had she left ___ it started pouring down.",
      options: ["than", "when", "then"],
      correctOption: "than",
      englishFull: "No sooner had she left than it started pouring down",
      frenchTranslation:
        "À peine était-elle partie qu'il s'est mis à pleuvoir à verse.",
    },
    {
      id: 8,
      textWithBlank: "I'd rather you ___ mentioned that topic yesterday.",
      options: ["didn't", "hadn't", "not"],
      correctOption: "hadn't",
      englishFull: "I'd rather you hadn't mentioned that topic yesterday",
      frenchTranslation:
        "Je préférerais que tu n'aies pas mentionné ce sujet hier.",
    },
    {
      id: 9,
      textWithBlank: "He was accused of ___ company secrets to a rival.",
      options: ["having leaked", "to leak", "leak"],
      correctOption: "having leaked",
      englishFull: "He was accused of having leaked company secrets to a rival",
      frenchTranslation:
        "Il a été accusé d'avoir divulgué des secrets d'entreprise à un rival.",
    },
    {
      id: 10,
      textWithBlank: "She looked as though she ___ a ghost.",
      options: ["saw", "has seen", "had seen"],
      correctOption: "had seen",
      englishFull: "She looked as though she had seen a ghost",
      frenchTranslation: "Elle avait l'air d'avoir vu un fantôme.",
    },
    {
      id: 11,
      textWithBlank: "Were they ___ offer me the job, I would accept it.",
      options: ["should", "to", "had"],
      correctOption: "to",
      englishFull: "Were they to offer me the job I would accept it",
      frenchTranslation:
        "S'ils devaient me proposer le poste, je l'accepterais.",
    },
    {
      id: 12,
      textWithBlank: "They congratulated me on ___ the championship.",
      options: ["win", "to win", "winning"],
      correctOption: "winning",
      englishFull: "They congratulated me on winning the championship",
      frenchTranslation:
        "Ils m'ont félicité pour avoir remporté le championnat.",
    },
    {
      id: 13,
      textWithBlank:
        "Such ___ the violence of the storm that trees were uprooted.",
      options: ["was", "had", "did"],
      correctOption: "was",
      englishFull:
        "Such was the violence of the storm that trees were uprooted",
      frenchTranslation:
        "Telle était la violence de la tempête que des arbres ont été déracinés.",
    },
    {
      id: 14,
      textWithBlank: "I object to ___ treated like a child.",
      options: ["be", "being", "been"],
      correctOption: "being",
      englishFull: "I object to being treated like a child",
      frenchTranslation: "Je m'oppose à être traité comme un enfant.",
    },
    {
      id: 15,
      textWithBlank:
        "He didn't get the job, despite ___ all the qualifications.",
      options: ["having", "he had", "of having"],
      correctOption: "having",
      englishFull:
        "He didn't get the job despite having all the qualifications",
      frenchTranslation:
        "Il n'a pas obtenu le poste, malgré toutes ses qualifications.",
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
    {
      id: 2,
      textWithBlank: "The two companies are planning to ___ next quarter.",
      options: ["merge", "mix", "join"],
      correctOption: "merge",
      englishFull: "The two companies are planning to merge next quarter",
      frenchTranslation:
        "Les deux entreprises prévoient de fusionner le trimestre prochain.",
    },
    {
      id: 3,
      textWithBlank: "Our sales have fallen, but we hope to ___ soon.",
      options: ["bounce back", "get down", "fall through"],
      correctOption: "bounce back",
      englishFull: "Our sales have fallen but we hope to bounce back soon",
      frenchTranslation:
        "Nos ventes ont chuté, mais nous espérons rebondir bientôt.",
    },
    {
      id: 4,
      textWithBlank:
        "We need to calculate the return on ___ for this campaign.",
      options: ["investment", "income", "interest"],
      correctOption: "investment",
      englishFull:
        "We need to calculate the return on investment for this campaign",
      frenchTranslation:
        "Nous devons calculer le retour sur investissement de cette campagne.",
    },
    {
      id: 5,
      textWithBlank: "The contract is ___ to review before we sign it.",
      options: ["subject", "liable", "bound"],
      correctOption: "subject",
      englishFull: "The contract is subject to review before we sign it",
      frenchTranslation: "Le contrat est soumis à révision avant signature.",
    },
    {
      id: 6,
      textWithBlank: "She was able to negotiate a higher profit ___.",
      options: ["margin", "border", "gap"],
      correctOption: "margin",
      englishFull: "She was able to negotiate a higher profit margin",
      frenchTranslation:
        "Elle a réussi à négocier une marge bénéficiaire plus élevée.",
    },
    {
      id: 7,
      textWithBlank: "We must decide whether to ___ our manufacturing tasks.",
      options: ["outsource", "extract", "export"],
      correctOption: "outsource",
      englishFull:
        "We must decide whether to outsource our manufacturing tasks",
      frenchTranslation:
        "Nous devons décider si nous sous-traitons nos tâches de fabrication.",
    },
    {
      id: 8,
      textWithBlank: "This non-disclosure agreement is legally ___.",
      options: ["binding", "holding", "fastening"],
      correctOption: "binding",
      englishFull: "This non disclosure agreement is legally binding",
      frenchTranslation:
        "Cet accord de non-divulgation est juridiquement contraignant.",
    },
    {
      id: 9,
      textWithBlank:
        "Let's try to reach a ___ agreement that benefits both parties.",
      options: ["win-win", "one-way", "give-take"],
      correctOption: "win-win",
      englishFull:
        "Let's try to reach a win win agreement that benefits both parties",
      frenchTranslation:
        "Essayons de parvenir à un accord gagnant-gagnant qui profite aux deux parties.",
    },
    {
      id: 10,
      textWithBlank:
        "Due to the economic crisis, we have to lay ___ fifty workers.",
      options: ["off", "down", "out"],
      correctOption: "off",
      englishFull:
        "Due to the economic crisis we have to lay off fifty workers",
      frenchTranslation:
        "En raison de la crise économique, nous devons licencier cinquante travailleurs.",
    },
    {
      id: 11,
      textWithBlank: "He has a track ___ of increasing company revenue.",
      options: ["record", "path", "history"],
      correctOption: "record",
      englishFull: "He has a track record of increasing company revenue",
      frenchTranslation:
        "Il a fait ses preuves dans l'augmentation du chiffre d'affaires de l'entreprise.",
    },
    {
      id: 12,
      textWithBlank: "We need to streamline our workflow to increase ___.",
      options: ["efficiency", "quantity", "capacity"],
      correctOption: "efficiency",
      englishFull: "We need to streamline our workflow to increase efficiency",
      frenchTranslation:
        "Nous devons rationaliser notre flux de travail pour accroître l'efficacité.",
    },
    {
      id: 13,
      textWithBlank: "The CFO will present the financial ___ this afternoon.",
      options: ["forecast", "prediction", "guess"],
      correctOption: "forecast",
      englishFull: "The CFO will present the financial forecast this afternoon",
      frenchTranslation:
        "Le directeur financier présentera les prévisions financières cet après-midi.",
    },
    {
      id: 14,
      textWithBlank: "We need to gain a larger share of the target ___.",
      options: ["market", "public", "audience"],
      correctOption: "market",
      englishFull: "We need to gain a larger share of the target market",
      frenchTranslation:
        "Nous devons acquérir une part plus importante du marché cible.",
    },
    {
      id: 15,
      textWithBlank: "The project fell ___ because funding was withdrawn.",
      options: ["through", "off", "apart"],
      correctOption: "through",
      englishFull: "The project fell through because funding was withdrawn",
      frenchTranslation:
        "Le projet a échoué parce que le financement a été retiré.",
    },
  ],
};
