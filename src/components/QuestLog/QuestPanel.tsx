'use client';

import { useUser } from "@/context/UserContext";
import styles from './QuestPanel.module.css';

export const QuestPanel = () => {
  const { state } = useUser();
  const quest = state?.activeQuest;

  if (!quest) return null;

  return (
    <div className={styles.quest_panel}>
      <h4>🧭 Задание:</h4>
      <strong>{quest.title}</strong>
      <p>{quest.description}</p>
    </div>
  )
}