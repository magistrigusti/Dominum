'use client';

import { useUser } from '@/context/UserContext';

export const CompliteQuestButton = () => {
  const { state, dispatch } = useUser();

  const hasEnoughResources = 
    state.food >= 2000 &&
    state.wood >= 1000 &&
    state.iron >= 100;

  const handleComplete = async () => {
    if (!hasEnoughResources) return;

    const updated = {
      address: state.address,
      wood: state.food - 2000,
      stone: state.wood - 1000,
      iron: state.iron - 100,
      activeQuest: {
        id: 'repair_ship',
        title: 'Починка корабля',
        description: 'Ты починил свой корабль!',
        status: 'complete',
      },
    };

    const res = await fetch('/api/user/update', {
      method: 'PUT',
      headers: {'Context-Type': 'application/json'},
      body: JSON.stringify(updated),
    });

    if (!res.ok) return;

    const data = await res.json();
    dispatch({type: 'SET_USER', payload: data});
  };

  return (
    <button onClick={handleComplete}
      disabled={!hasEnoughResources}
      style={{
        padding: '10px 20px',
        backgroundColor: hasEnoughResources ? 'green' : 'gray',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        border: 'none',
        marginTop: '1rem',
        cursor: hasEnoughResources ? 'pointer' : 'not-allowed'
      }}
    >
      Выполнить задание
    </button>
  )
}