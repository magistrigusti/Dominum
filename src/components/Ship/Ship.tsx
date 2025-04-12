// /components/Ship/Ship.tsx
'use client';
import { QuestPanel } from "@/components/QuestLog/QuestPanel";
import { useUser } from "@/context/UserContext";
import React, { useState } from 'react';
import styles from './Ship.module.css';
import { SpeechBubble } from './SpeechBubble';

interface ShipProps {
  onClick?: () => void;
}

export const Ship: React.FC<ShipProps> = ({ onClick }) => {
  const [showBubble, setShowBubble] = useState(false);
  const { state } = useUser();
  const quest = state.activeQuest;

  const handleClick = () => {
    if (!quest) {
      setShowBubble(true);
      if (onClick) onClick();
    }
  };

  return (
    <div className={styles.ship_wrapper} onClick={handleClick}>
      {!quest && showBubble && (
        <SpeechBubble onClose={() => setShowBubble(false)} />
      )}
      {quest && <QuestPanel />}
      <img
        className={styles.ship_image}
        src="/dominum/ship-start.png"
        alt="Корабль"
      />
    </div>
  );
};

