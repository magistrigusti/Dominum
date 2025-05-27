// 📄 src/types/Island.ts
export type IslandType = 'standard' | 'special' | 'pirate' | 'event' | 'starter' | "wild" | "faction" | "market"  | "fortress";

export interface AstralIsland {
  islandId: string;  
  _id?: string;
  name: string;
  x: number;
  y: number;
  type: IslandType;
  owner?: string;
  resourceNodes: string[];
  avatar?: string;
  background?: string;
  isCapturable?: boolean;
  canTrade?: boolean;
  canHire?: boolean;
  pvpZone?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  description?: string;
}