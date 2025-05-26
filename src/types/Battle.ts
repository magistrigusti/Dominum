// 📄 src/types/Battle.ts

import { ArmyUnit } from "./Army";

export interface BattleLogEntry {
  turn: number;
  action: string;
  details: any;
}

export interface Battle {
  _id?: string;
  participants: string[]; // User IDs
  heroes: string[];       // Hero IDs
  armies: ArmyUnit[][];
  log: BattleLogEntry[];
  result?: string;        // Победитель или результат
  startedAt?: string | Date;
  finishedAt?: string | Date;
}
