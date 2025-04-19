// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';

import { useMemo, useState } from 'react';
import styles from './StartIsland.module.css';
import { RESOURCE_CONFIG, type ResourceType } from '@/constants/resources';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import { IslandMapController } from '@/components/Map/IslandMapController/IslandMapController';
import { HeroesBar, type Mission } from '@/components/Map/HeroesBar/HeroesBar';
import { generateResourceNodes } from '@/utils/generateResourceNodes';
import { ResourceNodeModal } from '@/components/Resources/ResourceNodeModal/ResourceNodeModal';
import { ModalHerosGo } from '@/components/Heroes/ModalHerosGo/ModalHerosGo';
import { useUser } from '@/context/UserContext';

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
    const currentNode = activeNode; // ✅ сохраняем
    if (!currentNode) return;
    console.log('🔥 открываем модалку героя'); 
    setHeroModalOpen(true);
    setSelectedNodeId(currentNode); // ✅ используем сохранённое значение
    setActiveNode(null);
    setHeroModalOpen(true);
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
        heroes={playerHeroes} // 👈 передаём сюда список героев
        onClose={() => setHeroModalOpen(false)}
        onConfirm={(heroId, armyCount) => {
          const node = points.find(p => p.id === selectedNodeId);
          setActiveMissions(prev => [...prev, {
            heroId,
            hero: playerHeroes.find(h => h.id === heroId)!,
            armyCount,
            nodeId: selectedNodeId!,
            resource: node!.resource,
            duration: 60,
            startTime: Date.now(),
          }]);
      
          console.log(`Герой ${heroId} отправлен на ${selectedNodeId} с войском: ${armyCount}`);
          setHeroModalOpen(false);
          setSelectedNodeId(null);
        }}
      />
      
      )}

      <HeroesBar missions={activeMissions} />
    </div>
  );
};
