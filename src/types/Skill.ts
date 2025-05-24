// 📄 src/types/Skill.ts
import { UnitEffect } from './Effect';

export interface Skill {
  skillId: string;
  name: string;
  description?: string;
  level: number;
  cooldown?: number;
  manaCost?: number;
  effects?: UnitEffect[];
}
