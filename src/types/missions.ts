// 📄 src/types/missions.ts
import type { ArmyUnitType } from '@/config/armyCapacity';

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
  army: Record<ArmyUnitType, number>;
  armyCount: number;
  nodeId: string;
  resource: string;
  duration: number;
  startTime: number;
}
