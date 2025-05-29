// 📄 src/services/buildingService.ts

import BuildingModel from '@/models/BuildingModel';
import UserModel from '@/models/UserModel';

// Получить здания игрока
export async function getUserBuildings(wallet: string) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  return await BuildingModel.find({ owner: user._id });
}

// Построить новое здание
export async function createBuilding(wallet: string, buildingType: string, position?: { x: number, y: number }) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  // Здесь можно добавить логику проверки лимитов, стоимости и т.д.
  const building = await BuildingModel.create({
    owner: user._id,
    type: buildingType,
    level: 1,
    status: 'under_construction',
    position,
    finishedAt: new Date(Date.now() + 60 * 60 * 1000), // 1 час до завершения (пример)
    createdAt: new Date()
  });
  return building.toObject();
}

// Улучшить здание
export async function upgradeBuilding(wallet: string, buildingId: string) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  const building = await BuildingModel.findOne({ _id: buildingId, owner: user._id });
  if (!building) throw new Error('Building not found');
  building.level += 1;
  building.status = 'under_construction';
  building.finishedAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 часа на апгрейд (пример)
  building.upgradedAt = new Date();
  await building.save();
  return building.toObject();
}
