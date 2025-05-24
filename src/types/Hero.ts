// 📄 src/types/Hero.ts

import { ArmyUnit } from './Army';

export interface HeroBonus {
  attack?: number;
  defense?: number;
  armor?: number;
  hp?: number;
  capacity?: number;
  speed?: number;
}

export interface HeroInventoryItem {
  itemId: string; // ID вещи (связь с базой)
  name?: string;
  type?: string;  // weapon, armor, artifact и т.д.
  bonuses?: HeroBonus; // Бонусы от предмета
  // Можно добавить ещё эффекты, срок действия и т.д.
}

export type HeroStatus = 'idle' | 'in_mission' | 'wounded' | 'dead';

export interface Hero {
  _id?: string;
  name: string;
  class: string;
  level: number;
  exp: number;
  skills?: string[]; // Массив айдишников или имён навыков
  talentTree?: Record<string, any>; // Объект дерева талантов
  heroArmy: ArmyUnit[];  // Армия при герое
  prestige: number;
  avatar?: string;
  luck?: number;
  currentMission?: string; // ObjectId миссии
  user?: string;           // ObjectId пользователя
  createdAt?: string | Date;
  updatedAt?: string | Date;
  status: HeroStatus;
  isNFT?: boolean;
  nftTokenId?: string | null;
  bonuses?: HeroBonus;     // Суммарные бонусы героя
  inventory?: HeroInventoryItem[];
}
