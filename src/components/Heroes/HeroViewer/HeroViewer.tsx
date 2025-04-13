'use client';

import styles from './HeroViewer.module.css';
import { useState } from 'react';
import { Hero } from '../types';

export const HeroViewer = ({ hero }: { hero: Hero }) => {
  return (
    <div className={styles.viewer}>
      <h2 className={styles.hero_name}>{hero.name}</h2>
      
      <div className={styles.level_badge}>🎖<br />{hero.level}</div>

      <div>
        <img className={styles.hero_image}
          src={hero.image}
          alt={hero.name}
        />

        
      </div>


      <div className={styles.exp_bar}>
        <div className={styles.exp_fill} style={{ width: `${(hero.exp / hero.expToNext) * 100}%` }} />
      </div>
    </div>
  );
};