// 📄 src/services/inventoryService.ts

import InventoryModel from '@/models/InventoryModel';
import UserModel from '@/models/UserModel';
import { InventoryItem } from '@/types/Inventory';

// Получить инвентарь пользователя (возвращает один документ на игрока)
export async function getUserInventory(wallet: string) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  let inventory = await InventoryModel.findOne({ owner: user._id });
  if (!inventory) {
    inventory = await InventoryModel.create({ owner: user._id, items: [] });
  }
  return inventory;
}

// Добавить предмет в инвентарь
export async function addInventoryItem(wallet: string, item: InventoryItem) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  let inventory = await InventoryModel.findOne({ owner: user._id });
  if (!inventory) {
    inventory = await InventoryModel.create({ owner: user._id, items: [item] });
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
}

// Удалить предмет из инвентаря
export async function removeInventoryItem(wallet: string, itemId: string, quantity: number = 1) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  const inventory = await InventoryModel.findOne({ owner: user._id });
  if (!inventory) throw new Error('Inventory not found');
  const idx = inventory.items.findIndex((i: any) => i.itemId === itemId);
  if (idx !== -1) {
    inventory.items[idx].quantity -= quantity;
    if (inventory.items[idx].quantity <= 0) inventory.items.splice(idx, 1);
    await inventory.save();
  }
  return inventory;
}
