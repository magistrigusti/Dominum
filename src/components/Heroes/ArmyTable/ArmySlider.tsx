'use client';
import { useState } from 'react';
import styles from './ArmyTable.module.css';

export default function WorkingSlider() {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div style={{
      padding: '20px',
      background: '#222',
      color: '#fff',
      borderRadius: '10px',
      width: '300px',
      margin: '40px auto',
    }}>
      <h2>🎚 Ползунок</h2>
      <input
        type="range"
        min={0}
        max={100}
        value={sliderValue}
        onChange={(e) => setSliderValue(Number(e.target.value))}
        style={{ width: '100%' }}
      />
      <p>: {sliderValue}</p>
    </div>
  );
}
