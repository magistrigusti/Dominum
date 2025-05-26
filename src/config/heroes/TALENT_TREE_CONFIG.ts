// 📄 src/config/heroes/TALENT_TREE_CONFIG.ts

export interface HeroTalentNode {
  id: string;
  name: string;
  description: string;
  requiredLevel: number;
  icon: string;
  bonus: { [stat: string]: number };
  next?: string[];
}

export const HERO_TALENT_TREE: HeroTalentNode[] = [
  {
    id: "hero_hp_1",
    name: "Живучесть I",
    description: "Увеличивает здоровье героя на 10.",
    requiredLevel: 2,
    icon: "/assets/talents/hp.png",
    bonus: { hp: 10 },
    next: ["hero_attack_1"],
  },
  {
    id: "hero_attack_1",
    name: "Атака I",
    description: "Увеличивает атаку героя на 3.",
    requiredLevel: 4,
    icon: "/assets/talents/attack.png",
    bonus: { attack: 3 },
    next: ["hero_defense_1"],
  },
  {
    id: "hero_defense_1",
    name: "Защита I",
    description: "Увеличивает защиту героя на 3.",
    requiredLevel: 6,
    icon: "/assets/talents/defense.png",
    bonus: { defense: 3 },
    next: ["hero_speed_1"],
  },
  {
    id: "hero_speed_1",
    name: "Скорость I",
    description: "Увеличивает скорость героя на 2.",
    requiredLevel: 8,
    icon: "/assets/talents/speed.png",
    bonus: { speed: 2 },
    // можно продолжить дальше
  },
  // Добавь больше нод по вкусу!
];
