// ✅ Файл: src/components/Quest/QuestButton/QuestButton.tsx
'use client';

import { useState } from 'react';
import { QuestModal } from '../QuestModal/QuestModal';
import styles from './QuestButton.module.css';

export const QuestButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.quest_button} onClick={() => setOpen(true)}>
        <img src="/dominum/quest.png" alt="Квесты" />
      </div>

      {open && <QuestModal onClose={() => setOpen(false)} />}
    </>
  );
};
