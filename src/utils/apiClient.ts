// 📄 src/utils/apiClient.ts

export async function getUserHeroes(address: string) {
  const res = await fetch(`/api/heroes?address=${address}`);
  if (!res.ok) throw new Error('Не удалось получить героев');
  return await res.json();
}

export async function createHero(heroData: {
  userAddress: string;
  name: string;
  image: string;
  quality: 'normal' | 'good' | 'rare' | 'epic' | 'legendary';
  level: number;
  exp: number;
  expToNext: number;
}) {
  const res = await fetch('/api/heroes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(heroData),
  });
  if (!res.ok) throw new Error('Ошибка при создании героя');
  return await res.json();
}
