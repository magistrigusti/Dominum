// 📄 src/types/Item.ts
import { UnitEffect } from './Effect'; // или './Item', если он там
import { HeroBonus } from './Hero';

export interface Item {
  itemId: string;             // Уникальный id предмета
  name?: string;              // Название предмета
  type?: string;              // weapon, armor, artifact, consumable и др.
  bonuses?: HeroBonus;        // Бонусы от предмета (универсально)
  effects?: UnitEffect[];     // Активные эффекты на предмете (если есть)
  duration?: number;          // Время действия (если временный предмет/бафф)
  // Можно расширять: усиления, модификаторы, уровень предмета, редкость, expiry и т.д.
}

