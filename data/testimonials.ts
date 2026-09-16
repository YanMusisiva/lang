import type { BilingualText, Testimonial } from "@/types";

export interface StudentStory extends Testimonial {
  id: string;
  /** Local path under public/, e.g. /testimonials/milka.jpg. */
  photo?: string;
  photoPosition?: string;
}

export interface StoryPhoto {
  id: string;
  src: string;
  caption: BilingualText;
}

export interface StoryVideo {
  id: string;
  youtubeUrl: string;
  title: BilingualText;
  description: BilingualText;
}

// Existing testimonials. Add the matching portrait with the optional photo field.
export const TESTIMONIALS: StudentStory[] = [
  {
    id: "milka",
    initials: "M",
    name: "Milka",
    role: { fr: "Étudiante", en: "Student" },
    quote: {
      fr: "Les audios que vous envoyez sont essentiels pour nous, ils font toute la différence dans notre apprentissage.",
      en: "The audios you send are crucial for us, they make all the difference in our learning.",
    },
  },
  {
    id: "francis",
    initials: "F",
    name: "Francis",
    role: { fr: "Voyageur", en: "Traveler" },
    quote: {
      fr: "J’adore votre méthode d’apprentissage ! Elle m’aide vraiment à parler anglais avec confiance.",
      en: "I love your learning method! It truly helps me speak English with confidence.",
    },
  },
  {
    id: "ali",
    initials: "A",
    name: "Ali",
    role: { fr: "Enseignant", en: "Teacher" },
    quote: {
      fr: "Les audios sont vraiment cools et rendent l’apprentissage super agréable !",
      en: "The audios are really cool and make learning super fun!",
    },
  },
];

// Add photos and YouTube links here. Empty collections are hidden on the page.
// See public/testimonials/README.md for complete examples.
export const TESTIMONIAL_PHOTOS: StoryPhoto[] = [];
export const TESTIMONIAL_VIDEOS: StoryVideo[] = [];
