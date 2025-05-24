// 📄 src/types/Item.ts
import { HeroBonus } from './Hero';
import { UnitEffect } from './Effect';

export interface Item {
  itemId: string;
  name?: string;
  type?: string;
  bonuses?: HeroBonus;
  effects?: UnitEffect[];
  duration?: number;
}
