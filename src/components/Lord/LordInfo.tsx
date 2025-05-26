'use client';

import { useUser } from '@/contexts/UserContext';
import styles from './LordInfo.module.css';

export const LordInfo = () => {
  const { state } = useUser();
  const { name, avatar } = state;
  const displayName = name || "Lord";
  const displayAvatar = avatar || "/icons/edit-user.png";

  return (
    <div className={styles.wrapper}>
      <img className={styles.avatar} 
        src={displayAvatar}
        alt="Аватар Лорда" 
      />

      <h2 className={styles.name}>{displayName}</h2>
    </div>
  )
}