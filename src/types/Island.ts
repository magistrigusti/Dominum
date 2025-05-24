// 📄 src/types/Island.ts

export type IslandType = 'standard' | 'special' | 'pirate' | 'event' | 'starter';

// Если у острова появятся свои поля — можно добавить сюда полный интерфейс Island
export interface Island {
  _id?: string;
  name: string;
  type: IslandType;
  // location, size, avatar, бонусы, и т.д.
}
