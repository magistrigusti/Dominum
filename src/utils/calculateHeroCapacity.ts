// 📄 src/utils/calculateHeroCapacity.ts

export type HeroRarity = 'normal' | 'good' | 'rare' | 'epic' | 'legendary';

const BASE_CAPACITY = 1000;

const RARITY_MULTYPLIERS: Record<HeroRarity, number> = {
  normal: 1,
  good: 1.5,
  rare: 2,
  epic: 2.5,
  legendary: 3,
};

export function calculateHeroCapacity(level: number, rarity: HeroRarity): number {
  return BASE_CAPACITY * level * RARITY_MULTYPLIERS[rarity];
}