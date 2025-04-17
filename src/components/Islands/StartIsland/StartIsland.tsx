// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';

import { RESOURCE_NODES } from '@/config/resourceNodes';
import { RESOURCE_LEVEL } from '@/config/resourceLevel';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import styles from './FloatingIsland.module.css';

export const StartIsland = ({ onOpenNode }: { onOpenNode: (nodeId: string) => void}) => {
  return (
    <div className={styles.container}>
      <img className={styles.map_image} 
        src="/dominum/allod-2-1.png"
        alt="start island"
      />

      {RESOURCE_NODES.map((node) => (
        <ResourcePoint key={node.id}
          icon={`/icons/resources/${node.resource}.png`}
          onClick={() => onOpenNode(node.id)}
          x={node.position.x}
          y={node.position.y}
        />
      ))}

    </div>
  )
}