// 📄 src/types/TalentTree.ts
export interface TalentNode {
  id: string;
  name: string;
  description: string;
  icon?: string;
  level: number;
  maxLevel: number;
  parentId?: string;
  cost: number;
  requirements?: string[];
  children?: TalentNode[];
  unlocked?: boolean;
  effect: string;
}

export type TalentTree = TalentNode[];
