// 📄 components/Heroes/ModalHerosGo/ModalHerosGo.tsx
'use client';
import { ArmyTable } from '@/components/Heroes/ArmyTable/ArmyTable';
import styles from './ModalHerosGo.module.css';
import { useState, useEffect } from 'react';
import { Hero } from '@/types/Hero';
import { calculateHeroCapacity } from '@/utils/calculateHeroCapacity';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';
import { ARMY_STATS, ArmyUnitType } from '@/config/armyCapacity';

type HeroWithTroops = Hero & {
  troops?: Record<ArmyUnitType, { count: number; level: number }>;
};

interface Props {
  onClose: () => void;
  heroes: HeroWithTroops[];
  selectedResourceNodeId: string;
  onConfirm: (
    heroId: string,
    army: Record<ArmyUnitType, number>
  ) => void;
}

export const ModalHerosGo = ({
  onClose,
  heroes,
  selectedResourceNodeId,
  onConfirm,
}: Props) => {
  const [selectedHero, setSelectedHero] = useState<HeroWithTroops | null>(null);
  const [army, setArmy] = useState<Record<ArmyUnitType, number>>({
    peasant: 0, sailor: 0, axeman: 0, spearman: 0, archer: 0, cavalry: 0,
  });

  useEffect(() => {
    if (heroes.length > 0 && !selectedHero) {
      setSelectedHero(heroes[0]);
    }
  }, [heroes]);

  if (!selectedHero) return null;

  const maxCapacity = calculateHeroCapacity(selectedHero.level, selectedHero.quality);

  const currentCapacity = Object.entries(army).reduce((sum, [unit, count]) => {
    const unitType = unit as ArmyUnitType;
    const unitLevel = selectedHero.troops?.[unitType]?.level || 1;
    const capacityPerUnit = ARMY_STATS[unitType][unitLevel]?.capacity || 0;
    return sum + count * capacityPerUnit;
  }, 0);

  const handleUnitChange = (updated: Record<ArmyUnitType, number>) => {
    setArmy(updated);
  };

  const handleSend = () => {
    if (!selectedHero) return;
    onConfirm(selectedHero.id, army);
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Отправить Войско</h2>

        <HeroViewer className={styles.modla_hero_scale} hero={selectedHero} />
        <HeroSelector
          heroes={heroes}
          selectedHero={selectedHero}
          onSelect={setSelectedHero}
        />

        <ArmyTable army={army} onChange={handleUnitChange} />

        <p className={styles.capacity_info}>
          Вместимость: {currentCapacity} / {maxCapacity}
        </p>

        <div className={styles.actions}>
          <button className={styles.button} onClick={onClose}>Назад</button>
          <button
            className={styles.button}
            onClick={handleSend}
            disabled={currentCapacity <= 0 || currentCapacity > maxCapacity}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};
