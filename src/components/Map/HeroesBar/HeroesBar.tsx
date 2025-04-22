// src/components/Map/HeroesBar/HeroesBar.tsx
'use client';
import styles from './HeroesBar.module.css';
import { Hero } from '@/types/heroes';
import { formatSeconds } from '@/utils/formatTime';
import type { ArmyUnitType } from '@/config/armyCapacity';
import type { Mission } from '@/types/missions'; // ✅ Используй глобальный

interface HeroesBarProps {
  missions: Mission[];
  onCancel: (heroId: string) => void;
}

export const HeroesBar = ({ missions, onCancel }: HeroesBarProps) => {
  return (
    <div className={styles.heroes_bar}>
      {missions.map((mission) => (
        <div className={styles.hero_item} key={mission.heroId}>
          <img src={mission.hero.image} alt={mission.hero.name} />
          <div className={styles.hero_info}>
            <p>{mission.hero.name}</p>
            <p>Войска: {mission.armyCount}</p>

            <div className={styles.army_list}>
              {Object.entries(mission.heroArmy).map(([unit, data]) => {
                if (!data || data.count <= 0) return null;
                return (
                  <p key={unit}>
                    {unit}: {data.count} ур.{data.level}
                  </p>
                );
              })}
            </div>


            <p>Ресурс: {mission.resource}</p>
            <p>⏳ Осталось: {
              formatSeconds(Math.ceil(mission.duration - (Date.now() - mission.startTime) / 1000))}
            </p>

            <button onClick={() => {
              onCancel(mission.heroId)
            }}>Вернуть</button>

          </div>
        </div>
      ))}
    </div>
  );
};
