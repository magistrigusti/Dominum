'use client';

import styles from './HeroSelector.module.css';
import { HeroCard } from '../HeroCard/HeroCard';
import { Hero } from '../types'; // или актуальный путь

interface HeroSelectorProps {
  heroes: Hero[];
  selectedHero: Hero;
  onSelect: (hero: Hero) => void;
}

export const HeroSelector = ({ heroes, selectedHero, onSelect }: HeroSelectorProps) => {
  return (
    <div className="selector_wrapper">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          isSelected={hero.id === selectedHero.id}
          onClick={() => onSelect(hero)}
        />
      ))}
    </div>
  );
};
