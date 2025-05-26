// 📄 src/config/RESOURCE_CONFIG.ts

export type ResourceType = "food" | "wood" | "stone" | "iron" | "gold" | "doubloon" | "pearl" | "astral_crystal" | "allodium";

interface ResourceConfig {
  label: string;
  icon: string;
  color: string;
  description?: string;
  autoRestore: boolean;
}

export const RESOURCE_CONFIG: Record<ResourceType, ResourceConfig> = {
  food: {
    label: "Еда",
    icon: "/icons/resources/food.png",
    color: "#D2B48C",
    autoRestore: true,
    description: "Необходима для содержания армии и строительства."
  },
  wood: {
    label: "Дерево",
    icon: "/icons/resources/wood.png",
    color: "#8B5E3C",
    autoRestore: true,
  },
  stone: {
    label: "Камень",
    icon: "/icons/resources/stone.png",
    color: "#BEBEBE",
    autoRestore: true,
  },
  iron: {
    label: "Железо",
    icon: "/icons/resources/iron.png",
    color: "#A9A9A9",
    autoRestore: true,
  },
  gold: {
    label: "Золото",
    icon: "/icons/resources/gold.png",
    color: "#FFD700",
    autoRestore: true,
  },
  doubloon: {
    label: "Дублон",
    icon: "/icons/resources/doubloon.png",
    color: "#D4AF37",
    autoRestore: false,
    description: "Чеканиться только на монетном дворе. один раз в сутки можно сделать заказ на чеканку",
  },
  pearl: {
    label: "Жемчуг",
    icon: "/icons/resources/pearl.png",
    color: "#F8F8FF",
    autoRestore: true,
  },
  astral_crystal: {
    label: "Астральный кристалл",
    icon: "/assets/resources/astral_crystal.png",
    color: "#5E49F7",
    autoRestore: false,
    description: "Добывается только в астрале, используется для магии и апгрейдов."
  },
  allodium: {
    label: "Аллодиум",
    icon: "/assets/resources/allodium.png",
    color: "#00CED1",
    autoRestore: false,
    description: "Редчайший минерал. Валюта и артефакт в астральном мире."
  }
};
