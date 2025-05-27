// 📄 src/config/INVENTORY_ITEMS.ts
export interface InventoryItemConfig {
  id: string;
  name: string;
  description: string;
  type: "weapon" | "armor" | "artifact" | "consumable";
  bonuses: Record<string, number>;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const INVENTORY_ITEMS: InventoryItemConfig[] = [
  {
    id: "sword_1",
    name: "Железный меч",
    description: "Обычный меч для пехоты.",
    type: "weapon",
    bonuses: { attack: 2 },
    rarity: "common",
  },
  // ... остальные предметы
];
