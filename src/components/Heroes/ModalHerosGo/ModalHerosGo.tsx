// 📄 src/components/Heroes/ModalHeroesGo/ModalHeroesGo.tsx
'use client';

import styles from './ModalHerosGo.module.css';
import { useState, useEffect } from 'react';
import { Hero } from '@/types/heroes';
import { calculateHeroCapacity } from '@/utils/calculateHeroCapacity';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';

// 🔧 Хук защиты от SSR ошибок
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
};

interface Props {
  onClose: () => void;
  onConfirm: (heroId: string, armyCount: number) => void;
  heroes: Hero[];
}

export const ModalHerosGo = ({ onClose, onConfirm, heroes }: Props) => {
  const hasMounted = useHasMounted();
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [armyCount, setArmyCount] = useState<number>(0);

  // Инициализируем выбранного героя первым из списка
  useEffect(() => {
    if (heroes.length > 0 && !selectedHero) {
      setSelectedHero(heroes[0]);
    }
  }, [heroes, selectedHero]);

  if (!hasMounted || !selectedHero) return null;

  const maxCapacity = calculateHeroCapacity(selectedHero.level, selectedHero.quality);

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>Отправить Войско</h2>

        <div className={styles.viewer_wrapper}>
          <HeroViewer hero={selectedHero} />
        </div>

        <HeroSelector
          heroes={heroes}
          selectedHero={selectedHero}
          onSelect={(hero) => setSelectedHero(hero)}
        />

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
