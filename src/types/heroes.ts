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
  itemId: string;
  name?: string;
  type?: string;
  bonuses?: HeroBonus;
}

export type HeroStatus = "idle" | 'in_mission' | 'wounded' | 'dead';

export interface Hero {
  _id: string;
  name: string;
  class: string;
  level: number;
  exp: number;
  skills?: string[];
  talentTree?: Record<string, any>;
  heroArmy: ArmyUnit[];
  prestige: number;
  avatar?: string;
  luck?: number;
  currentMission?: string;
  user?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  status: HeroStatus;
  isNFT?: boolean;
  nftTokenId?: string | null;
  bonuses?: HeroBonus;
  inventory?: HeroInventoryItem[];
}