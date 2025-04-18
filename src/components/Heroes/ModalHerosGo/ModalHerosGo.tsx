// 📄 src/components/Heroes/ModalHeroesGo/ModalHeroesGo.tsx
'use client';

import styles from './ModalHerosGo.module.css';
import { HeroCard } from '@/components/Heroes/HeroCard/HeroCard';
import { useState } from 'react';
import { Hero } from '@/types/heroes';
import { calculateHeroCapacity } from '@/utils/calculateHeroCapacity';

interface Props {
  onClose: () => void;
  onConfirm: (heroId: string, armyCount: number) => void;
  heroes: Hero[];
}

export const ModalHerosGo = ({ onClose, onConfirm, heroes }: Props) => {
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [armyCount, setArmyCount] = useState<number>(0);

  const selectedHeroData = heroes.find(h => h.id === selectedHero);
  const maxCapacity = selectedHeroData ? calculateHeroCapacity(
    selectedHeroData.level, selectedHeroData.quality) : 0;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Отправить Войско</h2>

        <div className={styles.hero_list}>
          {heroes.map((hero) => (
            <HeroCard key={hero.id}
              hero={hero}
              isSelected={hero.id === selectedHero}
              onClick={() => setSelectedHero(hero.id)}
            />
          ))}
        </div>

        <div className={styles.controls}>
          <label>
            Кол-во войск:
            <input
              type="number"
              value={armyCount}
              onChange={(e) => setArmyCount(Number(e.target.value))}
              min={0}
              max={maxCapacity}
            />
          </label>
          {selectedHero && <p className={styles.capacity_info}>Макс: {maxCapacity}</p>}
        </div>

        <div className={styles.actions}>
          <button onClick={onClose}>Назад</button>
          <button
            onClick={() => {
              if (selectedHero) onConfirm(selectedHero, armyCount);
            }}
            disabled={!selectedHero || armyCount <= 0 || armyCount > maxCapacity}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};
