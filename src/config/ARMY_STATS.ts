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
    { attack: 2, defense: 1, armor: 0, hp: 10, capacity: 20, speed: 8 }, // level 1
    { attack: 3, defense: 1, armor: 0, hp: 11, capacity: 23, speed: 8 },
    // ...до нужного максимума (например, 10 уровней)
  ],
  sailor: [
    { attack: 3, defense: 2, armor: 1, hp: 12, capacity: 15, speed: 9 },
    { attack: 4, defense: 2, armor: 1, hp: 13, capacity: 17, speed: 9 },
    // ...
  ],
  axeman: [
    { attack: 8, defense: 3, armor: 2, hp: 22, capacity: 5, speed: 7 },
    // ...
  ],
  spearman: [
    { attack: 6, defense: 4, armor: 3, hp: 18, capacity: 6, speed: 7 },
    // ...
  ],
  archer: [
    { attack: 7, defense: 2, armor: 1, hp: 14, capacity: 3, speed: 8 },
    // ...
  ],
  cavalry: [
    { attack: 10, defense: 4, armor: 2, hp: 24, capacity: 8, speed: 10 },
    // ...
  ]
};
