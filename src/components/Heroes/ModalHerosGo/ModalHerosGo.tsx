// 📄 src/components/Heroes/ModalHeroesGo/ModalHeroesGo.tsx
'use client';

import styles from './ModalHerosGo.module.css';
import { useState, useEffect } from 'react';
import { Hero } from '@/types/heroes';
import { calculateHeroCapacity } from '@/utils/calculateHeroCapacity';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';

interface Props {
  onClose: () => void;
  onConfirm: (heroId: string, armyCount: number) => void;
  heroes: Hero[];
}

export const ModalHerosGo = ({ onClose, onConfirm, heroes }: Props) => {
  const playerHeroes = heroes || [];
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [armyCount, setArmyCount] = useState<number>(0);

  useEffect(() => {
    if (!selectedHero && playerHeroes.length > 0) {
      setSelectedHero(playerHeroes[0]);
    }
  }, [playerHeroes, selectedHero]);

  if (!selectedHero) {
    return (
      <div className={styles.modal_overlay}>
        <div className={styles.modal_content}>
          <p>Загрузка героя...</p>
        </div>
      </div>
    );
  }

  const maxCapacity = calculateHeroCapacity(selectedHero.level, selectedHero.quality);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Отправить Войско</h2>

        <HeroViewer hero={selectedHero} className={styles.modal_hero_scale} />

        <HeroSelector
          heroes={playerHeroes}
          selectedHero={selectedHero}
          onSelect={setSelectedHero}
        />

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
            <button
              className={styles.button}
              onClick={() => setArmyCount(maxCapacity)}
            >
              Макс.
            </button>
          </div>

          <p className={styles.capacity_info}>
            Выбрано: {armyCount} / Макс: {maxCapacity}
          </p>

          <div className={styles.actions}>
            <button className={styles.button} onClick={onClose}>
              Назад
            </button>
            <button
              className={styles.button}
              onClick={() => onConfirm(selectedHero.id, armyCount)}
              disabled={armyCount <= 0 || armyCount > maxCapacity}
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
