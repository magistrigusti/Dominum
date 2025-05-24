// 📄 src/types/Army.ts

export interface ArmyUnit {
  unitType: string; // Тип юнита (peasant, sailor и т.д.)
  level: number;    // Уровень юнита
  count: number;    // Количество

  baseStats?: {     // Базовые характеристики юнита (для будущих расширений)
    attack: number;
    defense: number;
    armor: number;
    hp: number;
    capacity: number;
  };

  bonuses?: {       // Бонусы, наложенные на юнита
    attack?: number;
    defense?: number;
    armor?: number;
    hp?: number;
    capacity?: number;
    speed?: number;
  };

  effects?: any[];  // Эффекты, активные на юните (можно типизировать подробно)
}

export interface Army {
  _id?: string;
  units: ArmyUnit[]; // Массив юнитов
  owner: string;     // ObjectId владельца (User/Hero)
  ownerModel: "User" | "Hero"; // Чей это отряд
  extraBonuses?: {   // Суммарные бонусы армии
    attack: number;
    defense: number;
    armor: number;
    hp: number;
    capacity: number;
    speed: number;
  };
  carryingResources?: { // Несомые ресурсы
    food?: number;
    wood?: number;
    stone?: number;
    iron?: number;
    gold?: number;
    doubloon?: number;
    pearl?: number;
    allodium?: number;
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
