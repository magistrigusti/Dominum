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
import { HeroesBar} from '@/components/Map/HeroesBar/HeroesBar';
import type { Mission } from '@/types/Mission'; // ✅ используем общий
import type { ArmyUnitType } from '@/config/armyCapacity';
import { ARMY_STATS } from '@/config/armyCapacity';
import { RESOURCE_DIFFICULTY } from '@/constants/resources'; 

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
  const [activeHeroNodes, setActiveHeroNodes] = useState<{
    [nodeId: string]: { heroId: string; avatar: string };
  }>({});

  const { state, dispatch } = useUser();
  const playerHeroes = state.heroes || [];
  const points = state.resourceNodes || [];
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updated: typeof activeHeroNodes = {};

    for (const mission of state.missions || []) {
      updated[mission.nodeId] = {
        heroId: mission.heroId,
        avatar: mission.hero.image,
      };
    }
    setActiveHeroNodes(updated);
    setActiveMissions(state.missions || [])
  }, [state.missions]);

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

    const miningStats = RESOURCE_LEVEL[node.resource as keyof typeof RESOURCE_LEVEL][node.level];
    const total = miningStats.totalAmount;
    const speed = miningStats.miningSpeed;

    let capacity = 0;
    for (const [unit, count] of Object.entries(army)) {
      const unitLevel = state.army?.[unit as ArmyUnitType]?.level || 1;
      capacity += ARMY_STATS[unit as ArmyUnitType][unitLevel].capacity * count;
    }

    const difficulty = RESOURCE_DIFFICULTY[node.resource as keyof typeof RESOURCE_DIFFICULTY] || 1;
    const duration = Math.ceil((total * difficulty) / capacity); // ⏱ в секундах
    const armyCount = Object.values(army).reduce((sum, val) => sum + val, 0);
    
    const filteredArmy = {
      peasant: {
        count: army.peasant,
        level: state.army?.peasant?.level ?? 0,
      },
      sailor: {
        count: army.sailor,
        level: state.army?.peasant?.level ?? 0,
      },
      axeman: {
        count: army.axeman,
        level: state.army?.peasant?.level ?? 0,
      },
      spearman: {
        count: army.spearman,
        level: state.army?.spearman?.level ?? 0,
      },
      archer: {
        count: army.archer,
        level: state.army?.archer?.level ?? 0,
      },
      cavalry: {
        count: army.cavalry,
        level: state.army?.cavalry?.level ?? 0,
      },
    };
    

    const mission: Mission = {
      heroId,
      hero: playerHeroes.find(h => h.id === heroId)!,
      armyCount,
      nodeId: selectedNodeId!,
      resource: node.resource,
      duration,
      startTime: Date.now(),
      heroArmy: filteredArmy
    };

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: state.address,
          activeMining: {
            resource: node.resource,
            heroId,
            startedAt: new Date(),
            duration,
            position: node.position,
            remaining: node.remaining,
          },
          nodeId: selectedNodeId,
          army: filteredArmy,
          newMission: mission,
          heroArmy: filteredArmy,
        }),
      });

      const updatedUser = await response.json();
      dispatch({ type: 'SET_USER', payload: updatedUser });

      setActiveMissions(prev => [...prev, mission]);
      setActiveHeroNodes(prev => ({
        ...prev,
        [selectedNodeId!]: {
          heroId,
          avatar: playerHeroes.find(h => h.id === heroId)?.image || '/icons/hero-mini.png',
        }
      }));
      setHeroModalOpen(false);
      setSelectedNodeId(null);
    } catch (error) {
      console.error('Ошибка отправки героя:', error);
    }
  };

  const handleCancel = async (heroId: string) => {
    const missionToCancel = activeMissions.find(m => m.heroId === heroId);
    if (!missionToCancel) return;
    console.log("🔍 army:", state.army);
    console.log("🔍 heroArmy:", missionToCancel.heroArmy);
    console.log("typeof army:", typeof state.army);
    console.log("army.constructor.name:", state.army?.constructor?.name);
    console.log("heroArmy.constructor.name:", missionToCancel.heroArmy?.constructor?.name);

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: state.address,
          cancelMissionHeroId: heroId,
          heroArmy: missionToCancel.heroArmy,
          missions: state.missions,
          heroes: state.heroes,
          army: JSON.parse(JSON.stringify(state.army)),
          resourceNodes: state.resourceNodes,
          resources: {
            food: state.food,
            wood: state.wood,
            stone: state.stone,
            iron: state.iron,
            gold: state.gold,
            doubloon: state.doubloon,
            pearl: state.pearl,
            allodium: state.allodium,
          }
        }),
      });
  
      const updatedUser = await response.json();
  
      dispatch({ type: 'SET_USER', payload: updatedUser }); // ✅ обязательно
  
      setActiveMissions(prev => prev.filter(m => m.heroId !== heroId));
  
      setActiveHeroNodes(prev => {
        const updated = { ...prev };
        delete updated[missionToCancel.nodeId];
        return updated;
      });
  
    } catch (err) {
      console.error('Ошибка отмены миссии:', err);
    }
  };
  

  return (
    <div className={styles.map_wrapper}>
      <IslandMapController>
        <div className={styles.map_image} ref={mapRef}>
          {points.map((node) => {
            const heroInfo = activeHeroNodes[node.id];
            const isBlocked = !!heroInfo;

            return (
              <ResourcePoint
                key={node.id}
                avatar={
                  isBlocked ? heroInfo.avatar
                  : node.avatar || getFallbackAvatar(node.resource)
                }
                x={node.position.x}
                y={node.position.y}
                onClick={() => {
                  if (!isBlocked) {
                    setActiveNode(node.id);
                    onOpenNode?.(node.id);
                  }
                }}
              />
            )
          })}
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

