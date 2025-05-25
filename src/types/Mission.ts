// 📄 src/types/Mission.ts

import { ArmyUnit } from './Army';
import { Hero } from './Hero';
import { ResourceSub } from './Resource';

export type MissionStatus = 'active' | 'completed' | 'cancelled';

export interface MissionReward {
  resources: ResourceSub;
  items: any[]; // Можно описать подробно, если будет структура предметов
  exp: number;
}

export interface MissionLog {
  // Любая структура лога (напр. событие, время, параметры)
  event: string;
  time: string;
  [key: string]: any;
}

export interface Mission {
  _id?: string;
  type: string; // Тип миссии (resource, battle, scout, delivery)
  hero: string | Hero;
  army: ArmyUnit[];
  resourceNode?: string;   // ObjectId точки
  user: string;
  startTime: string | Date;
  endTime: string | Date;
  status: MissionStatus;
  reward: MissionReward;
  missionProgress?: number;
  isCollectable?: boolean;
  logs?: MissionLog[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
