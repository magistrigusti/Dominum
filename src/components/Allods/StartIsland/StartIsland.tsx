// 📄 components/Islands/StartIsland/StartIsland.tsx
'use client';

import { useMemo, useState } from 'react';
import styles from './StartIsland.module.css';
import { RESOURCE_CONFIG, type ResourceType } from '@/constants/resources';
import { ResourcePoint } from '@/components/Resources/ResourcePoint/ResourcePoint';
import { IslandMapController } from '@/components/Map/IslandMapController/IslandMapController';
// import { HeroesBar } from '@/components/Map/HeroesBar/HeroesBar';
import { generateResourceNodes } from '@/utils/generateResourceNodes';
import { ResourceNodeModal } from '@/components/Resources/ResourceNodeModal/ResourceNodeModal';
import { ModalHerosGo } from '@/components/Heroes/ModalHerosGo/ModalHerosGo';
import { Hero } from '@/types/heroes'; // ✅ фикс ошибки с типом

const RESOURCE_TYPES = ['food', 'wood', 'stone', 'iron', 'gold'] as const;

// 🔧 интерфейс пропсов
interface StartIslandProps {
  onOpenNode?: (nodeId: string) => void;
}

// 🔧 мок героев (пока нет сервера)
const mockHeroes: Hero[] = [
  {
    id: 'hero-1',
    name: 'Линди',
    level: 3,
    quality: 'rare',
    armyPower: 2500,
    avatar: '/images/heroes/lindi.png',
    image: '/images/heroes/oygen.png',
    exp: 0,
    expToNext: 1000,
  },
  {
    id: 'hero-2',
    name: 'Ойген',
    level: 4,
    quality: 'epic',
    armyPower: 3100,
    avatar: '/images/heroes/oygen.png',
    image: '/images/heroes/oygen.png',
    exp: 0,
    expToNext: 1000,
  },
];

// 🧠 основной компонент острова
export const StartIsland = ({ onOpenNode }: StartIslandProps) => {
  const [activeNode, setActiveNode] = useState<string | null>(null); // открытая точка
  const [isHeroModalOpen, setHeroModalOpen] = useState(false); // модалка героев
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // id точки для героев

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

  return (
    <div className={styles.map_wrapper}>
      <IslandMapController>
        <div className={styles.map_image}>
          {/* иконки на карте */}
          {points.map((node) => (
            <ResourcePoint
              key={node.id}
              icon={node.icon}
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
          onClose={() => setHeroModalOpen(false)}
          onConfirm={(heroId, armyCount) => {
            console.log(`Герой ${heroId} отправлен на ${selectedNodeId} с войском: ${armyCount}`);
            setHeroModalOpen(false);
            setSelectedNodeId(null);
          }}
          heroes={mockHeroes}
        />
      )}
    </div>
  );
};
