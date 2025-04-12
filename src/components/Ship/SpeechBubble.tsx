'use client';
import React, { useState } from 'react';
import styles from './SpeechBubble.module.css';
import { useUser } from "@/context/UserContext";


interface SpeechBubbleProps {
  onClose: () => void;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const { state, dispatch } = useUser();


  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      dispatch({
        type: "SET_ACTIVE_QUEST",
        payload: {
          id: "repair-ship",
          title: "Ремонт корабля",
          description: "Добудьте 1000 еды, 2000 дерева и 100 железа.",
          status: "active",
        },
      });
      dispatch({ type: "TOGGLE_QUEST_PANEL", payload: true });
      
    }
  };
  

  return (
    <div className={styles.bubble_wrapper}>
      <div className={styles.bubble}>
        {step === 1 ? (
          <p>
            <strong>Капитан!</strong><br />
            Мы попали в засаду. На нас напали астральные пираты.<br />
            Мы еле улизнули. Но проклятый остров возник на пути из ниоткуда.<br />
            Теперь корабль разбит. Нам нужно собрать ресурсов и починить корабль, чтобы продолжить путь.
          </p>
        ) : (
          <p>
            <strong>Задача:</strong><br />
            1. Добудьте <strong>1000 еды</strong>, <strong>2000 дерева</strong> и <strong>100 железа</strong>.<br />
            2. Отремонтируйте корабль.<br /><br />
            <strong>Награда:</strong><br />
            🧝 Герой обычного качества<br />
            🌟 100 очков престижа
          </p>
        )}

        <button className={styles.accept_btn} onClick={handleNext}>
          Принять
        </button>
      </div>
    </div>
  );
};
