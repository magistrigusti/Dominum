// 📄 src/types/Inventory.ts

export interface InventoryItem {
  itemId: string;         // ID предмета из справочника
  quantity: number;       // Количество
  equipped?: boolean;     // Надет ли предмет
  hero?: string;          // ID героя, если экипирован
}

export interface Inventory {
  _id?: string;
  user: string;           // ObjectId пользователя
  items: InventoryItem[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
