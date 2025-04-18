// 📁 src/utils/generateResourceNodes.ts
type ResourceType = 'food' | 'wood' | 'stone' | 'iron' | 'gold';

interface GeneratedResourceNode {
  id: string;
  x: number;
  y: number;
  resource: ResourceType;
  icon: string;
}

export function generateResourceNodes(
  count: number,
  area: { width: number; height: number; offsetX: number; offsetY: number },
  resourceTypes: ResourceType[]
): GeneratedResourceNode[] {
  const placed: { x: number; y: number }[] = [];
  const result: GeneratedResourceNode[] = [];

  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let tries = 0;
    do {
      x = area.offsetX + Math.floor(Math.random() * area.width);
      y = area.offsetY + Math.floor(Math.random() * area.height);
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
