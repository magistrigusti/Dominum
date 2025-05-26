// 📄 src/config/heroes/HERO_SKILLS.ts

export interface HeroSkillConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "active" | "passive";
  cooldown?: number;
}

export const HERO_SKILLS: HeroSkillConfig[] = [
  {
    id: "fireball",
    name: "Огненный шар",
    description: "Наносит большой урон врагу.",
    icon: "/assets/skills/fireball.png",
    type: "active",
    cooldown: 30,
  },
  {
    id: "toughness",
    name: "Стойкость",
    description: "Увеличивает защиту на 10%.",
    icon: "/assets/skills/toughness.png",
    type: "passive",
  },
  // ... другие скиллы
];
