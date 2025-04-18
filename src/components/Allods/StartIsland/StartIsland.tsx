// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';

import styles from './StartIsland.module.css';
import { RESOURCE_NODES } from '@/config/resourceNodes';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import { IslandMapController } from '@/components/Map/IslandMapController';

export const StartIsland = ({ onOpenNode }: { onOpenNode: (nodeId: string) => void }) => {
  return (

    <div className={styles.map_wrapper}>
      <IslandMapController>
        <div className={styles.map_image}>
          <div>
            {RESOURCE_NODES.map((node) => (
              <ResourcePoint 
                key={node.id}
                icon={`/icons/resources/${node.resource}.png`}
                onClick={() => onOpenNode(node.id)}
                x={node.position.x}
                y={node.position.y}
              />
            ))}
          </div>
        </div>
      </IslandMapController>
    </div>

  );
};
