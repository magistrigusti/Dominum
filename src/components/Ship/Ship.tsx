// /components/Ship/Ship.tsx
"use client";
import React from 'react';
import styles from './Ship.module.css';

interface ShipProps {
  onClick?: () => void;
}

export const Ship: React.FC<ShipProps> = ({ onClick}) => {
  return (
    <div className={styles.ship_wrapper}
      onClick={onClick}
    >
      <img className={styles.ship_image} 
        src="/dominum/ship-start.png"
        alt="Ship 1"
      />
    </div>
  );
};