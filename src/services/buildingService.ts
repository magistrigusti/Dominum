// 📄 src/services/buildingService.ts
import BuildingModel from "@/models/BuildingModel";
import { Building } from "@/types/Building";

export const createBuilding = async (userId: string, type: string, position?: { x: number, y: number }) => {
  // Можно добавить проверку лимитов, стоимости и времени строительства из конфига
  const building = await BuildingModel.create({
    user: userId,
    type,
    level: 1,
    status: "under_construction",
    position,
    finishedAt: new Date(Date.now() + 60 * 60 * 1000), // 1 час до завершения (пример)
  });
  return building;
};

export const upgradeBuilding = async (buildingId: string) => {
  const building = await BuildingModel.findById(buildingId);
  if (!building) throw new Error("Building not found");
  building.level += 1;
  building.status = "under_construction";
  building.finishedAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 часа на апгрейд
  await building.save();
  return building;
};

export const getUserBuildings = async (userId: string) => {
  return BuildingModel.find({ user: userId });
};
