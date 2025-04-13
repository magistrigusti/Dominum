'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroSelector.module.css';
import { Hero } from '../types';
import { HeroCard } from '../HeroCard/HeroCard';

interface HeroSelectorProps {
  heroes: Hero[];
  selectedHero: Hero;
  onSelect: (hero: Hero) => void;
}

export const HeroSelector = ({ heroes, selectedHero, onSelect }: HeroSelectorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && selectedRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;
      const offset = selected.offsetLeft - container.offsetWidth / 2 + selected.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [selectedHero]);

  return (
    <div className={styles.selector_row} ref={containerRef}>
      {heroes.map((hero) => (
        <div
          key={hero.id}
          ref={hero.id === selectedHero.id ? selectedRef : null}
        >
          <HeroCard
            hero={hero}
            isSelected={hero.id === selectedHero.id}
            onClick={() => onSelect(hero)}
          />
        </div>
      ))}
    </div>
  );
};
