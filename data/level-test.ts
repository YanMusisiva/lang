export type Question = { q: string; options: string[]; points: Record<number, number> };
export const TEST_VERSION = "placement-v1";

export const QUESTIONS: Question[] = [
    {
      q: "Excuse me, where is the bank ?",
      options: ["the small one", "it's over there", "You can go"],
      points: {
        1: 5,
        2: 1,
      },
    },

    {
      q: "Can I help you ?",
      options: ["No,don't worry", "It's very good", "Sorry, I can't"],
      points: {
        2: 1,
        0: 5,
      },
    },

    {
      q: "Tom wants to go surfing in Hawaii.",
      options: ["Maybe not", "Be careful", "Really ?"],
      points: {
        2: 5,
        1: 1,
      },
    },

    {
      q: "Let's go watch a movie.",
      options: ["Ok, I'll buy popcorn", "No, we weren't", "Yes, I'm sure"],
      points: {
        0: 5,
        2: 1,
      },
    },

    {
      q: "How many eggs do you need ?",
      options: ["Not enough", "Not much", "Not many"],
      points: {
        2: 5,
        1: 1,
      },
    },

    {
      q: "Not …….. knows the answer to this question",
      options: ["Somebody", "Everybody", "Anybody", "Nobody"],
      points: {
        1: 5,
        2: 1,
      },
    },

    {
      q: "I started school ….. I was five years old.",
      options: ["About", "Since", "When", "That"],
      points: {
        2: 5,
        1: 1,
      },
    },

    {
      q: "Leo has his driving test tomorrow, so he's feeling ………",
      options: ["disappointed", "confused", "surprised", "stressed"],
      points: {
        3: 5,
        1: 1,
      },
    },

    {
      q: "Please can you …… the dishes",
      options: ["make", "help", "give", "do"],
      points: {
        3: 5,
        0: 1,
      },
    },

    {
      q: "I need to hurry or I'll be late …… work",
      options: ["for", "at", "in", "over"],
      points: {
        0: 5,
        1: 1,
      },
    },

    {
      q: "This city is ………. because of the traffic.",
      options: ["lively", "polluted", "crowded", "unspoiled"],
      points: {
        2: 5,
        1: 1,
      },
    },

    {
      q: "As soon as it ……. dark, she'll light a fire",
      options: ["would be", "will get", "will be", "gets"],
      points: {
        3: 5,
        2: 1,
      },
    },

    {
      q: "Turn the music down ! I won't …….. up with this noise anymore.",
      options: ["keep", "pick", "put", "set"],
      points: {
        2: 5,
        0: 1,
      },
    },

    {
      q: "Sita was ……. to leave the office when her boss called a meeting.",
      options: ["Soon after", "not long", "thinking", "about"],
      points: {
        3: 5,
        2: 1,
      },
    },

    {
      q: "The gallery's owner …… that Martina stole the painting.",
      options: ["claimed", "accused", "doubted", "admitted"],
      points: {
        0: 5,
        1: 1,
      },
    },

    {
      q: "There is so …… water left and I'm thirsty !",
      options: ["much", "little", "few", "any"],
      points: {
        1: 5,
        0: 1,
      },
    },

    {
      q: "I ….. remember meeting you years ago.",
      options: ["distinctly", "strongly", "closely", "highly"],
      points: {
        0: 5,
        1: 1,
      },
    },

    {
      q: "They'd rather you …….. the concept to David.",
      options: ["would explain", "will explain", "explained", "to explain"],
      points: {
        2: 5,
        3: 1,
      },
    },

    {
      q: "……….. before had a song reached the top of the charts so quickly.",
      options: ["Sometime", "Hardly", "Rarely", "Never"],
      points: {
        3: 5,
        2: 1,
        0: 1,
      },
    },

    {
      q: "Ahmed was so ……. in his book that he didn't hear the doorbell.",
      options: ["engrossed", "enthralled", "captivated", "concentrated"],
      points: {
        0: 5,
        2: 1,
      },
    },
  ];

