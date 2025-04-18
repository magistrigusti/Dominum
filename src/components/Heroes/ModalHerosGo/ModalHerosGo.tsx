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
  const maxCapacity = selectedHeroData
    ? calculateHeroCapacity(selectedHeroData.level, selectedHeroData.quality)
    : 0;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Отправить Войско</h2>

        {/* 🔼 ГЕРОИ */}
        <div className={styles.hero_list}>
          {heroes.map((hero) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              isSelected={hero.id === selectedHero}
              onClick={() => setSelectedHero(hero.id)}
            />
          ))}
        </div>

        {/* 🔽 ВОЙСКО */}
        <div className={styles.controls}>
          <div className={styles.army_slider}>
            <label>Войска: </label>
            <input
              type="range"
              min={0}
              max={maxCapacity}
              value={armyCount}
              onChange={(e) => setArmyCount(Number(e.target.value))}
            />
            <button onClick={() => setArmyCount(maxCapacity)}>Макс.</button>
          </div>

          {selectedHero && (
            <p className={styles.capacity_info}>
              Выбрано: {armyCount} / Макс: {maxCapacity}
            </p>
          )}

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

            <p>Время: 00:01:24</p>

          </div>
        </div>
      </div>
    </div>
  );
};
