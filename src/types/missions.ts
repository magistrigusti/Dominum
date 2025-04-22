// 📄 src/types/missions.ts

export interface Mission {
  heroId: string;
  hero: {
    id: string;
    name: string;
    image: string;
    quality: 'normal' | 'good' | 'rare' | 'epic' | 'legendary';
    level: number;
    exp: number;
    expToNext: number;
  };

  heroArmy: {
    peasant?: { level: number; count: number };
    sailor?: { level: number; count: number };
    axeman?: { level: number; count: number };
    spearman?: { level: number; count: number };
    archer?: { level: number; count: number };
    cavalry?: { level: number; count: number };
  };
  
  
  armyCount: number;
  nodeId: string;
  resource: string;
  duration: number;
  startTime: number;
}
