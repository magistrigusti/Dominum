// 📄 src/utils/apiClient.ts

export async function getUserHeroes(address: string) {
  const res = await fetch(`/api/heroes?address=${address}`);
  if (!res.ok) throw new Error('Не удалось получить героев');
  return await res.json();
}