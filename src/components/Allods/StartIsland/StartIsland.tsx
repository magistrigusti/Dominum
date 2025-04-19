// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';

import { useMemo, useState } from 'react';
import styles from './StartIsland.module.css';
import { RESOURCE_CONFIG, type ResourceType } from '@/constants/resources';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import { IslandMapController } from '@/components/Map/IslandMapController/IslandMapController';
import { HeroesBar } from '@/components/Map/HeroesBar/HeroesBar';
import { generateResourceNodes } from '@/utils/generateResourceNodes';
import { ResourceNodeModal } from '@/components/Resources/ResourceNodeModal/ResourceNodeModal';
import { ModalHerosGo } from '@/components/Heroes/ModalHerosGo/ModalHerosGo';
import { useUser } from '@/context/UserContext';
import type { Mission } from '@/components/Map/HeroesBar/HeroesBar';

const RESOURCE_TYPES = ['food', 'wood', 'stone', 'iron', 'gold'] as const;

// 🔧 интерфейс пропсов
interface StartIslandProps {
  onOpenNode?: (nodeId: string) => void;
}

// 🧠 основной компонент острова
export const StartIsland = ({ onOpenNode }: StartIslandProps) => {
  const [activeMissions, setActiveMissions] = useState<Mission[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null); // открытая точка
  const [isHeroModalOpen, setHeroModalOpen] = useState(false); // модалка героев
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // id точки для героев
  const { state } = useUser();
  const playerHeroes = state.heroes || [];

  // 🎲 генерация точек
  const points = useMemo(() =>
    generateResourceNodes(5, {
      width: 550,
      height: 450,
      offsetX: 120,
      offsetY: 250,
    }, RESOURCE_TYPES.slice()), []
  );

  // 💡 клик "Собрать" → открываем модалку героев
  const handleCollectClick = () => {
    setHeroModalOpen(true);
    setSelectedNodeId(activeNode);
    setActiveNode(null); // закрываем окно ресурса
  };

  // 💡 фильтрация свободных героев
  const availableHeroes = playerHeroes.filter(
    hero => !activeMissions.some(m => m.heroId === hero.id)
  );

  const handleConfirm = async (heroId: string, armyCount: number) => {
    const node = points.find(p => p.id === selectedNodeId);
    if (!node) return;

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

    // 📡 отправляем на сервер, чтобы герой ушёл в активную миссию
    await fetch('/api/user/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: state.address,
        activeMining: {
          resource: mission.resource,
          heroId: mission.heroId,
          startedAt: new Date(),
          duration: mission.duration,
          position: points.find(p => p.id === mission.nodeId),
          remaining: 100,
        }
      })
    });

    setHeroModalOpen(false);
    setSelectedNodeId(null);
  };

  return (
    <div className={styles.map_wrapper}>
      <IslandMapController>
        <div className={styles.map_image}>
          {/* иконки на карте */}
          {points.map((node) => (
            <ResourcePoint
              key={node.id}
              avatar={node.icon}
              x={node.x}
              y={node.y}
              onClick={() => {
                setActiveNode(node.id);
                onOpenNode?.(node.id);
              }}
            />
          ))}

          {/* модалка ресурса */}
          {activeNode && (
            <ResourceNodeModal
              resource={points.find(p => p.id === activeNode)!.resource}
              total={100}
              remaining={60}
              onCollect={handleCollectClick}
              onClose={() => setActiveNode(null)}
            />
          )}
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
