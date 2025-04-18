// 📄 src/components/Resources/ResourceHeroesModal/ResourceHeroesModal.tsx
'use client';

import styles from './ModalHerosGo.module.css';
import { HeroCard } from '@/components/Heroes/HeroCard/HeroCard';
import { useState } from 'react';
import { Hero } from '@/types/heroes';

interface Props {
  onClose: () => void;
  onConfirm: (heroId: string, armyCount: number) => void;
  heroes: Hero[];
}

export const ModalHerosGo = ({ onClose, onConfirm, heroes}: Props) => {
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [armyCount, setArmyCount] = useState<number>(0);

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

            <input type="number"
              value={armyCount}
              onChange={(e) => setArmyCount(Number(e.target.value))}
              min={0}
              max={1000}
            />
          </label>
        </div>

        <div className={styles.actions}>
          <button onClick={onClose}>Back</button>

          <button onClick={() => {
            if (selectedHero) onConfirm(selectedHero, armyCount);
          }}
          disabled={!selectedHero || armyCount <= 0}
          >
            Отппавить
          </button>
        </div>
      </div>
    </div>
  )
}