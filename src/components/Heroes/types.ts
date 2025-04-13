export interface Hero {
  id: string;
  name: string;
  image: string;
  quality: 'обычный' | 'редкий' | 'эпический';
  level: number;
  exp: number;
  expToNext: number;
}

