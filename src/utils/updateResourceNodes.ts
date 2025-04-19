// 📦 utils/updateResourceNodes.ts
import { RESOURCE_LEVEL } from "@/config/resourceLevel";
import { RESOURCE_CONFIG } from "@/constants/resources";

const START_ISLAND_ZONE = {
  width: 550,
  height: 450,
  offsetX: 120,
  offsetY: 250,
};

function generateStartIslandPosition(): {x: number; y: number} {
  return {
    x: START_ISLAND_ZONE.offsetX + Math.floor(Math.random() * START_ISLAND_ZONE.width),
    y: START_ISLAND_ZONE.offsetY + Math.floor(Math.random() * START_ISLAND_ZONE.height),
  };
}

function shouldRestoreToday(lastRestoredAt?: string): boolean {
  if (!lastRestoredAt) return true;

  const now = new Date();
  const restored = new Date(lastRestoredAt);

  const isNewDay = now.getUTCDate() !== restored.getUTCDate();
  const isPast4am = now.getUTCHours() >= 4;

  return isNewDay && isPast4am;
}

export function updateResourceNodesIfNeeded(user: any) {
  if (!user.resourceNodes) user.resourceNodes = [];

  for (const resource of ['food', 'wood', 'stone', 'iron', 'gold']) {
    const typedResource = resource as keyof typeof RESOURCE_LEVEL;
    const node = user.resourceNodes.find((n: any) => n.resource === resource);

    const avatar = RESOURCE_CONFIG.find(r => r.key === resource)?.avatar || "";

    if (!node) {
      user.resourceNodes.push({
        id: `node_${resource}_${Date.now()}`,
        resource,
        level: 1,
        position: generateStartIslandPosition(),
        remaining: RESOURCE_LEVEL[typedResource][1].totalAmount,
        lastRestoredAt: new Date().toISOString(),
        avatar,
      });
    } else if (node.remaining === 0 && shouldRestoreToday(node.lastRestoredAt)) {
      node.id = `node_${resource}_${Date.now()}`;
      node.position = generateStartIslandPosition();
      node.lastRestoredAt = new Date().toISOString();
      node.remaining = RESOURCE_LEVEL[typedResource][node.level].totalAmount;
      node.avatar = RESOURCE_CONFIG.find(r => r.key === resource)?.avatar || "";

    }
  }
}
