// /components/Ship/Ship.tsx
'use client';

import React, { useState } from 'react';
import styles from './Ship.module.css';
import { SpeechBubble } from './SpeechBubble';

interface ShipProps {
  onClick?: () => void;
}

export const Ship: React.FC<ShipProps> = ({ onClick }) => {
  const [showBubble, setShowBubble] = useState(false);

  const handleClick = () => {
    setShowBubble(true);
    if (onClick) onClick();
  };

  return (
    <div className={styles.ship_wrapper} onClick={handleClick}>
      {showBubble && <SpeechBubble onClose={() => setShowBubble(false)} />}
      <img
        className={styles.ship_image}
        src="/dominum/ship-start.png"
        alt="Корабль"
      />
    </div>
  );
};
