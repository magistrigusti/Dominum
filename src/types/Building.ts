// 📄 src/types/Building.ts

export type BuildingStatus = "active" | "under_construction" | "destroyed";

export interface Building {
  _id?: string;
  user: string; // ObjectId пользователя
  type: string;
  level: number;
  status: BuildingStatus;
  finishedAt?: string | Date;
  bonuses?: Record<string, number>;
  position?: { x: number; y: number };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
