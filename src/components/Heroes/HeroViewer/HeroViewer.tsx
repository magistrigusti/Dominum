'use client';

import styles from './HeroViewer.module.css';
import { useState } from 'react';
import { Hero } from '../types';

export const HeroViewer = ({ hero }: { hero: Hero }) => {
  return (
    <div className={styles.viewer}>
      <img className={styles.hero_image}
        src={hero.image}
        alt={hero.name}
      />

      <h2 className={styles.hero_name}>{hero.name}</h2>
    </div>
  );
};