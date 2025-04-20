// 📄 components/Heroes/Armytable/ArmyTable.tsx
'use client';

import styles from './ArmyTable.module.css';
import { ARMY_CONFIG } from '@/config/armyConfig';
import { ARMY_STATS, ArmyUnitType } from '@/config/armyCapacity';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import ArmySlider from './ArmySlider';

interface Props {
  army: Record<ArmyUnitType, number>;
  onChange: (updated: Record<ArmyUnitType, number>) => void;
}

export const ArmyTable = ({ army, onChange }: Props) => {
  const { state } = useUser();
  const [selectedUnit, setSelectedUnit] = useState<ArmyUnitType | null>(null);
  const [localArmy, setLocalArmy] = useState<Record<ArmyUnitType, number>>(army);

  useEffect(() => {
    setLocalArmy(army);
  }, [army]);

  const maxCapacity = 1000;

  const totalCapacity = Object.entries(localArmy).reduce((sum, [unit, count]) => {
    const level = state.army?.[unit as ArmyUnitType]?.level || 1;
    const cap = ARMY_STATS[unit as ArmyUnitType][level]?.capacity || 0;
    return sum + cap * count;
  }, 0);

  const handleChange = (unit: ArmyUnitType, value: number) => {
    const updated = {
      ...localArmy,
      [unit]: Math.max(0, value),
    };
    setLocalArmy(updated);
    onChange(updated);
  };

  const availableArmy = state.army || {};

  return (
    <div className={styles.army_table}>
      {Object.entries(availableArmy).map(([unit, data]) => {
        const unitType = unit as ArmyUnitType;
        const config = ARMY_CONFIG.find(cfg => cfg.key === unitType);
        const level = data?.level || 1;
        const available = data?.count || 0;
        const selected = localArmy[unitType] || 0;

        if (!config || !ARMY_STATS[unitType]?.[level]) return null;

        const unitCapacity = ARMY_STATS[unitType][level].capacity;
        const unitTotalCapacity = selected * unitCapacity;
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
                {selected} / {available}
              </span>
            </div>

            <div className={styles.unit_meta}>
              <span className={styles.unit_capacity}>🎒 {unitTotalCapacity}</span>
              {selectedUnit === unitType && (
                <ArmySlider
                  value={selected}
                  max={available}
                  onChange={(val) => handleChange(unitType, val)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
