// 📄 src/utils/apiClient.ts

export async function getUserHeroes(address: string) {
  const res = await fetch(`/api/heroes?address=${address}`);
  return await res.json();
}