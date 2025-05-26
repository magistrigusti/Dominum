// 📄 src/config/heroes/HERO_RACES.ts

export type HeroRaceType = "human" | "elf" | "orc" | "dwarf" | "undead" | "demon";

export interface HeroRaceConfig {
  label: string;
  icon: string;
  description: string;
  bonuses?: { [key: string]: number }; // бонусы к статам
}

export const HERO_RACES: Record<HeroRaceType, HeroRaceConfig> = {
  human: {
    label: "Человек",
    icon: "/assets/races/human.png",
    description: "Сбалансированная раса, без явных слабых мест.",
  },
  elf: {
    label: "Эльф",
    icon: "/assets/races/elf.png",
    description: "Быстрые и ловкие, получают бонус к скорости и ловкости.",
    bonuses: { speed: 1, agility: 2 },
  },
  orc: {
    label: "",
    icon: "",
    description: "Сбалансированная раса, без явных слабых мест.",
  },
  dwarf: {
    label: "",
    icon: "",
    description: "Быстрые и ловкие, получают бонус к скорости и ловкости.",
    bonuses: { speed: 1, agility: 2 },
  },
  undead: {
    label: "",
    icon: "",
    description: "Сбалансированная раса, без явных слабых мест.",
  },
  demon: {
    label: "",
    icon: "",
    description: "Быстрые и ловкие, получают бонус к скорости и ловкости.",
    bonuses: { speed: 1, agility: 2 },
  },
};
