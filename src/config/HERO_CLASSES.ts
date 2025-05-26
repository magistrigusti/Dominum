// 📄 src/config/HERO_CLASSES.ts

export type HeroClassType = "warrior" | "mage" | "archer" | "priest" | "assassin" | "paladin" | "astral_mage";

interface HeroClassConfig {
  label: string;
  icon: string;
  description: string;
  baseBonuses: {
    attack: number;
    defense: number;
    hp: number;
    capacity: number;
    speed: number;
    astralPower?: number; // если нужен параметр для астральных героев
  };
  starterSkills?: string[];
  unlockResource?: "astral_crystal" | "allodium"; // если класс разблокируется за ресурс
}

export const HERO_CLASSES: Record<HeroClassType, HeroClassConfig> = {
  warrior: {
    label: "Воин",
    description: "Мощный боец ближнего боя, увеличенный урон и защита.",
    icon: "/assets/heroes/warrior.png",
    baseBonuses: { attack: 2, defense: 2, hp: 20, capacity: 5, speed: 2 },
    starterSkills: ["cleave", "endure"]
  },
  mage: {
    label: "Маг",
    description: "Повелитель стихий. Контролирует стихии и наносит урон по площади.",
    icon: "/assets/heroes/mage.png",
    baseBonuses: { attack: 4, defense: 0, hp: 10, capacity: 3, speed: 3 },
    starterSkills: ["fireball", "icewall"]
  },
  astral_mage: {
    label: "Астральный маг",
    icon: "/assets/heroes/astral_mage.png",
    description: "Владыка астрала. Получает бонусы при добыче астральных кристаллов.",
    baseBonuses: { attack: 3, defense: 1, hp: 13, capacity: 2, speed: 4, astralPower: 5 },
    starterSkills: ["astral_blast", "crystal_harvest"],
    unlockResource: "astral_crystal"
  },
  archer: {
    label: "Лучник",
    description: "Смертельно опасен на дальних дистанциях.",
    icon: "/assets/heroes/archer.png",
    baseBonuses: { attack: 3, defense: 1, hp: 14, capacity: 3, speed: 4 }
  },
  priest: {
    label: "Жрец",
    description: "Лечит и поддерживает команду.",
    icon: "/assets/heroes/priest.png",
    baseBonuses: { attack: 1, defense: 2, hp: 12, capacity: 4, speed: 3 }
  },
  assassin: {
    label: "Ассасин",
    description: "Высокий урон по одиночной цели, увеличенная скорость.",
    icon: "/assets/heroes/assassin.png",
    baseBonuses: { attack: 4, defense: 1, hp: 11, capacity: 2, speed: 5 }
  },
  paladin: {
    label: "Паладин",
    description: "Святой рыцарь с универсальными навыками. Смешанный класс: защита, лечение, ударная мощь.",
    icon: "/assets/heroes/paladin.png",
    baseBonuses: { attack: 2, defense: 3, hp: 18, capacity: 5, speed: 3 }
  }
};
