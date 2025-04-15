'use client';
import { useUser } from "@/context/UserContext";
import { CompleteQuestButton } from '../CompliteQuestButton/CompleteQuestButton';
import styles from './QuestPanel.module.css';

export const QuestPanel = () => {
  const { state, dispatch } = useUser();
  const quest = state?.activeQuest;
  const open = state?.questPanelOpen;

  if (!quest || !open) return null;

  const handleClose = () => {
    dispatch({ type: "TOGGLE_QUEST_PANEL", payload: false });
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.quest_panel} onClick={(e) => e.stopPropagation()}>
        <h4>🧭 Задание:</h4>
        <strong>{quest.title}</strong>
        <p>{quest.description}</p>
        <button className={styles.close_btn} onClick={handleClose}>✖</button>

        <CompleteQuestButton />
      </div>
    </div>
  );
};
