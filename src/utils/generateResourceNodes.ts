// 📁 src/utils/generateResourceNodes.ts
type ResourceType = 'food' | 'wood' | 'stone' | 'iron' | 'gold';

interface GeneratedResourceNode {
  id: string;
  x: number;
  y: number;
  resource: ResourceType;
  icon: string;
}

// 🔧 генератор псевдослучайных чисел по сидy
function mulberry32(seed: number): () => number {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateResourceNodes(
  count: number,
  area: { width: number; height: number; offsetX: number; offsetY: number },
  resourceTypes: ResourceType[],
  seed: number = 1 // 👈 добавили сид
): GeneratedResourceNode[] {
  const rand = mulberry32(seed); // 👈 заменили Math.random()
  const placed: { x: number; y: number }[] = [];
  const result: GeneratedResourceNode[] = [];

  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let tries = 0;
    do {
      x = area.offsetX + Math.floor(rand() * area.width);
      y = area.offsetY + Math.floor(rand() * area.height);
      tries++;
    } while (
      placed.some(p => Math.abs(p.x - x) < 60 && Math.abs(p.y - y) < 60) &&
      tries < 100
    );

    placed.push({ x, y });

    const resource = resourceTypes[i % resourceTypes.length];

    result.push({
      id: `node-${i}`,
      x,
      y,
      resource,
      icon: `/icons/resources/${resource}.png`,
    });
  }

  return result;
}
