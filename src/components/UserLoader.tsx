// src/components/UserLoader.tsx
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { getUserHeroes, createHero } from '@/utils/apiClient';
import type { Hero } from '@/types/heroes'; 

const UserLoader = () => {
  const { state: userState, dispatch } = useUser();

  useEffect(() => {
    const loadUserHeroes = async () => {
      if (!userState.address) return;

      try {
        const heroes = await getUserHeroes(userState.address);

        // 🎯 Если героев нет — создаём двух стартовых
        if (heroes.length === 0) {
          const startHeroes = [
            {
              userAddress: userState.address,
              name: 'Обычный Герой 1',
              image: '/dominum/heroes/hero-workin-grey.png',
              quality: 'normal' as 'normal',
              level: 1,
              exp: 0,
              expToNext: 100,
            },
            {
              userAddress: userState.address,
              name: 'Обычный Герой 2',
              image: '/dominum/heroes/hero-workin-grey-2.png',
              quality: 'normal' as 'normal',
              level: 1,
              exp: 0,
              expToNext: 100,
            },
          ];
          

          for (const hero of startHeroes) {
            await createHero(hero);
          }

          const updated = await getUserHeroes(userState.address);
          dispatch({ type: 'SET_HEROES', payload: updated });
        } else {
          dispatch({ type: 'SET_HEROES', payload: heroes });
        }
      } catch (err) {
        console.error('Ошибка при загрузке героев:', err);
      }
    };

    loadUserHeroes();
  }, [userState.address]);

  return null; // или какой-то лоадер
};

export default UserLoader;
