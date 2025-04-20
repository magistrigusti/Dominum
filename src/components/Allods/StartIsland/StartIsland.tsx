
// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './StartIsland.module.css';
import { RESOURCE_LEVEL } from '@/config/resourceLevel';
import { RESOURCE_CONFIG } from '@/constants/resources';
import { useUser } from '@/context/UserContext';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import { IslandMapController } from '@/components/Map/IslandMapController/IslandMapController';
import { ResourceNodeModal } from '@/components/Resources/ResourceNodeModal/ResourceNodeModal';
import { ModalHerosGo } from '@/components/Heroes/ModalHerosGo/ModalHerosGo';
import { HeroesBar, type Mission } from '@/components/Map/HeroesBar/HeroesBar';
import type { ArmyUnitType } from '@/config/armyCapacity';

const getFallbackAvatar = (resource: string): string => {
  return RESOURCE_CONFIG.find(r => r.key === resource)?.avatar || '/icons/resources/default.png';
};

interface StartIslandProps {
  onOpenNode?: (nodeId: string) => void;
}

export const StartIsland = ({ onOpenNode }: StartIslandProps) => {
  const [activeMissions, setActiveMissions] = useState<Mission[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isHeroModalOpen, setHeroModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const { state } = useUser();
  const playerHeroes = state.heroes || [];
  const points = state.resourceNodes || [];

  const mapRef = useRef<HTMLDivElement>(null);

  const handleCollectClick = () => {
    setHeroModalOpen(true);
    setSelectedNodeId(activeNode);
    setActiveNode(null);
  };

  const availableHeroes = playerHeroes.filter(
    hero => !activeMissions.some(m => m.heroId === hero.id)
  );

  const handleConfirm = async (heroId: string, army: Record<ArmyUnitType, number>) => {
    const node = points.find(p => p.id === selectedNodeId);
    if (!node) return;

    const armyCount = Object.values(army).reduce((sum, val) => sum + val, 0);

    const mission: Mission = {
      heroId,
      hero: playerHeroes.find(h => h.id === heroId)!,
      armyCount,
      nodeId: selectedNodeId!,
      resource: node.resource,
      duration: 60,
      startTime: Date.now(),
    };

    setActiveMissions(prev => [...prev, mission]);

    await fetch('/api/user/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: state.address,
        activeMining: {
          resource: node.resource,
          heroId,
          startedAt: new Date(),
          duration: 60,
          position: node.position,
          remaining: node.remaining,
        },
        army,
      }),
    });

    setHeroModalOpen(false);
    setSelectedNodeId(null);
  };

  return (
    <div className={styles.map_wrapper}>
      <IslandMapController>
        <div className={styles.map_image} ref={mapRef}>
          {points.map((node) => (
            <ResourcePoint
              key={node.id}
              avatar={node.avatar || getFallbackAvatar(node.resource)}
              x={node.position.x}
              y={node.position.y}
              onClick={() => {
                setActiveNode(node.id);
                onOpenNode?.(node.id);
              }}
            />
          ))}

          {activeNode && (() => {
            const node = points.find(p => p.id === activeNode)!;
            return (
              <ResourceNodeModal
                resource={node.resource as 'food' | 'wood' | 'stone' | 'iron' | 'gold'}
                total={RESOURCE_LEVEL[node.resource as keyof typeof RESOURCE_LEVEL][node.level].totalAmount}
                remaining={node.remaining}
                onCollect={handleCollectClick}
                onClose={() => setActiveNode(null)}
              />
            );
          })()}
        </div>
      </IslandMapController>

      {isHeroModalOpen && (
        <ModalHerosGo
          heroes={availableHeroes}
          onClose={() => setHeroModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}

      <HeroesBar missions={activeMissions} />
    </div>
  );
};