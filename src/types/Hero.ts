// 📄 src/types/Hero.ts
import { ArmyUnit } from './Army';
import { Item } from './Item';
import { Skill } from './Skill';
import { TalentTree } from './TalentTree';
import { HeroQuality } from "@/config/heroes/HERO_QUALITIES";

export type HeroStatus = 'idle' | 'in_mission' | 'wounded' | 'dead';

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

export interface Hero {
  _id?: string;
  name: string;
  class: string;
  race?: string;
  quality: HeroQuality;
  level: number;
  exp: number;
  heroArmy: ArmyUnit[];
  prestige: number;
  avatar?: string;
  skills?: string[];
  talentTree?: Record<string, any>;
  currentMission?: string;
  user?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  status: HeroStatus;
  isNFT?: boolean;
  nftTokenId?: string | null;
  bonuses?: HeroBonus;
  inventory?: HeroInventoryItem[];
}