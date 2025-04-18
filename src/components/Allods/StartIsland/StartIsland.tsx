// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';
import { RESOURCE_CONFIG, type ResourceType } from '@/constants/resources';
import styles from './StartIsland.module.css';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import { IslandMapController } from '@/components/Map/IslandMapController';
import { generateResourceNodes } from '@/utils/generateResourceNodes';
import { useMemo, useState } from 'react';
import { ResourceNodeModal } from '@/components/Resources/ResourceNodeModal/ResourceNodeModal';

const RESOURCE_TYPES = ['food', 'wood', 'stone', 'iron', 'gold'] as const;

// 🔧 1. Добавляем интерфейс
interface StartIslandProps {
  onOpenNode?: (nodeId: string) => void;
}

// 🔧 2. Принимаем проп
export const StartIsland = ({ onOpenNode }: StartIslandProps) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const points = useMemo(() =>
    generateResourceNodes(5, {
      width: 550,
      height: 450,
      offsetX: 120,
      offsetY: 250,
    }, RESOURCE_TYPES.slice()), []
  );

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
              onClick={() => {
                setActiveNode(node.id);
                onOpenNode?.(node.id); // 🔥 теперь работает
              }}
            />
          ))}

          {activeNode && (
            <ResourceNodeModal
              resource={points.find(p => p.id === activeNode)!.resource}
              total={100}
              remaining={60}
              onCollect={() => setActiveNode(null)}
              onClose={() => setActiveNode(null)}
            />
          )}
        </div>
      </IslandMapController>
    </div>
  );
};

