// 📄 src/types/AstralMap.ts
import { AstralIsland } from "./AstralIsland";

export interface AstralMap {
  _id?: string;
  name: string;
  islands: AstralIsland[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}