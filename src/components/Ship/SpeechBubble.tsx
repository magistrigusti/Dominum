// SpeechBuble.tsx
'use client';
import React from 'react';
import styles from './SpeechBubble.module.css';

interface SpeechBubbleProps {
  onClose: () => void;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ onClose }) => {
  return (
    <div className={styles.bubble_wrapper}>
      <div className={styles.bubble}>
        <p>
          <strong>Капитан!</strong><br />
          Мы попали в засаду. На нас напали астральные пираты.<br />
          Мы еле улизнули. Но проклятый остров возник на пути из ниоткуда.<br />
          Теперь корабль разбит. Нам нужно собрать ресурсов и починить корабль что бы продолжить путь.
        </p>
        
        <button className={styles.accept_btn} onClick={onClose}>
          Принять
        </button>
      </div>
    </div>
  )
}
