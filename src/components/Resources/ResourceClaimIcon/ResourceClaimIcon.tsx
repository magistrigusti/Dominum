// 📁 components/Resources/ResourceClaimIcon.tsx
'use client';

import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import styles from './ResourceClaimIcon.module.css';

type ResourceKey = 'food' | 'wood' | 'stone' | 'iron' | 'gold';

export const ResourceClaimIcon = ({ resource, icon }: { resource: ResourceKey; icon: string }) => {
  const { state, dispatch } = useUser();
  const pending = state.pendingRewards?.[resource] ?? 0;
  // const pending = 50; // 🔥 ВСЕГДА показывать как будто есть 50 ресурса

  // ✅ Создаём случайную позицию при первом рендере
  const [position] = useState(() => {
    const top = Math.floor(Math.random() * 40) + 20;  // от 20% до 60%
    const left = Math.floor(Math.random() * 60) + 25; // от 10% до 70%
    return { top: `${top}%`, left: `${left}%` };
  });

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
    <div
      className={styles.claim_icon}
      style={{ top: position.top, left: position.left }}
      onClick={handleClaim}
    >
      <img src={icon} alt={`Claim ${resource}`} />
      <span>+{pending}</span>
    </div>
  );
};



// const pending = state.pendingRewards?.[resource] ?? 0;
