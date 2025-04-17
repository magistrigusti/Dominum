// 📁 src/config/resourceNodes.ts

export interface ResourceNode {
  id: string;
  resource: 'food' | 'wood' | 'stone' | 'iron' | 'gold' | 'pearl';
  level: number;
  position: {x: number; y: number};
  lastRestoredAt?: string;
}

export const RESOURCE_NODES: ResourceNode[] = [
  {
    id: 'node_food_1',
    resource: 'food',
    level: 1,
    position: {x: 100, y: 100},
  },
  {
    id: 'node_wood_1',
    resource: 'wood',
    level: 1,
    position: {x: 100, y: 100},
  },
  {
    id: 'node_stone_1',
    resource: 'stone',
    level: 1,
    position: {x: 100, y: 100},
  },
];