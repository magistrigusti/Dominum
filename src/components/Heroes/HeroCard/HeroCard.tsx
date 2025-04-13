import styles from './HeroCard.module.css';
import { Hero } from '../types';

interface HeroCardProps {
  hero: Hero;
  isSelected: boolean;
  onClick: () => void;
}

export const HeroCard = ({ hero, isSelected, onClick }: HeroCardProps) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <img className={styles.card_img} src={hero.image} alt={hero.name} />
      <div className={styles.card_level}>🎖 {hero.level}</div>
    </div>
  );
};
