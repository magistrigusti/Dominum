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

  const { state, dispatch } = useUser();
  const playerHeroes = state.heroes || [];
  const points = state.resourceNodes || [];

  const mapRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (state.missions?.length > 0) {
  //     setActiveMissions(state.missions)
  //   }
  // }, [state.missions]);

  const handleCollectClick = () => {
    setHeroModalOpen(true);
    setSelectedNodeId(activeNode);
    setActiveNode(null);
  };

  const availableHeroes = playerHeroes.filter(
    hero => !activeMissions.some(m => m.heroId === hero.id)
  );

  const handleConfirm = async (
    heroId: string,
    army: Record<ArmyUnitType, number>
  ) => {
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

    try {
      const filteredArmy = Object.fromEntries(
        Object.entries(army).filter(([, count]) => count > 0)
      ) as Record<ArmyUnitType, number>;

      const response = await fetch('/api/user/update', {
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
          nodeId: selectedNodeId,
          army: filteredArmy,
          newMission: mission
        }),
      });

      const updatedUser = await response.json();
      dispatch({ type: 'SET_USER', payload: updatedUser });

      setActiveMissions(prev => [...prev, mission]);
      setHeroModalOpen(false);
      setSelectedNodeId(null);
    } catch (error) {
      console.error('Ошибка отправки героя:', error);
    }
  };

  const handleCancel = async (heroId: string) => {
    const missionToCancel = activeMissions.find(m => m.heroId === heroId);
    if (!missionToCancel) return;

    try {
      await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: state.address,
          cancelMissionHeroId: heroId,
          army: {
            // возвращаем обратно на сервер
            [missionToCancel.resource]: missionToCancel.armyCount
          }
        }),
      });

      setActiveMissions(prev => prev.filter(m => m.heroId !== heroId));
    } catch (err) {
      console.error('Ошибка отмены миссии:', err);
    }
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
        </div>
      </IslandMapController>

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

      {isHeroModalOpen && selectedNodeId && (
        <ModalHerosGo
          heroes={availableHeroes}
          selectedResourceNodeId={selectedNodeId}
          onClose={() => {
            setHeroModalOpen(false);
            setSelectedNodeId(null);
          }}
          onConfirm={handleConfirm}
        />
      )}

      <HeroesBar missions={activeMissions} onCancel={handleCancel} />
    </div>
  );
};
