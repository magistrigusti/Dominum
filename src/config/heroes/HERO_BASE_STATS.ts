// 📄 src/config/heroes/HERO_BASE_STATS.ts

import { HeroClassType, HeroQuality } from "./HERO_CLASSES";

export interface HeroBaseStats {
  attack: number;
  defense: number;
  hp: number;
  capacity: number;
  speed: number;
  [key: string]: number;
}

export const HERO_BASE_STATS: Record<HeroClassType, Record<HeroQuality, HeroBaseStats[]>> = {
  warrior: {
    normal: [
      { attack: 2, defense: 2, hp: 20, capacity: 5, speed: 2 }, // lvl 1
      // ... lvl 2, 3, ...
    ],
    good: [
      { attack: 3, defense: 2, hp: 23, capacity: 6, speed: 2 },
      // ...
    ],
    // ... другие качества
  },
  // ... другие классы
};
