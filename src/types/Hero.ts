// 📄 src/types/Hero.ts
import { ArmyUnit } from './Army';
import { Item } from './Item';
import { Skill } from './Skill';
import { TalentTree } from './TalentTree';

export interface HeroBonus {
  attack?: number;
  defense?: number;
  armor?: number;
  hp?: number;
  capacity?: number;
  speed?: number;
}

export type HeroStatus = 'idle' | 'in_mission' | 'wounded' | 'dead';

export interface Hero {
  _id?: string;
  name: string;
  class: string;
  level: number;
  exp: number;
  skills?: Skill[];
  talentTree?: TalentTree;
  heroArmy: ArmyUnit[];
  prestige: number;
  avatar?: string;
  luck?: number;
  currentMission?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  status: HeroStatus;
  isNFT?: boolean;
  nftTokenId?: string | null;
  bonuses?: HeroBonus;
  inventory?: Item[];
}