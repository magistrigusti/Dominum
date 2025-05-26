// 📄 src/config/heroes/HEROES_DB.ts

import { HeroClassType, HeroRaceType, HeroQuality, HeroFactionType } from "./HERO_CLASSES";

export interface HeroDBEntry {
  id: string;
  name: string;
  class: HeroClassType;
  race: HeroRaceType;
  quality: HeroQuality;
  faction: HeroFactionType;
  avatar: string;
  baseStats: { [key: string]: number };
  skills: string[];
}

export const HEROES_DB: HeroDBEntry[] = [
  {
    id: "hero_001",
    name: "Герой тестовый",
    class: "warrior",
    race: "human",
    quality: "normal",
    faction: "allodians",
    avatar: "/assets/heroes/hero001.png",
    baseStats: { attack: 2, defense: 2, hp: 20, capacity: 5, speed: 2 },
    skills: ["toughness"],
  },
  // ... другие герои
];
