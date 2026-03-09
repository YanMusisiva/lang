export type Lang = "fr" | "en";

export interface BilingualText {
  fr: string;
  en: string;
}

export interface Testimonial {
  initials: string;
  quote: BilingualText;
  name: string;
  role: BilingualText;
}

export interface Plan {
  name: BilingualText;
  price: BilingualText;
  desc: BilingualText;
  features: BilingualText[];
  featured?: boolean;
  tag?: BilingualText;
}

export interface BulletCard {
  num: string;
  title: BilingualText;
  desc: BilingualText;
}
