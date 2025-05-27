'use client';
import styles from './ArmyBar.module.css';
import { ARMY_CONFIG } from '@/config/army/ARMY_CONFIG';
import type { ArmyUnitType } from '@/config/armyCapacity';

type ArmyData = {
  [unit in ArmyUnitType]?: {
    count: number;
    level: number;
  };
};

interface ArmyBarProps {
  army: ArmyData;
}

export const ArmyBar = ({ army }: ArmyBarProps) => {
  return (
    <div className={styles.army_bar}>
      {ARMY_CONFIG.map(({ key, icon, label }) => {
        const data = army[key];
        if (!data || data.count <= 0) return null;

        return (
          <div key={key} className={styles.unit}>
            <img src={icon} alt={label} />
            <span>{data.count} ур.{data.level}</span>
          </div>
        );
      })}
    </div>
  );
};
