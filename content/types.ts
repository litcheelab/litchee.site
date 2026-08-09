export type SectionKey = "learners" | "educators" | "public" | "research" | "about";

export type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  metric?: { value: string; label: string }[];
  action?: string;
};

export type Section = {
  key: SectionKey;
  index: string;
  title: string;
  label: string;
  intro: string;
  x: number;
  y: number;
  href: string;
  slides: Slide[];
};
