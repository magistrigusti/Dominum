// 📄 src/types/Ship.ts

export interface ShipEquipment {
  slot: string;
  itemId: string;
  bonuses?: Record<string, number>;
}

export type ShipStatus = 'normal' | 'repairing' | 'destroyed' | 'docked';

export interface Ship {
  _id?: string;
  name: string;
  user: string; // ObjectId пользователя
  level: number;
  capacity: number;
  speed: number;
  durability: number;
  maxDurability: number;
  repairEnd?: string | Date;
  cargo: any[]; // Можно сделать типизировано, если потребуется
  currentIsland?: string;
  avatar?: string;
  special?: Record<string, any>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  equipment?: ShipEquipment[];
  status: ShipStatus;
  currentAstralIsland: string; // ObjectId острова, где корабль сейчас
  // Можно добавить координаты, если нужна "реальная" карта
  movingToIslandId?: string; // ID острова, если корабль в пути
  arrivalTime?: string | Date; // когда прибудет
}
