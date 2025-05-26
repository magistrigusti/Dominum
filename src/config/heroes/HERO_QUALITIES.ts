// 📄 src/config/heroes/HERO_QUALITIES.ts

export type HeroQuality = "normal" | "good" | "rare" | "epic" | "legendary";

export const HERO_QUALITIES: Record<HeroQuality, { label: string; color: string; bonus: number }> = {
  normal: { label: "Обычный", color: "#bdbdbd", bonus: 0 },
  good: { label: "Хороший", color: "#6fcf97", bonus: 5 },
  rare: { label: "Редкий", color: "#56ccf2", bonus: 12 },
  epic: { label: "Эпический", color: "#bb6bd9", bonus: 25 },
  legendary: { label: "Легендарный", color: "#f2c94c", bonus: 50 },
};
