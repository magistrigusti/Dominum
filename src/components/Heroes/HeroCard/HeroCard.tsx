'use client';

import styles from './HeroCard.module.css';
import { Hero } from '../types';

export const HeroCard = ({ hero, onClick }: { hero: Hero; onClick: () => void}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.card_img} 
        src={hero.image}
        alt={hero.name}
      />

      <div className={styles.card_name}>{hero.name}</div>
    </div>
  );
};