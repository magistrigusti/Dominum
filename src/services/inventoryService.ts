// 📄 src/services/inventoryService.ts
import InventoryModel from "@/models/InventoryModel";
import { InventoryItem } from "@/types/Inventory";

export const addItemToInventory = async (userId: string, item: InventoryItem) => {
  let inventory = await InventoryModel.findOne({ user: userId });
  if (!inventory) {
    inventory = await InventoryModel.create({ user: userId, items: [item] });
  } else {
    const idx = inventory.items.findIndex((i: any) => i.itemId === item.itemId);
    if (idx !== -1) {
      inventory.items[idx].quantity += item.quantity;
    } else {
      inventory.items.push(item);
    }
    await inventory.save();
  }
  return inventory;
};

export const removeItemFromInventory = async (userId: string, itemId: string, quantity: number = 1) => {
  const inventory = await InventoryModel.findOne({ user: userId });
  if (!inventory) throw new Error("Inventory not found");
  const idx = inventory.items.findIndex((i: any) => i.itemId === itemId);
  if (idx !== -1) {
    inventory.items[idx].quantity -= quantity;
    if (inventory.items[idx].quantity <= 0) inventory.items.splice(idx, 1);
    await inventory.save();
  }
  return inventory;
};

export const getUserInventory = async (userId: string) => {
  return InventoryModel.findOne({ user: userId });
};
