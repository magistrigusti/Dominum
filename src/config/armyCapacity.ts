// 📁 src/config/armyCapacity.ts

export type ArmyUnitType = 'peasant' | 'sailor' | 'axeman' | 'spearman' | 'archer' | 'cavalry' ;

export interface ArmyStats {
  attack: number;
  defense: number;
  armor: number;
  hp: number;
  capacity: number
}

export type ArmyStatsTable = {
  [level: number]: ArmyStats;
}


export const ARMY_STATS: Record<ArmyUnitType, ArmyStatsTable> = {
  peasant: {
    1: { attack: 1, defense: 0, armor: 0, hp: 10, capacity: 8 },
    2: { attack: 2, defense: 1, armor: 0, hp: 11, capacity: 10 },
    3: { attack: 3, defense: 2, armor: 0, hp: 12, capacity: 12 },
    4: { attack: 4, defense: 3, armor: 0, hp: 13, capacity: 14 },
    5: { attack: 5, defense: 4, armor: 1, hp: 14, capacity: 16 },
    6: { attack: 6, defense: 5, armor: 1, hp: 15, capacity: 18 },
    7: { attack: 7, defense: 6, armor: 1, hp: 16, capacity: 21 },
    8: { attack: 8, defense: 7, armor: 2, hp: 18, capacity: 24 },
    9: { attack: 9, defense: 8, armor: 2, hp: 20, capacity: 27 },
    10: { attack: 10, defense: 9, armor: 3, hp: 22, capacity: 30 },
  },
  sailor: {
    1: { attack: 3, defense: 1, armor: 0, hp: 12, capacity: 5 },
    2: { attack: 4, defense: 2, armor: 0, hp: 13, capacity: 6 },
    3: { attack: 5, defense: 3, armor: 0, hp: 14, capacity: 7 },
    4: { attack: 6, defense: 4, armor: 1, hp: 16, capacity: 8 },
    5: { attack: 7, defense: 5, armor: 1, hp: 18, capacity: 9 },
    6: { attack: 9, defense: 6, armor: 2, hp: 20, capacity: 10 },
    7: { attack: 10, defense: 7, armor: 2, hp: 24, capacity: 11 },
    8: { attack: 12, defense: 8, armor: 3, hp: 28, capacity: 12 },
    9: { attack: 14, defense: 10, armor: 3, hp: 30, capacity: 14 },
    10: { attack: 16, defense: 12, armor: 4, hp: 35, capacity: 16 },
  },
  axeman: {
    1: { attack: 2, defense: 3, armor: 1, hp: 16, capacity: 2 },
    2: { attack: 3, defense: 4, armor: 2, hp: 18, capacity: 3 },
    3: { attack: 4, defense: 6, armor: 3, hp: 20, capacity: 4 },
    4: { attack: 5, defense: 8, armor: 4, hp: 22, capacity: 5 },
    5: { attack: 6, defense: 10, armor: 5, hp: 24, capacity: 6 },
    6: { attack: 7, defense: 12, armor: 6, hp: 26, capacity: 7 },
    7: { attack: 8, defense: 15, armor: 7, hp: 28, capacity: 8 },
    8: { attack: 9, defense: 18, armor: 8, hp: 30, capacity: 9 },
    9: { attack: 10, defense: 22, armor: 9, hp: 35, capacity: 10 },
    10: { attack: 12, defense: 26, armor: 10, hp: 40, capacity: 12 },
  },
  spearman: {
    1: { attack: 2, defense: 4, armor: 1, hp: 14, capacity: 3 },
    2: { attack: 3, defense: 6, armor: 1, hp: 18, capacity: 4 },
    3: { attack: 4, defense: 8, armor: 2, hp: 20, capacity: 5 },
    4: { attack: 5, defense: 10, armor: 3, hp: 22, capacity: 6 },
    5: { attack: 6, defense: 12, armor: 3, hp: 24, capacity: 7 },
    6: { attack: 7, defense: 14, armor: 4, hp: 26, capacity: 8 },
    7: { attack: 8, defense: 16, armor: 5, hp: 28, capacity: 9 },
    8: { attack: 9, defense: 20, armor: 6, hp: 30, capacity: 10 },
    9: { attack: 10, defense: 24, armor: 7, hp: 32, capacity: 12 },
    10: { attack: 11, defense: 30, armor: 8, hp: 35, capacity: 14 },
  },
  archer: {
    1: { attack: 4, defense: 2, armor: 0, hp: 10, capacity: 4 },
    2: { attack: 6, defense: 3, armor: 0, hp: 12, capacity: 5 },
    3: { attack: 8, defense: 4, armor: 1, hp: 14, capacity: 6 },
    4: { attack: 10, defense: 5, armor: 1, hp: 16, capacity: 7 },
    5: { attack: 12, defense: 6, armor: 1, hp: 18, capacity: 8 },
    6: { attack: 14, defense: 7, armor: 2, hp: 20, capacity: 9 },
    7: { attack: 16, defense: 8, armor: 2, hp: 22, capacity: 10 },
    8: { attack: 18, defense: 10, armor: 3, hp: 24, capacity: 12 },
    9: { attack: 20, defense: 12, armor: 3, hp: 26, capacity: 14 },
    10: { attack: 22, defense: 14, armor: 4, hp: 30, capacity: 16 },
  },
  cavalry: {
    1: { attack: 2, defense: 2, armor: 0, hp: 20, capacity: 6 },
    2: { attack: 4, defense: 4, armor: 1, hp: 22, capacity: 7 },
    3: { attack: 6, defense: 6, armor: 2, hp: 24, capacity: 8 },
    4: { attack: 8, defense: 8, armor: 2, hp: 26, capacity: 9 },
    5: { attack: 10, defense: 10, armor: 3, hp: 28, capacity: 10 },
    6: { attack: 12, defense: 12, armor: 3, hp: 30, capacity: 12 },
    7: { attack: 14, defense: 14, armor: 4, hp: 32, capacity: 14 },
    8: { attack: 16, defense: 16, armor: 5, hp: 34, capacity: 16 },
    9: { attack: 18, defense: 18, armor: 6, hp: 36, capacity: 18 },
    10: { attack: 20, defense: 20, armor: 7, hp: 40, capacity: 20 },
  },
};