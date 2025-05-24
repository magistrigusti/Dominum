// 📄 src/types/TalentTree.ts

// Если у тебя появится строгая структура дерева — тут её и опишешь, пока можно так:
export type TalentTree = Record<string, any>;
// Пример строгой структуры:
// export interface TalentNode { id: string; level: number; maxLevel: number; children?: TalentNode[] }
// export type TalentTree = TalentNode[];
