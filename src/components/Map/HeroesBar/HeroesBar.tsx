// src/components/Map/HeroesBar/HeroesBar.tsx
'use client';
import styles from './HeroesBar.module.css';
import { Hero } from '@/types/heroes'; 
import { formatSeconds } from '@/utils/formatTime';
export interface Mission {
  heroId: string;
  hero: Hero;       // ✅ используем твой тип Hero
  armyCount: number;
  nodeId: string;
  resource: string;
  duration: number;
  startTime: number;
}

interface HeroesBarProps {
  missions: Mission[];
  onCancel: (heroId: string) => void;
}

export const HeroesBar = ({ missions }: HeroesBarProps) => {
  return (
    <div className={styles.heroes_bar}>
      {missions.map((mission) => (
        <div className={styles.hero_item} key={mission.heroId}>
          <img src={mission.hero.image} alt={mission.hero.name} />
          <div className={styles.hero_info}>
            <p>{mission.hero.name}</p>
            <p>Войска: {mission.armyCount}</p>
            <p>Ресурс: {mission.resource}</p>
            <p>⏳ Осталось: {
              formatSeconds(Math.ceil(mission.duration - (Date.now() - mission.startTime) / 1000))}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
};
