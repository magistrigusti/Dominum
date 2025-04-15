// 📁 components/Resources/ResourceNodeModal.tsx
'use client';

import styles from './ResourceNodeModal.module.css';

interface Props {
  resource: 'wood' | 'stone' | 'iron' | 'gold';
  total: number;
  remaining: number;
  onCollect: () => void;
  onClose: () => void;
}

export const ResourceNodeModal = ({ resource, total, remaining, onCollect, onClose }: Props) => {
  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h3>Добыча ресурса: {resource?.toUpperCase() ?? '...'}</h3>


        <img src={`/icons/resources/${resource}.png`} alt={resource} className={styles.resource_icon} />

        <p>Всего на точке: {total}</p>
        <p>Осталось: {remaining}</p>

        <button className={styles.collect_btn} onClick={onCollect}>Собрать</button>
        <button className={styles.close_btn} onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};
