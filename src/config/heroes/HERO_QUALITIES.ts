// 📄 src/config/heroes/HERO_QUALITIES.ts

export type HeroQuality = "normal" | "good" | "rare" | "epic" | "legendary" | "mythic";

export interface HeroQualityConfig {
  color: string;
  mainStats: number;
  classStats: number;
  maxTroops: number;
  maxLevel: number;
  expToLevel: number;
  slotCount: number;
  cardReward: number;
  prestigePerLevel: number;
  prestigeOnUpgrade: number;
}

export const HERO_QUALITIES: Record<HeroQuality, HeroQualityConfig> = {
  normal:    { color: "#bdbdbd", mainStats: 2, classStats: 1, maxTroops: 1000, maxLevel: 50, expToLevel: 1000, slotCount: 1, cardReward: 5, prestigePerLevel: 25, prestigeOnUpgrade: 100 },
  good:      { color: "#6fcf97", mainStats: 3, classStats: 2, maxTroops: 1500, maxLevel: 60, expToLevel: 1500, slotCount: 2, cardReward: 10, prestigePerLevel: 50, prestigeOnUpgrade: 250 },
  rare:      { color: "#56ccf2", mainStats: 4, classStats: 3, maxTroops: 2000, maxLevel: 70, expToLevel: 2000, slotCount: 3, cardReward: 15, prestigePerLevel: 50, prestigeOnUpgrade: 500 },
  epic:      { color: "#bb6bd9", mainStats: 5, classStats: 3, maxTroops: 2500, maxLevel: 80, expToLevel: 2500, slotCount: 3, cardReward: 20, prestigePerLevel: 100, prestigeOnUpgrade: 750 },
  legendary: { color: "#f2c94c", mainStats: 6, classStats: 4, maxTroops: 3000, maxLevel: 90, expToLevel: 3000, slotCount: 4, cardReward: 30, prestigePerLevel: 150, prestigeOnUpgrade: 1000 },
  mythic:    { color: "#ff004c", mainStats: 7, classStats: 4, maxTroops: 4000, maxLevel: 100, expToLevel: 5000, slotCount: 5, cardReward: 50, prestigePerLevel: 200, prestigeOnUpgrade: 2000 },
};
