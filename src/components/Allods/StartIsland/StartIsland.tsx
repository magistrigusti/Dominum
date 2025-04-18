// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';

import styles from './StartIsland.module.css';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import { IslandMapController } from '@/components/Map/IslandMapController';
import { useMemo } from 'react';
import { ResourceNodeModal } from '@/components/Resources/ResourceNodeModal/ResourceNodeModal';

const RESOURCE_TYPES = ['food', 'wood', 'stone', 'iron', 'gold'] as const;

export const StartIsland = ({ onOpenNode }: { onOpenNode: (nodeId: string) => void }) => {
  const points = useMemo(() => {
    const placed: { x: number; y: number }[] = [];
    const result = [];

    const areaWidth = 500;
    const areaHeight = 500;
    const offsetX = 120;
    const offsetY = 250;

    for (let i = 0; i < 5; i++) {
      let x: number, y: number;
      let tries = 0;
      do {
        x = offsetX + Math.floor(Math.random() * areaWidth);
        y = offsetY + Math.floor(Math.random() * areaHeight);
        tries++;
      } while (
        placed.some(p => Math.abs(p.x - x) < 60 && Math.abs(p.y - y) < 60) && tries < 100
      );
    
      placed.push({ x, y });
    
      result.push({
        id: `node-${i}`,
        x,
        y,
        icon: `/icons/resources/${RESOURCE_TYPES[i % RESOURCE_TYPES.length]}.png`,
      });
    }
    

    return result;
  }, []);

  return (
    <div className={styles.map_wrapper}>
      <IslandMapController>
        <div className={styles.map_image}>
          {points.map((node) => (
            <ResourcePoint
              key={node.id}
              icon={node.icon}
              x={node.x}
              y={node.y}
              onClick={() => onOpenNode(node.id)}
            />
          ))}
        </div>
      </IslandMapController>
    </div>
  );
};
