//  📁 components/Heroes/Armytable/Armytable.tsx
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

  // ⬇️ локальный army, чтобы range двигался плавно
  const [localArmy, setLocalArmy] = useState(army);

  useEffect(() => {
    setLocalArmy(army); // синхронизация если изменилось извне
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
    setLocalArmy(updated);        // ⬅️ обновляем локальный стейт
    onChange(updated);            // ⬅️ уведомляем родителя
  };

  return (
    <div className={styles.army_table}>
      {Object.entries(localArmy).map(([unit, count]) => {
        const unitType = unit as ArmyUnitType;
        const config = ARMY_CONFIG.find(cfg => cfg.key === unitType)!;

        const available = state.army?.[unitType]?.count || 0;
        const level = state.army?.[unitType]?.level || 1;
        const unitCapacity = ARMY_STATS[unitType][level]?.capacity || 0;

        const unitTotalCapacity = count * unitCapacity;
        const willExceed = totalCapacity > maxCapacity;

        return (
          <div key={unit}
            className={`${styles.unit_row} ${selectedUnit === unitType ? styles.active : ''} ${willExceed ? styles.exceeded : ''}`}
            onClick={() => {
              if (selectedUnit !== unitType) {
                setSelectedUnit(unitType);
              }
            }}  
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
                <ArmySlider />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
