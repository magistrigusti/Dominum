// UserLoader.tsx
'use client';

import { useTonWallet } from '@tonconnect/ui-react';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';

export const UserLoader = () => {
  const wallet = useTonWallet();
  const { dispatch } = useUser();

  useEffect(() => {
    if (!wallet?.account?.address) return;

    const loadUser = async () => {
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: wallet.account.address }),
        });

        if (!res.ok) throw new Error('Failed to load user');

        const data = await res.json();
        dispatch({ type: 'SET_USER', payload: data });
      } catch (err) {
        console.error('❌ Ошибка при загрузке пользователя:', err);
      }
    };

    loadUser();
  }, [wallet?.account?.address]);

  useEffect(() => {
    if (userState.address) {
      getUserHeroes(userState.address).then((heroes) => {
        dispatch({type: 'SET_HEROES', payload: heroes})
      });
    }
  }, [userState.address]);

  return null;
};
