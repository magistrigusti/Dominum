// 📄 src/services/astralService.ts
import { AstralMap, AstralIsland } from "@/types/AstralMap";
import { ResourceNode } from "@/types/Resource";

// минимальная дистанция между кристаллами
const MIN_ASTRAL_CRYSTAL_DISTANCE = 10; // условная единица

function distance(a: { x: number, y: number }, b: { x: number, y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function respawnAstralCrystal(
  islands: AstralIsland[],
  resourceNodes: ResourceNode[]
) {
  // 1. Удаляем старый кристалл (если надо)
  const nodesWithoutCrystal = resourceNodes.filter(n => n.resource !== "astral_crystal");

  // 2. Ищем свободные острова без кристалла
  const candidateIslands = islands.filter(island => {
    // Уже есть кристалл на этом острове?
    const hasCrystal = island.resourceNodes.some(id =>
      resourceNodes.some(rn => rn._id === id && rn.resource === "astral_crystal")
    );
    return !hasCrystal;
  });

  // 3. Случайно выбираем остров (можно добавить умную логику)
  if (!candidateIslands.length) return; // нет куда ставить
  const idx = Math.floor(Math.random() * candidateIslands.length);
  const island = candidateIslands[idx];

  // 4. Генерируем новую точку кристалла на этом острове
  const newNode: ResourceNode = {
    _id: generateUniqueId(),
    resource: "astral_crystal",
    level: 1,
    position: { x: island.x, y: island.y }, // можно рандомно в пределах острова
    totalAmount: 1,
    currentAmount: 1,
    isDepleted: false,
    autoRestore: false,
    // ---- ДОБАВЬ ОБЯЗАТЕЛЬНЫЕ ПОЛЯ ----
    quality: "common", // или другое дефолтное, если нужно
    lastMiningTime: 0, // или null, если позволяет тип
    // можешь добавить другие поля, если они в типе обязательны!
  };

  // Добавляем id новой точки в остров
  island.resourceNodes.push(newNode._id);
  resourceNodes.push(newNode);

  // Можно возвращать обновлённые острова/ресурсы
  return { islands, resourceNodes };
}

// Генератор уникальных id (можно заменить на nanoid)
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
