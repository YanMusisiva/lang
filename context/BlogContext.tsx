"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { BilingualText } from "@/types/";

export interface Article {
  id: string;
  title: BilingualText;
  slug: string;
  excerpt: BilingualText;
  content: BilingualText;
  category: BilingualText;
  author: BilingualText;
  date: string;
  readTime?: string;
}

const defaultArticles: Article[] = [
  {
    id: "1",
    title: {
      fr: "De Zéro à B2 en 3 Mois : La Méthode Révolutionnaire pour Enfin Parler Anglais",
      en: "From Zero to B2 in 3 Months: The Revolutionary Method to Finally Speak English",
    },
    slug: "zero-a-b2-en-3-mois-methode",
    excerpt: {
      fr: "Découvrez pourquoi 95% des apprenants stagnent et comment notre méthode intensive vous emmène au niveau conversationnel en 90 jours.",
      en: "Discover why 95% of learners plateau and how our intensive method takes you to conversational fluency in 90 days.",
    },
    content: {
      fr: `Introduction : Pourquoi vous ne parlez toujours pas anglais après des années d'apprentissage ?

Vous avez téléchargé toutes les applications. Vous avez regardé des séries en VO. Vous avez même suivi des cours du soir. Pourtant, quand il s'agit de parler, votre esprit se vide et les mots ne viennent pas.

Rassurez-vous, ce n'est pas votre faute.

Le problème, c'est la méthode. Les applications comme Duolingo ou Babbel sont conçues pour vous faire SENTIR que vous progressez, pas pour vous faire PARLER. Elles transforment l'apprentissage en jeu, mais la vie réelle pour les langues n'est pas un jeu : c'est une conversation qui demande des réponses en temps réel.

Nous avons coacher en anglais depuis 2 ans, et nous avons aidé beaucoup d'élèves à briser ce mur du silence. Dans cet article, nous allons vous révéler exactement pourquoi les méthodes traditionnelles échouent et comment nous allons, ensemble, atteindre le niveau B2 en seulement 3 mois.


Partie 1 : Pourquoi les applications seules sont un leurre

1. Le piège de la traduction permanente

Les applications vous font constamment traduire. Vous voyez "the cat is black" et votre cerveau fait "le chat est noir". Ce détour par votre langue maternelle est fatal.

Pourquoi c'est un problème ?
- Cela ralentit votre temps de réaction par 3
- Dans une vraie conversation, vous n'avez pas le temps de traduire
- Vous ne créez pas de connexions neuronales directes entre le concept et le mot anglais

La solution : Il faut associer directement le son "cat" à l'image mentale du chat, sans passer par "chat". C'est ce que nous appelons la *pensée directe*.

2. L'illusion de la gamification

Les applications utilisent des points, des vies, des classements. C'est amusant, mais cela crée une dépendance à la récompense immédiate, pas à l'apprentissage profond.

La réalité : Savoir cliquer sur "I have eaten" plutôt que "I ate" dans un exercice à trous ne signifie pas que vous utiliserez correctement le present perfect dans une conversation stressante.

3. L'absence d'oreille réelle

Les applications utilisent souvent des voix robotiques ou trop artificielles. Dans la vraie vie, les gens parlent vite, mangent leurs mots, ont des accents.

Résultat : Vous comprenez l'application, mais vous êtes perdu face à un vrai Londonien ou un Texan.

4. Zéro interaction humaine

La langue est un phénomène social. Parler déclenche des hormones comme l'ocytocine, renforce la mémoire émotionnelle et crée des ancrages puissants. Une application ne peut pas reproduire cela.



 Partie 2 : La méthode LangListening – Pourquoi elle fonctionne en 3 mois

Ma méthode ne réinvente pas la roue. Elle s'appuie sur les découvertes en neurosciences et en linguistique appliquée. Voici les 5 piliers qui permettent à mes élèves de passer de A0 à B2 en 90 jours.

Pilier n°1 : Le vocabulaire haute fréquence (La règle des 80/20)

Saviez-vous que 300 mots représentent 65% de la conversation courante ? Et que 100 verbes couvrent 80% des actions du quotidien ?

Notre objectif mois 1 : Maîtriser ces 300 mots et 100 verbes, non pas par cœur, mais en contexte.

Exemple concret : Au lieu d'apprendre "to get" comme "obtenir", vous apprendrez :
- "I get it" (je comprends)
- "Get out!" (sors d'ici)
- "I got tired" (je suis devenu fatigué)
- "Get a coffee" (prendre un café)

Un même verbe, 4 contextes, 4 sens différents. C'est ainsi que le cerveau retient.

Pilier n°2 : L'immersion active (Même sans vivre à l'étranger)

Vous n'avez pas besoin d'aller à Londres pour être immergé. Vous avez besoin de recréer un environnement anglophone chez vous.

Ce que je demande à mes élèves :
- Matin (10 min) : Podcast sur un sujet qui les passionne (sport, business, cuisine) en faisant leur petit-déjeuner
- Trajet (15 min) : Shadowing sur une série ou une chanson (répéter à voix haute en imitant l'intonation)
- Soir (15 min) : Série déjà vue en VOST, en se concentrant sur l'audio

Pourquoi ça marche : Cela triple le temps d'exposition sans effort conscient. Le cerveau apprend même quand vous ne faites pas attention.

Pilier n°3 : Le "Pattern Hacking" – Apprendre par blocs

Le cerveau ne construit pas une phrase mot par mot. Il assemble des blocs.

Au lieu d'apprendre la règle du présent continu, vous apprenez des blocs :
- "I am currently working on..."
- "He is looking for..."
- "We are planning to..."

Résultat : Vous gagnez en fluidité immédiate. Vous ne réfléchissez plus à la conjugaison, vous parlez.

Pilier n°4 : La pratique orale intensive (80% de nos sessions)

Pendant nos cours, c'est *vous* qui parlez 80% du temps. Je ne suis pas là pour faire un cours magistral, je suis là pour vous corriger en temps réel et vous pousser à produire.

Exercices typiques :
- Jeux de rôle : "Vous êtes à l'hôtel, votre chambre a un problème, appelez la réception" (moi je joue le réceptionniste)
- Récit d'expérience : "Racontez-moi votre pire voyage en 2 minutes" (je note les erreurs et on corrige ensemble)
- Débats improvisés : "Êtes-vous pour ou contre le télétravail ?" (pas le temps de préparer, il faut réagir)

Pilier n°5 : La répétition espacée (Ne rien oublier)

Toutes les erreurs que vous faites, toutes les phrases qu'on corrige ensemble, vous les notez dans Anki (application de répétition espacée). L'algorithme vous les fera réviser juste avant que vous ne les oubliiez.

Pourquoi c'est puissant : Votre cerveau consolide les apprentissages pendant votre sommeil. La répétition espacée utilise ce mécanisme naturel.


Partie 3 : Notre feuille de route vers le B2 en 90 jours

Mois 1 – Les fondations (Niveau A1 → A2)

Objectif : Construire la base solide qui manque à 90% des apprenants.

Semaines 1-2 :
- Apprentissage des 300 mots essentiels en contexte
- Maîtrise des 50 verbes les plus fréquents
- Construction de phrases simples (Sujet + Verbe + Complément)
- Savoir se présenter, poser des questions simples

Semaines 3-4 :
- Introduction du passé et du futur avec les blocs de langage
- Apprentissage des 50 verbes suivants
- Jeux de rôle quotidiens (au restaurant, dans la rue, au travail)

À la fin du mois 1 : Vous pouvez tenir une conversation simple de 5 minutes sans bloquer. Vous comprenez l'essentiel d'une conversation lente et claire.

Mois 2 – L'expansion (Niveau A2 → B1)

Objectif : Sortir des sentiers battus et gagner en autonomie.

Semaines 5-6 :
- Introduction des temps plus complexes (present perfect, conditionnel simple)
- Enrichissement du vocabulaire (passage de 300 à 1000 mots)
- Apprentissage des "connecting words" (however, although, basically, therefore)

Semaines 7-8 :
- Débats simples sur des sujets d'actualité
- Récits d'expériences personnelles plus détaillés
- Première approche des accents (écoute de speakers écossais, américains, australiens)

À la fin du mois 2 : Vous pouvez suivre une conversation entre natifs si elle n'est pas trop rapide. Vous exprimez votre opinion sur des sujets familiers. Vous êtes à l'aise en voyage.

Mois 3 – La fluidité (Niveau B1 → B2)

Objectif : Automatiser et gagner en spontanéité.

Semaines 9-10 :
- Travail sur la finesse : nuances, humour, sous-entendus
- Simulations complexes (réunion professionnelle, appel au service client, négociation)
- Écoute intensive de contenus authentiques (Ted Talks, journaux télévisés)

Semaines 11-12 :
- Pratique de la prise de parole en continu (présentations de 5-10 min)
- Correction des dernières erreurs systémiques
- Bilan et préparation pour la suite (vers C1)

À la fin du mois 3 : Vous pouvez discuter de sujets abstraits, défendre votre opinion, comprendre l'essentiel d'un film ou d'une série. Vous êtes ce qu'on appelle "conversationally fluent". Félicitations, vous avez atteint le niveau B2 !


Partie 4 : Les outils que nous utiliserons ensemble

En tant que votre coach, je ne vous laisse pas seul avec des bonnes intentions. Voici l'arsenal que nous déploierons :

1. Anki : Pour la répétition espacée de vos phrases corrigées
2. ChatGPT personnalisé : Je vous donnerai des prompts spécifiques pour générer des dialogues sur vos centres d'intérêt
3. WhatsApp : Un groupe où je poste une question chaque matin. Vous répondez en audio (30 sec max), je corrige en 1 ligne. 5 minutes par jour qui changent tout.
4. Bibliothèque de ressources : Podcasts, vidéos, articles sélectionnés pour votre niveau et vos goûts
5. Sessions 1-1 : 3 à 4 fois par semaine selon votre formule, avec corrections en direct et jeux de rôle personnalisés

Conclusion : Le niveau B2 n'est pas un mythe, c'est un engagement

Beaucoup de formations vous promettent l'anglais en 3 mois sans jamais vous expliquer le "comment". Moi, je viens de vous détailler le plan, heure par heure, semaine par semaine.

Est-ce que ce sera facile ? . Est-ce que ce sera confortable ? . Mais est-ce que ça marchera si vous suivez la méthode ? Absolument.

Les applications vous vendent du rêve. Je vous vends du travail, de la structure et des résultats.

Voici ce que je vous garantis :
- Si vous suivez notre plan d'immersion quotidienne
- Si vous participez activement à nos sessions (80% de parole)
- Si vous utilisez les outils de répétition espacée
- Si vous acceptez de faire des erreurs et d'apprendre d'elles

Alors dans 90 jours, vous serez capable de :
- Tenir une conversation soutenue de 30 minutes
- Comprendre vos séries préférées sans sous-titres (ou presque)
- Passer un entretien d'embauche en anglais
- Vous faire des amis anglophones sans stress

Le B2 n'est pas une chimère. C'est une destination. Et je suis le guide qui vous y emmène.

Prêt à commencer ? Réservez votre appel découverte gratuit, et construisons ensemble votre plan personnalisé.

À très vite en session !

— Votre coach

P.S. : Vous doutez encore ? Souvenez-vous de la dernière fois où vous avez bloqué en essayant de parler anglais. Cette sensation désagréable, cette frustration. Dans 3 mois, vous ne la ressentirez plus. Un investissement de 90 jours pour une vie sans barrière linguistique, ça n'a pas de prix.`,
      en: ` Introduction: Why You Still Can't Speak English After Years of Learning?

You've downloaded all the apps. You've watched series in the original version. You've even taken evening classes. Yet, when it comes to speaking, your mind goes blank and the words don't come.

Don't worry, it's not your fault.

The problem is the method. Apps like Duolingo or Babbel are designed to make you *feel* like you're progressing, not to make you *speak*. They turn learning into a game, but real life isn't a game: it's a conversation that requires real-time responses.

We've been coaching for 2 years, and we've helped hundreds of students break through this wall of silence. In this article, we'll reveal exactly why traditional methods fail and how we'll reach B2 level together in just 3 months.


 Part 1: Why Apps Alone Are a Mirage

 1. The Trap of Constant Translation

Apps make you translate constantly. You see "the cat is black" and your brain thinks "le chat est noir". This detour through your native language is fatal.

Why is this a problem?
- It slows your reaction time by 3 times
- In a real conversation, you don't have time to translate
- You don't create direct neural connections between the concept and the English word

The solution: You need to associate the sound "cat" directly with the mental image of the cat, without going through "chat". This is what we call *direct thinking*.

2. The Illusion of Gamification

Apps use points, lives, rankings. It's fun, but it creates a dependency on immediate rewards, not deep learning.

Reality: Knowing to click on "I have eaten" instead of "I ate" in a fill-in-the-blank exercise doesn't mean you'll use the present perfect correctly in a stressful conversation.

3. The Absence of Real Listening

Apps often use robotic or overly artificial voices. In real life, people speak fast, slur words, have accents.

Result: You understand the app, but you're lost in front of a real Londoner or Texan.

4. Zero Human Interaction

Language is a social phenomenon. Speaking triggers hormones like oxytocin, strengthens emotional memory, and creates powerful anchors. An app can't reproduce that.


Part 2: The LangListening Method – Why It Works in 3 Months

My method doesn't reinvent the wheel. It draws on discoveries in neuroscience and applied linguistics. Here are the 5 pillars that allow my students to go from A0 to B2 in 90 days.

Pillar #1: High-Frequency Vocabulary (The 80/20 Rule)

Did you know that 300 words represent 65% of everyday conversation? And that 100 verbs cover 80% of daily actions?

Our Month 1 goal: Master these 300 words and 100 verbs, not by rote, but in context.

Concrete example: Instead of learning "to get" as "to obtain", you'll learn:
- "I get it" (I understand)
- "Get out!" (Get out!)
- "I got tired" (I got tired)
- "Get a coffee" (Get a coffee)

The same verb, 4 contexts, 4 different meanings. That's how the brain remembers.

Pillar #2: Active Immersion (Even Without Living Abroad)

You don't need to go to London to be immersed. You need to recreate an English-speaking environment at home.

What I ask my students to do:
- Morning (10 min): Podcast on a topic they love (sports, business, cooking) while making breakfast
- Commute (15 min): Shadowing a series or song (repeat out loud, imitating intonation)
- Evening (15 min): Series you've already seen in VOST, focusing on the audio

Why it works: It triples exposure time without conscious effort. The brain learns even when you're not paying attention.

Pillar #3: "Pattern Hacking" – Learning in Blocks

The brain doesn't build sentences word by word. It assembles blocks.

Instead of learning the present continuous rule, you learn blocks:
- "I am currently working on..."
- "He is looking for..."
- "We are planning to..."

Result: You gain immediate fluidity. You no longer think about conjugation; you speak.

Pillar #4: Intensive Oral Practice (80% of Our Sessions)

During our classes, *you* speak 80% of the time. I'm not there to give lectures; I'm there to correct you in real-time and push you to produce.

Typical exercises:
- Role-plays: "You're at a hotel, your room has a problem, call reception" (I play the receptionist)
- Experience storytelling: "Tell me about your worst trip in 2 minutes" (I note errors and we correct together)
- Improvised debates: "Are you for or against telecommuting?" (no prep time, you have to react)

Pillar #5: Spaced Repetition (Forget Nothing)

All the mistakes you make, all the phrases we correct together, you note them in Anki (spaced repetition app). The algorithm will make you review them just before you forget them.

Why it's powerful: Your brain consolidates learning during sleep. Spaced repetition uses this natural mechanism.

Part 3: Our Roadmap to B2 in 90 Days

Month 1 – Foundations (Level A1 → A2)

Objective: Build the solid base that 90% of learners lack.

Weeks 1-2:
- Learning the 300 essential words in context
- Mastering the 50 most frequent verbs
- Building simple sentences (Subject + Verb + Complement)
- Knowing how to introduce yourself, ask simple questions

Weeks 3-4:
- Introducing past and future with language blocks
- Learning the next 50 verbs
- Daily role-plays (at the restaurant, on the street, at work)

End of Month 1: You can hold a simple 5-minute conversation without freezing. You understand the essentials of a slow, clear conversation.

Month 2 – Expansion (Level A2 → B1)

Objective: Step outside the beaten path and gain autonomy.

Weeks 5-6:
- Introducing more complex tenses (present perfect, simple conditional)
- Expanding vocabulary (from 300 to 1000 words)
- Learning "connecting words" (however, although, basically, therefore)

*Weeks 7-8*:
- Simple debates on current topics
- More detailed personal experience stories
- First approach to accents (listening to Scottish, American, Australian speakers)

*End of Month 2*: You can follow a conversation between natives if it's not too fast. You express your opinion on familiar topics. You're comfortable traveling.

### Month 3 – Fluency (Level B1 → B2)

*Objective*: Automate and gain spontaneity.

*Weeks 9-10*:
- Work on finesse: nuances, humor, innuendos
- Complex simulations (professional meeting, customer service call, negotiation)
- Intensive listening to authentic content (Ted Talks, news broadcasts)

*Weeks 11-12*:
- Continuous speaking practice (5-10 min presentations)
- Correction of the last systemic errors
- Review and preparation for next steps (towards C1)

*End of Month 3*: You can discuss abstract topics, defend your opinion, understand the gist of a movie or series. You're what we call "conversationally fluent". Congratulations, you've reached B2 level!

---

## Part 4: The Tools We'll Use Together

As your coach, I won't leave you with good intentions alone. Here's the arsenal we'll deploy:

1. *Anki*: For spaced repetition of your corrected phrases
2. *Customized ChatGPT*: I'll give you specific prompts to generate dialogues on your interests
3. *WhatsApp*: A group where I post a question every morning. You respond in audio (30 sec max), I correct in 1 line. 5 minutes a day that change everything.
4. *Resource Library*: Podcasts, videos, articles selected for your level and tastes
5. *1-1 Sessions*: 3-4 times a week depending on your plan, with live corrections and personalized role-plays

---

## Conclusion: B2 Level Isn't a Myth, It's a Commitment

Many courses promise English in 3 months without ever explaining the "how". I've just detailed the plan for you, hour by hour, week by week.

Will it be easy? No. Will it be comfortable? Sometimes not. But will it work if you follow the method? *Absolutely*.

Apps sell you dreams. I sell you work, structure, and results.

*Here's what I guarantee:*
- If you follow our daily immersion plan
- If you actively participate in our sessions (80% speaking)
- If you use spaced repetition tools
- If you accept making mistakes and learning from them

*Then in 90 days, you'll be able to:*
- Hold a sustained 30-minute conversation
- Understand your favorite series without subtitles (or almost)
- Pass a job interview in English
- Make English-speaking friends without stress

B2 isn't a pipe dream. It's a destination. And I'm the guide to take you there.

Ready to start? Book your free discovery call, and let's build your personalized plan together.

*See you soon in session!*

— Your coach

P.S.: Still doubting? Remember the last time you froze trying to speak English. That unpleasant feeling, that frustration. In 3 months, you won't feel it anymore. A 90-day investment for a life without language barriers, it's priceless.`,
    },
    category: { fr: "Méthode", en: "Method" },
    author: { fr: "Votre Coach LangListening", en: "Your LangListening Coach" },
    date: "2026-03-13",
    readTime: "12 min",
  },

  {
    id: "2",
    title: {
      fr: "Pourquoi les applications de langues ne suffisent pas pour parler",
      en: "Why Language Apps Alone Aren't Enough to Speak",
    },
    slug: "apps-langues-pas-suffisant",
    excerpt: {
      fr: "Découvrez pourquoi les applications populaires n'apprennent pas à parler et comment apprendre naturellement.",
      en: "Learn why popular apps don't teach you to speak and how to learn naturally.",
    },
    content: {
      fr: ` Introduction

De nombreuses personnes utilisent des applications pour apprendre une langue, mais elles se retrouvent incapables de parler couramment. Pourquoi ?

Les limites des applications

1. Pas assez d'écoute réelle  
Les applications proposent souvent des exercices de vocabulaire ou de traduction, mais très peu d'écoute naturelle et répétée.

2. Traduction constante  
Vous êtes encouragé à traduire les phrases dans votre langue maternelle, ce qui ralentit la fluidité.

3. Manque d'interaction réelle  
Parler nécessite une réponse immédiate et naturelle, ce que les applications ne peuvent pas fournir.

4. Pas de contexte concret  
Les phrases hors contexte ne restent pas dans votre mémoire à long terme.

 Que faire à la place

1. Écouter la langue en contexte  
Conversations, podcasts, vidéos ou audios adaptés.

2. Répéter et imiter  
Répéter les sons et phrases comme les enfants le font naturellement.

3. Pratiquer avec un interlocuteur réel  
Même 10 minutes par jour avec un teacher ou un partenaire linguistique a un impact énorme.

4. Penser directement dans la langue  
Éviter de traduire, associez les sons directement aux idées.

 Conclusion

Les applications sont utiles pour mémoriser du vocabulaire ou comprendre la grammaire, mais **elles ne remplacent pas l'écoute naturelle et la pratique orale**. Pour vraiment parler, il faut s’exposer à la langue et interagir activement.`,
      en: ` Introduction

Many people use apps to learn a language but still can't speak fluently. Why is that?

The limitations of apps

1. Not enough real listening  
Apps often focus on vocabulary or translation exercises, but lack natural, repeated listening.

2. Constant translation  
You're encouraged to translate phrases into your native language, slowing fluency.

3. Lack of real interaction  
Speaking requires immediate, natural responses, which apps cannot provide.

4. No concrete context  
Out-of-context phrases do not stick in long-term memory.

 What to do instead

1. Listen in context  
Use conversations, podcasts, videos, or tailored audios.

2. Repeat and imitate  
Repeat sounds and phrases like children naturally do.

3. Practice with a real interlocutor  
Even 10 minutes per day with a teacher or language partner has huge impact.

4. Think directly in the language  
Avoid translating; associate sounds directly with ideas.

 Conclusion

Apps are useful for memorizing vocabulary or understanding grammar, but **they do not replace natural listening and speaking practice**. To truly speak, you need exposure and active interaction.`,
    },
    category: { fr: "Apprentissage", en: "Learning" },
    author: { fr: "LangListening", en: "LangListening" },
    date: "2026-03-10",
    readTime: "6 min",
  },

  {
    id: "3",
    title: {
      fr: "Pourquoi les adultes n'arrivent pas à apprendre une langue (et pourquoi les enfants y arrivent)",
      en: "Why Adults Struggle to Learn a Language (and Why Children Don't)",
    },
    slug: "adultes-vs-enfants-langues",
    excerpt: {
      fr: "Découvrez pourquoi les méthodes traditionnelles échouent chez les adultes et comment apprendre comme un enfant.",
      en: "Learn why traditional methods fail adults and how to learn like a child.",
    },
    content: {
      fr: ` Introduction

Beaucoup d'adultes ont du mal à apprendre une langue étrangère, alors que les enfants semblent absorber les mots naturellement. La différence n'est pas l'intelligence, mais la méthode et le fonctionnement du cerveau.

 Pourquoi les adultes échouent

1. Trop de règles et de grammaire  
Les adultes commencent souvent par étudier la grammaire et les listes de vocabulaire. Cela crée un blocage pour parler naturellement.

2. Traduction constante  
Les adultes traduisent chaque mot dans leur tête, ce qui ralentit la compréhension et la fluidité.

3. Manque d'écoute réelle  
Les enfants apprennent principalement en écoutant des phrases répétées dans différents contextes. Les adultes ne passent pas assez de temps à écouter activement.

4. Peur de faire des erreurs  
La peur de mal parler empêche de pratiquer. Les enfants, eux, imitent sans jugement.

 Pourquoi les enfants réussissent

1. L'écoute répétée  
Les enfants entendent des phrases dans leur contexte plusieurs fois avant de les reproduire.

2. L'imitation naturelle  
Ils répètent ce qu'ils entendent, même sans comprendre toutes les règles.

3. L'absence de traduction  
Ils associent directement les sons aux objets ou actions, sans passer par leur langue maternelle.

4. La pratique constante  
Ils sont exposés à la langue en continu, ce qui permet d'apprendre rapidement.

 Conclusion

Pour apprendre efficacement comme un enfant, les adultes doivent :

- écouter régulièrement  
- répéter dans le contexte  
- réduire la traduction  
- se concentrer sur la compréhension avant la perfection grammaticale

Avec la bonne méthode, apprendre une langue devient naturel et rapide.`,

      en: ` Introduction

Many adults struggle to learn a foreign language, while children seem to absorb words naturally. The difference isn't intelligence, but method and brain function.

 Why Adults Struggle

1. Too many rules and grammar  
Adults often start by studying grammar and vocabulary lists. This creates a block for speaking naturally.

2. Constant translation  
Adults translate every word in their heads, slowing understanding and fluency.

3. Lack of real listening  
Children learn mainly by hearing repeated phrases in context. Adults don't spend enough time actively listening.

4. Fear of making mistakes  
Fear of speaking incorrectly prevents practice. Children imitate without judgment.

 Why Children Succeed

1. Repeated listening  
Children hear phrases in context multiple times before reproducing them.

2. Natural imitation  
They repeat what they hear, even without understanding all rules.

3. No translation  
They associate sounds directly with objects or actions, without using their native language.

4. Constant practice  
They are exposed to the language continuously, allowing them to learn quickly.

 Conclusion

To learn effectively like a child, adults should:

- listen regularly  
- repeat in context  
- reduce translation  
- focus on comprehension before grammatical perfection

With the right method, learning a language becomes natural and fast.`,
    },
    category: { fr: "Apprentissage", en: "Learning" },
    author: { fr: "LangListening", en: "LangListening" },
    date: "2026-03-10",
    readTime: "6 min",
  },
];

interface BlogContextType {
  articles: Article[];
  addArticle: (a: Omit<Article, "id">) => void;
  deleteArticle: (id: string) => void;
  getArticle: (slug: string) => Article | undefined;
}

const BlogContext = createContext<BlogContextType>({
  articles: [],
  addArticle: () => {},
  deleteArticle: () => {},
  getArticle: () => undefined,
});

export function BlogProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);

  const addArticle = (a: Omit<Article, "id">) => {
    const newArticle: Article = { ...a, id: Date.now().toString() };
    setArticles((prev) => [newArticle, ...prev]);
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

  return (
    <BlogContext.Provider
      value={{ articles, addArticle, deleteArticle, getArticle }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
