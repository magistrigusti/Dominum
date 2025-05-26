// 📄 src/types/AstralMap.ts

export interface AstralIsland {
  id: String;
  x: number;
  y: number;
  type: 'standard' | 'special' | 'pirate' | 'event' | 'starter' | "wild" | "faction" | "market" ;
  owner?: string;
  resourceNodes: string[];
}

export type AstralMap = AstralIsland[];