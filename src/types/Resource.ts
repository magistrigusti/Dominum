// 📄 src/types/Resource.ts

export interface ResourceSub {
  food: number;
  wood: number;
  stone: number;
  iron: number;
  gold: number;
  doubloon: number;
  pearl: number;
  astral_crystal: number;
  allodium: number;
}

export type ResourceQuality = 'common' | 'rare' | 'epic';

export interface ResourceNodePosition {
  x: number;
  y: number;
}

export interface ResourceNode {
  _id?: string;
  resource: string;                  // Тип ресурса (food, wood, astral_crystal и т.д.)
  level: number;                     // Уровень точки
  position: ResourceNodePosition;    // Координаты
  totalAmount: number;               // Максимальный запас
  currentAmount: number;             // Текущий запас
  isDepleted: boolean;               // Истощена ли точка
  quality: ResourceQuality;
  avatar?: string;
  cooldownEnd?: string | Date;       // Когда закончится откат (если есть)
  bonusMultiplier?: number;
  islandType?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  // Дополнительные поля для авто-восстановления:
  activeMission?: string;            // ID миссии, если есть
  activeHero?: string;               // ID героя, если сейчас кто-то добывает
  lastMiningTime?: number;           // ms: когда последний раз добывали (для autoRestore)
  autoRestore?: boolean;             // Можно ли авто-восстановить (true для обычных ресурсов, false для кристаллов)
  restoreSpeed?: number;             // Сколько единиц восстанавливается за час/минуту
}
