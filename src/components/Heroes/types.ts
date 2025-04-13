export interface Hero {
  id: string;
  name: string;
  image: string; // путь к изображению героя
  description?: string;
  quality?: string;
  // quality?: "обычный" | "редкий" | "эпический";
  animationId?: string; // для WebGL/3D
}
