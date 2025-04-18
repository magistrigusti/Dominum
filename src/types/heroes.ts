// @/types/heroes.ts
export interface Hero {
  id: string;
  name: string;
  image: string;
  quality: 'normal' | 'good' | 'rare' | 'epic' | 'legendary';
  level: number;
  exp: number;
  expToNext: number;
}

