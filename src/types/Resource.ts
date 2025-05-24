// 📄 src/types/Resource.ts

export interface ResourceSub {
  food: number;
  wood: number;
  stone: number;
  iron: number;
  gold: number;
  doubloon: number;
  pearl: number;
  allodium: number;
}

// Ресурсная точка (ResourceNode)
export type ResourceQuality = 'common' | 'rare' | 'epic';

export interface ResourceNodePosition {
  x: number;
  y: number;
}

export interface ResourceNode {
  _id?: string;
  resource: string;
  level: number;
  position: ResourceNodePosition;
  totalAmount: number;
  currentAmount: number;
  isDepleted: boolean;
  activeMission?: string; // ObjectId миссии
  activeHero?: string;    // ObjectId героя
  avatar?: string;
  quality: ResourceQuality;
  cooldownEnd?: string | Date;
  bonusMultiplier?: number;
  islandType?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
