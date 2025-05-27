// 📄 src/config/BUILDING_CONFIG.ts
export interface BuildingConfig {
  name: string;
  description: string;
  cost: Record<string, number>;
  constructionTime: number; // в секундах
  bonuses?: Record<string, number>;
  maxLevel: number;
}

export const BUILDING_CONFIG: Record<string, BuildingConfig> = {
  castle: {
    name: "Замок",
    description: "Основное здание. Открывает доступ к армии и героям.",
    cost: { wood: 1000, stone: 800, gold: 100 },
    constructionTime: 6 * 3600,
    bonuses: { prestige: 10 },
    maxLevel: 10,
  },
  barracks: {
    name: "Казарма",
    description: "Позволяет нанимать пехоту.",
    cost: { wood: 500, stone: 300 },
    constructionTime: 3 * 3600,
    bonuses: { recruitSpeed: 10 },
    maxLevel: 5,
  },
  // ... остальные здания
};
