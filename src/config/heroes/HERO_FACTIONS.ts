// 📄 src/config/heroes/HERO_FACTIONS.ts

export type HeroFactionType = "numinor" | "dominion" | "allodians" | "pirate" | "neutral";

export interface HeroFactionConfig {
  label: string;
  icon: string;
  description: string;
  color: string;
}

export const HERO_FACTIONS: Record<HeroFactionType, HeroFactionConfig> = {
  numinor: {
    label: "numinor",
    icon: "",
    description: "",
    color: "",
  },
  dominion: {
    label: "dominion",
    icon: "",
    description: "",
    color: "",
  },
  allodians: {
    label: "Аллодианцы",
    icon: "/assets/factions/allodians.png",
    description: "Стражи астрала и традиций.",
    color: "#6b8fff",
  },
  pirate: {
    label: "",
    icon: "",
    description: "",
    color: "",
  },
  neutral: {
    label: "",
    icon: "",
    description: "",
    color: "",
  },
};
