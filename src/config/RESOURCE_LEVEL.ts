// 📄 src/config/RESOURCE_LEVEL.ts

import type { ResourceType } from "./RESOURCE_CONFIG";

interface ResourceLevelConfig {
  totalAmount: number;
  miningSpeed: number; // сколько добывается в минуту
  restoreTime: number; // время до восстановления (в секундах)
}

export const RESOURCE_LEVEL: Record<ResourceType, ResourceLevelConfig[]> = {
  food: [
    { totalAmount: 200, miningSpeed: 20, restoreTime: 300 }, // level 1
    { totalAmount: 400, miningSpeed: 30, restoreTime: 250 }, // level 2
    // ...
  ],
  wood: [
    { totalAmount: 200, miningSpeed: 20, restoreTime: 300 },
    // ...
  ],
  stone: [
    { totalAmount: 100, miningSpeed: 12, restoreTime: 320 },
    // ...
  ],
  iron: [
    { totalAmount: 80, miningSpeed: 9, restoreTime: 350 },
    // ...
  ],
  gold: [
    { totalAmount: 20, miningSpeed: 2, restoreTime: 700 },
    // ...
  ],
  doubloon: [
    { totalAmount: 10, miningSpeed: 1, restoreTime: 900 },
    // ...
  ],
  pearl: [
    { totalAmount: 5, miningSpeed: 0.5, restoreTime: 1200 },
    // ...
  ],
  astral_crystal: [
    { totalAmount: 1, miningSpeed: 0.1, restoreTime: 1800 },
  ],
  allodium: [
    { totalAmount: 0.1, miningSpeed: 0.01, restoreTime: 3600 },
    // ...
  ]
};
