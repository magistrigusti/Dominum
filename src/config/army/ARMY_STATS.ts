// 📄 src/config/ARMY_STATS.ts

import type { ArmyUnitType } from "./ARMY_CONFIG";

interface ArmyUnitStats {
  attack: number;
  defense: number;
  armor: number;
  hp: number;
  capacity: number;
  speed: number;
}

export const ARMY_STATS: Record<ArmyUnitType, ArmyUnitStats[]> = {
  peasant: [
     { attack: 1, defense: 0, armor: 0, hp: 10, capacity: 8, speed: 2 },
     { attack: 2, defense: 1, armor: 0, hp: 11, capacity: 10, speed: 2 },
     { attack: 3, defense: 2, armor: 0, hp: 12, capacity: 12, speed: 2 },
     { attack: 4, defense: 3, armor: 0, hp: 13, capacity: 14, speed: 2 },
     { attack: 5, defense: 4, armor: 1, hp: 14, capacity: 16, speed: 2 },
     { attack: 6, defense: 5, armor: 1, hp: 15, capacity: 18, speed: 2 },
     { attack: 7, defense: 6, armor: 1, hp: 16, capacity: 21, speed: 2 },
     { attack: 8, defense: 7, armor: 2, hp: 18, capacity: 24, speed: 2 },
     { attack: 9, defense: 8, armor: 2, hp: 20, capacity: 27, speed: 2 },
     { attack: 10, defense: 9, armor: 3, hp: 22, capacity: 30, speed: 2 },
  ],
  sailor: [
     { attack: 3, defense: 1, armor: 0, hp: 12, capacity: 5, speed: 2 },
     { attack: 4, defense: 2, armor: 0, hp: 13, capacity: 6, speed: 2 },
     { attack: 5, defense: 3, armor: 0, hp: 14, capacity: 7, speed: 2 },
     { attack: 6, defense: 4, armor: 1, hp: 16, capacity: 8, speed: 2 },
     { attack: 7, defense: 5, armor: 1, hp: 18, capacity: 9, speed: 2 },
     { attack: 9, defense: 6, armor: 2, hp: 20, capacity: 10, speed: 2 },
     { attack: 10, defense: 7, armor: 2, hp: 24, capacity: 11, speed: 2 },
     { attack: 12, defense: 8, armor: 3, hp: 28, capacity: 12, speed: 2 },
     { attack: 14, defense: 10, armor: 3, hp: 30, capacity: 14, speed: 2 },
     { attack: 16, defense: 12, armor: 4, hp: 35, capacity: 16, speed: 2 },
  ],
  axeman: [
     { attack: 2, defense: 3, armor: 1, hp: 16, capacity: 2, speed: 2 },
     { attack: 3, defense: 4, armor: 2, hp: 18, capacity: 3, speed: 2 },
     { attack: 4, defense: 6, armor: 3, hp: 20, capacity: 4, speed: 2 },
     { attack: 5, defense: 8, armor: 4, hp: 22, capacity: 5, speed: 2 },
     { attack: 6, defense: 10, armor: 5, hp: 24, capacity: 6, speed: 2 },
     { attack: 7, defense: 12, armor: 6, hp: 26, capacity: 7, speed: 2 },
     { attack: 8, defense: 15, armor: 7, hp: 28, capacity: 8, speed: 2 },
     { attack: 9, defense: 18, armor: 8, hp: 30, capacity: 9, speed: 2 },
     { attack: 10, defense: 22, armor: 9, hp: 35, capacity: 10, speed: 2 },
     { attack: 12, defense: 26, armor: 10, hp: 40, capacity: 12, speed: 2 },
  ],
  spearman: [
     { attack: 2, defense: 4, armor: 1, hp: 14, capacity: 3, speed: 2 },
     { attack: 3, defense: 6, armor: 1, hp: 18, capacity: 4, speed: 2 },
     { attack: 4, defense: 8, armor: 2, hp: 20, capacity: 5, speed: 2 },
     { attack: 5, defense: 10, armor: 3, hp: 22, capacity: 6, speed: 2 },
     { attack: 6, defense: 12, armor: 3, hp: 24, capacity: 7, speed: 2 },
     { attack: 7, defense: 14, armor: 4, hp: 26, capacity: 8, speed: 2 },
     { attack: 8, defense: 16, armor: 5, hp: 28, capacity: 9, speed: 2 },
     { attack: 9, defense: 20, armor: 6, hp: 30, capacity: 10, speed: 2 },
     { attack: 10, defense: 24, armor: 7, hp: 32, capacity: 12, speed: 2 },
     { attack: 11, defense: 30, armor: 8, hp: 35, capacity: 14, speed: 2 },
  ],
  archer: [
     { attack: 4, defense: 2, armor: 0, hp: 10, capacity: 4, speed: 2 },
     { attack: 6, defense: 3, armor: 0, hp: 12, capacity: 5, speed: 2 },
     { attack: 8, defense: 4, armor: 1, hp: 14, capacity: 6, speed: 2 },
     { attack: 10, defense: 5, armor: 1, hp: 16, capacity: 7, speed: 2 },
     { attack: 12, defense: 6, armor: 1, hp: 18, capacity: 8, speed: 2 },
     { attack: 14, defense: 7, armor: 2, hp: 20, capacity: 9, speed: 2 },
     { attack: 16, defense: 8, armor: 2, hp: 22, capacity: 10, speed: 2 },
     { attack: 18, defense: 10, armor: 3, hp: 24, capacity: 12, speed: 2 },
     { attack: 20, defense: 12, armor: 3, hp: 26, capacity: 14, speed: 2 },
     { attack: 22, defense: 14, armor: 4, hp: 30, capacity: 16, speed: 2 },
  ],
  cavalry: [
     { attack: 2, defense: 2, armor: 0, hp: 20, capacity: 6, speed: 2 },
     { attack: 4, defense: 4, armor: 1, hp: 22, capacity: 7, speed: 2 },
     { attack: 6, defense: 6, armor: 2, hp: 24, capacity: 8, speed: 2 },
     { attack: 8, defense: 8, armor: 2, hp: 26, capacity: 9, speed: 2 },
     { attack: 10, defense: 10, armor: 3, hp: 28, capacity: 10, speed: 2 },
     { attack: 12, defense: 12, armor: 3, hp: 30, capacity: 12, speed: 2 },
     { attack: 14, defense: 14, armor: 4, hp: 32, capacity: 14, speed: 2 },
     { attack: 16, defense: 16, armor: 5, hp: 34, capacity: 16, speed: 2 },
     { attack: 18, defense: 18, armor: 6, hp: 36, capacity: 18, speed: 2 },
     { attack: 20, defense: 20, armor: 7, hp: 40, capacity: 20, speed: 2 },
  ],
};
