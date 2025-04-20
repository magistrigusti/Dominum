// 📄 components/Heroes/ModalHeroesGo/ModalHeroesGo.tsx
'use client';
import { ArmyTable } from '@/components/Heroes/ArmyTable/ArmyTable';
import styles from './ModalHerosGo.module.css';
import { useState, useEffect } from 'react';
import { Hero } from '@/types/heroes';
import { calculateHeroCapacity } from '@/utils/calculateHeroCapacity';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';
import { useUser } from '@/context/UserContext';
import { ARMY_STATS, ArmyUnitType } from '@/config/armyCapacity';
import { ARMY_CONFIG } from '@/config/armyConfig';

type HeroWithTroops = Hero & {
  troops?: Record<ArmyUnitType, { count: number; level: number }>;
};

interface Props {
  onClose: () => void;
  onConfirm: (heroId: string, army: Record<ArmyUnitType, number>) => void;
  heroes: HeroWithTroops[];
}

export const ModalHerosGo = ({ onClose, onConfirm, heroes }: Props) => {
  const { state } = useUser();
  const [selectedHero, setSelectedHero] = useState<HeroWithTroops | null>(null);
  const [army, setArmy] = useState<Record<ArmyUnitType, number>>({
    peasant: 0, sailor: 200, axeman: 0, spearman: 0, archer: 0, cavalry: 0,
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
    const unitLevel = state.army?.[unitType]?.level || 1;
    const capacityPerUnit = ARMY_STATS[unitType][unitLevel]?.capacity || 0;
    return sum + count * capacityPerUnit;
  }, 0);

  const handleUnitChange = (unit: ArmyUnitType, value: number) => {
    setArmy(prev => ({
      ...prev,
      [unit]: Math.max(0, value),
    }));
  };

  const handleConfirm = () => {
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

        <ArmyTable army={army} onChange={setArmy} />


        <p className={styles.capacity_info}>
          Вместимость: {currentCapacity} / {maxCapacity}
        </p>

        <div className={styles.actions}>
          <button className={styles.button} onClick={onClose}>Назад</button>
          <button
            className={styles.button}
            onClick={handleConfirm}
            disabled={currentCapacity <= 0 || currentCapacity > maxCapacity}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};
