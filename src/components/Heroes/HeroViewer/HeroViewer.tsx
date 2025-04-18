'use client';

import styles from './HeroViewer.module.css';
import { Hero } from '@/types/heroes';

export const HeroViewer = ({ hero, className = '' }: { hero: Hero; className?: string }) => {
  return (
    <div className={`${styles.hero_image_wrapper} ${className}`}>
      <h2 className={styles.hero_name}>{hero.name}</h2>
      <div className={styles.level_badge}>🎖<br />{hero.level}</div>

      <img
        className={styles.hero_image}
        src={hero.image}
        alt={hero.name}
      />

      <div className={styles.exp_bar}>
        <div
          className={styles.exp_fill}
          style={{ width: `${(hero.exp / hero.expToNext) * 100}%` }}
        />
      </div>
    </div>
  );
};
