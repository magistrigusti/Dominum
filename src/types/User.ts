// types/users.ts
import { ArmyUnit } from './Army';
import { ResourceSub } from './Resource';

export interface UserReward {
  resources: ResourceSub;
  items: any[];
  exp: number;
}

export interface User {
  _id?: string;
  address: string;
  avatar: string;
  name: string;
  prestige: number;
  levelPrestige: number;
  prestigeProgress: number;
  technologies?: string | null;
  questShipRepaired: boolean;
  resources: ResourceSub;
  reward: UserReward;
  army: ArmyUnit[];
  heroes: string[];
  missions: string[];
  ships: string[];
  resourceNodes: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}