'use client';

import { useUser } from '@/contexts/UserContext';
import styles from './CompleteQuestButton.module.css';

export const CompleteQuestButton = () => {
  const { state, dispatch } = useUser();

  const hasEnoughResources =
    state.food >= 1000 &&
    state.wood >= 2000 &&
    state.iron >= 100 &&
    !state.questShipRepaired;

  const handleClick = async () => {
    if (!hasEnoughResources) return;

    const res = await fetch('/api/quest/complete-ship-repair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: state.address }),
    });

    if (res.ok) {
      const updated = await res.json();
      dispatch({ type: 'SET_USER', payload: updated });
    } else {
      console.error('❌ Ошибка при выполнении квеста');
    }
  };

  return (
    <button
      className={`${styles.quest_button} ${hasEnoughResources ? styles.active : styles.inactive}`}
      disabled={!hasEnoughResources}
      onClick={handleClick}
    >
      Выполнить задание
    </button>
  );
};
