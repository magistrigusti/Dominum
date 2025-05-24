// 📄 src/types/Skill.ts
import { UnitEffect } from './Effect'; // или './Item', если он там

export interface Skill {
  skillId: string;            // Уникальный id скилла
  name: string;               // Имя скилла
  description?: string;       // Описание
  level: number;              // Уровень прокачки
  cooldown?: number;          // Кулдаун
  manaCost?: number;          // Стоимость в мане
  effects?: UnitEffect[];     // Какие эффекты накладывает скилл
  // Можно добавить: icon, type (passive/active), и пр.
}
