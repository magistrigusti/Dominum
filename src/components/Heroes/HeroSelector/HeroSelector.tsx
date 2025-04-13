'use client';

import styles from './HeroSelector.module.css';
import { HeroCard } from '../HeroCard/HeroCard';
import { Hero } from '../types';

export const HeroSelector = ({
  heroes,
  onSelect,
}: {
  heroes: Hero[];
  onSelect: (hero: Hero) => void;
}) => {
  return (
    <div className={styles.scroll}>
      {heroes.map(hero => (
        <HeroCard key={hero.id} hero={hero} onClick={() => onSelect(hero)} />
      ))}
    </div>
  );
};