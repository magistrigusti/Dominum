// /components/Ship/Ship.tsx
'use client';
import { QuestPanel } from "@/components/Quests/QuestLog/QuestPanel";
import { useUser } from "@/context/UserContext";
import React, { useState } from 'react';
import styles from './Ship.module.css';
import { SpeechBubble } from './SpeechBubble';

interface ShipProps {
  onClick?: () => void;
}

export const Ship: React.FC<ShipProps> = ({ onClick }) => {
  const [showBubble, setShowBubble] = useState(false);
  const { state, dispatch } = useUser();

  const quest = state.activeQuest;

  const handleClick = () => {
    if (quest) {
      dispatch({ type: "TOGGLE_QUEST_PANEL", payload: true });
    } else {
      setShowBubble(true);
    }
  };
  
  
  const handleClose = () => {
    alert("✅ Принят квест: Ремонт корабля"); // ← теперь работает!
    setShowBubble(false);
  };

  return (
    <div className={styles.ship_wrapper} onClick={handleClick}>
      {!quest && showBubble && (
        <SpeechBubble onClose={handleClose} />
      )}
      {quest && <QuestPanel />}
      <img
        className={styles.ship_image}
        src="/dominum/ships/ship-start.png"
        alt="Корабль"
      />
    </div>
  );
};

