//  📁 components/Heroes/Armytable/Armytable.tsx
'use client';

import styles from './ArmyTable.module.css';
import { ARMY_CONFIG } from '@/config/armyConfig';
import { ARMY_STATS, ArmyUnitType } from '@/config/armyCapacity';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';

interface Props {
  army: Record<ArmyUnitType, number>;
  onChange: (updated: Record<ArmyUnitType, number>) => void;
}

export const ArmyTable = ({ army, onChange }: Props) => {
  const { state } = useUser();
  const [selectedUnit, setSelectedUnit] = useState<ArmyUnitType | null>(null);

  // суммарная вместимость уже выбранной армии
  const totalCapacity = Object.entries(army).reduce((sum, [unit, count]) => {
    const level = state.army?.[unit as ArmyUnitType]?.level || 1;
    const cap = ARMY_STATS[unit as ArmyUnitType][level]?.capacity || 0;
    return sum + cap * count;
  }, 0);

  const maxCapacity = 1000; // если у тебя есть переменная maxCapacity — прими её через props

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

        const available = state.army?.[unitType]?.count || 0;
        const level = state.army?.[unitType]?.level || 1;
        const unitCapacity = ARMY_STATS[unitType][level]?.capacity || 0;

        const unitTotalCapacity = count * unitCapacity;
        const willExceed = totalCapacity > maxCapacity;

        return (
          <div
            key={unit}
            className={`${styles.unit_row} ${selectedUnit === unitType ? styles.active : ''} ${willExceed ? styles.exceeded : ''}`}
            onClick={() => setSelectedUnit(unitType)}
          >
            <div className={styles.unit_img}>
              <img src={config.icon} alt={config.label} className={styles.unit_icon} />
            </div>

            <div className={styles.unit_info}>
              <span>{config.label}</span>
              <br />
              <span className={styles.unit_count}>
                {count} / {available}
              </span>
            </div>

            <div className={styles.unit_meta}>
              <span className={styles.unit_capacity}>🎒 {unitTotalCapacity}</span>
              {selectedUnit === unitType && (
                <input
                type="range"
                min={0}
                max={available}
                value={count}
                onClick={(e) => e.stopPropagation()} // 🔥 обязательно
                onChange={e => {
                  e.stopPropagation(); // 🔥 обязательно
                  handleChange(unitType, parseInt(e.target.value) || 0);
                }}
                className={styles.unit_slider}
              />
              
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
