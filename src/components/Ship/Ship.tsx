// /components/Ship/Ship.tsx
'use client';
import { QuestPanel } from "@/components/Quests/QuestLog/QuestPanel";
import { useUser } from "@/contexts/UserContext";
import React, { useState } from 'react';
import styles from './Ship.module.css';
import { SpeechBubble } from './SpeechBubble';

interface ShipProps {
  onClick?: () => void;
  position?: { top: string; left: string }; // ✅ новая позиция
  src?: string; // ✅ путь до нужного изображения
}

export const Ship: React.FC<ShipProps> = ({
  onClick,
  position = { top: '22%', left: '18%' }, // default: старый корабль
  src = "/dominum/ships/ship-start.png",
}) => {
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
    alert("✅ Принят квест: Ремонт корабля");
    setShowBubble(false);
  };

  return (
    <div
      className={styles.ship_wrapper}
      onClick={handleClick}
      style={{ top: position.top, left: position.left }}
    >
      {!quest && showBubble && <SpeechBubble onClose={handleClose} />}
      {quest && <QuestPanel />}
      <img className={styles.ship_image} src={src} alt="Корабль" />
    </div>
  );
};


