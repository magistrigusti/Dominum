// 📄 src/types/AstralMap.ts

export interface AstralIsland {
  id: String;
  name: string;
  x: number;
  y: number;
  type: 'standard' | 'special' | 'pirate' | 'event' | 'starter' | "wild" | "faction" | "market" ;
  owner?: string;
  resourceNodes: string[];
  availableActions?: string[]; // типы действий на острове
  avatar?: string;
}

export interface AstralMap {
  _id?: string;
  name: string;
  islands: AstralIsland[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}