// 📁 components/Resources/ResourceClaimIcon.tsx
'use client';

import { useUser } from '@/context/UserContext';
import styles from './ResourceClaimIcon.module.css';

export type ResourceKey = 'food' | 'wood' | 'stone' | 'iron' | 'gold';

export const ResourceClaimIcon = ({ resource, icon }: { resource: ResourceKey; icon: string }) => {
  const { state, dispatch } = useUser();
  // const pending = state.pendingRewards?.[resource] ?? 0;
  const pending = 50; // 🔥 ВСЕГДА показывать как будто есть 50 ресурса

  if (!pending) return null;

  const handleClaim = async () => {
    const res = await fetch('/api/user/claim-reward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: state.address, resource }),
    });

    if (!res.ok) return;
    const data = await res.json();

    dispatch({
      type: 'SET_USER',
      payload: {
        ...state,
        ...data.resources,
        pendingRewards: data.pendingRewards,
      },
    });
  };

  return (
    <div className={styles.bonus_wrapper} onClick={handleClaim}>
      <img src={icon} alt={resource} className={styles.bonus_icon} />
      <span className={styles.bonus_label}>+{pending}</span>
    </div>
  );
};
