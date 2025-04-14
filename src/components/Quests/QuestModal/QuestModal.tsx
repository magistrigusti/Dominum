// ✅ Файл: src/components/Quest/QuestModal/QuestModal.tsx
'use client';

import styles from './QuestModal.module.css';

export const QuestModal = ({ onClose }: { onClose: () => void}) => {
  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li>🪓 Собери 2000 еды</li>
          <li>🪓 Собери 1000 дерева</li>
          <li>🪓 Собери 100 железа</li>
          <li>💰 Отремонтируй корабль</li>
        </ul>

        <button className={styles.modal_button} onClick={onClose}>Close</button>
      </div>
    </div>
  )
}