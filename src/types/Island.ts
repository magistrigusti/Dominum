// 📄 src/types/Island.ts
export type IslandType = 'standard' | 'special' | 'pirate' | 'event' | 'starter';

export interface Island {
  _id?: string;
  name: string;
  type: IslandType;
  // Можно добавить: location, size, avatar, бонусы и т.д.
}
