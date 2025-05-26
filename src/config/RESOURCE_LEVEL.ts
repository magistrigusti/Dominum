// 📄 src/config/RESOURCE_LEVEL.ts

import type { ResourceType } from "./RESOURCE_CONFIG";

interface ResourceLevelConfig {
  totalAmount: number;
  miningSpeed: number; // сколько добывается в минуту
  restoreTime: number; // время до восстановления (в секундах)
}

function genLevels(
  base: number,
  baseMining: number,
  baseRestore: number,
  levels = 7,
  kAmount = 1.3,
  kMining = 1.2,
  kRestore = 0.9
): ResourceLevelConfig[] {
  const arr: ResourceLevelConfig[] = [];
  let amount = base;
  let mining = baseMining;
  let restore = baseRestore;
  for (let i = 0; i < levels; i++) {
    arr.push({
      totalAmount: Math.round(amount),
      miningSpeed: +mining.toFixed(3),
      restoreTime: Math.round(restore),
    });
    amount *= kAmount;
    mining *= kMining;
    restore = Math.max(1 * 24 * 3600, restore * kRestore); // минимум 1 день
  }
  return arr;
}

export const RESOURCE_LEVEL: Record<ResourceType, ResourceLevelConfig[]> = {
  food: genLevels(100_000, 5, 3 * 24 * 3600),
  wood: genLevels(70_000, 4, 5 * 24 * 3600),
  stone: genLevels(40_000, 3, 7 * 24 * 3600),
  iron: genLevels(20_000, 2, 10 * 24 * 3600),
  gold: genLevels(1_000, 1, 15 * 24 * 3600),
  doubloon: genLevels(500, 0.5, 1 * 24 * 3600),
  pearl: genLevels(100, 0.1, 30 * 24 * 3600),
  astral_crystal: genLevels(1, 0.01, 1 * 24 * 3600),
  allodium: genLevels(0.1, 0.001, 1 * 24 * 3600)
};
