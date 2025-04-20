//  📁 components/Heroes/Armytable/Armytable.tsx
'use client';

import styles from './ArmyTable.module.css';
import { ARMY_CONFIG } from '@/config/armyConfig';
import { ARMY_STATS, ArmyUnitType } from '@/config/armyCapacity';
import { useUser } from '@/context/UserContext';

interface Props {
  army: Record<ArmyUnitType, number>;
  onChange: (updated: Record<ArmyUnitType, number>) => void;
}

export const ArmyTable = ({ army, onChange }: Props) => {
  const { state } = useUser();

  const handleChange = (unit: ArmyUnitType, value: number) => {
    const updated = {
      ...army,
      [unit]: Math.max(0, value),
    };
    onChange(updated);
  };

  return (
    <div className={styles.army_table}>
      {Object.entries(army).map(([unit, count]) => {
        const unitType = unit as ArmyUnitType;
        const config = ARMY_CONFIG.find(cfg => cfg.key === unitType)!;
        const maxCount = state.army?.[unitType]?.count || 0;

        return (
          <div key={unit} className={styles.unit_row}>
            <div className={styles.unit_img}>
              <img src={config.icon} alt={config.label} className={styles.unit_icon} />
            </div>

            <div className={styles.unit_info}>
              <span>{config.label}</span>
              <br />
              <span className={styles.unit_count}>{count}</span>
            </div>

            <input
              type="range"
              min={0}
              max={maxCount}
              value={count}
              onChange={e => handleChange(unitType, parseInt(e.target.value) || 0)}
              className={styles.unit_slider}
            />
          </div>
        );
      })}
    </div>
  );
};

