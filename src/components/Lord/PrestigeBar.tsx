'use client';

import styles from './PrestigeBar.module.css';
import { useUser } from '@/contexts/UserContext';

export const PrestigeBar = () => {
  const { state } = useUser();
  const { prestige, levelPrestige, prestigeProgress } = state;

  const prestigeToNextLevel = 100; // Можно сделать динамическим в будущем

  const progressPercent = Math.min(
    (prestigeProgress / prestigeToNextLevel) * 100,
    100
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.level_box}>
        <span className={styles.level_text}>⚜ Уровень {levelPrestige}</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${progressPercent}%` }} />
      </div>
      <div className={styles.total}>🌟 Престиж: {prestige}</div>
    </div>
  );
};
