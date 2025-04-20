// 📄 Файл: components/Heroes/Armytable/ArmySlider.tsx
'use client';
import styles from './ArmyTable.module.css';
import { useState, useEffect } from 'react';

interface Props {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export default function ArmySlider({ value, max, onChange }: Props) {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    onChange(val);
  };

  return (
    <div className={styles.slider_container}>
      <input
        type="range"
        min={0}
        max={max}
        value={sliderValue}
        onChange={handleChange}
        className={styles.slider}
      />
      <p className={styles.slider_value}>{sliderValue} / {max}</p>
    </div>
  );
}
