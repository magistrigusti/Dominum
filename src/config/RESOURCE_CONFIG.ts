// 📄 src/config/RESOURCE_CONFIG.ts

export type ResourceType = "food" | "wood" | "stone" | "iron" | "gold" | "doubloon" | "pearl" | "astral_crystal" | "allodium";

interface ResourceConfig {
  label: string;
  icon: string;
  color: string;
  description?: string;
}

export const RESOURCE_CONFIG: Record<ResourceType, ResourceConfig> = {
  food: {
    label: "Еда",
    icon: "/icons/resources/food.png",
    color: "#D2B48C",
    description: "Необходима для содержания армии и строительства."
  },
  wood: {
    label: "Дерево",
    icon: "/icons/resources/wood.png",
    color: "#8B5E3C"
  },
  stone: {
    label: "Камень",
    icon: "/icons/resources/stone.png",
    color: "#BEBEBE"
  },
  iron: {
    label: "Железо",
    icon: "/icons/resources/iron.png",
    color: "#A9A9A9"
  },
  gold: {
    label: "Золото",
    icon: "/icons/resources/gold.png",
    color: "#FFD700"
  },
  doubloon: {
    label: "Дублон",
    icon: "/icons/resources/doubloon.png",
    color: "#D4AF37"
  },
  pearl: {
    label: "Жемчуг",
    icon: "/icons/resources/pearl.png",
    color: "#F8F8FF"
  },
  astral_crystal: {
    label: "Астральный кристал",
    icon: '/icons/resources/astral_crystal',
    color: "#violet"
  },
  allodium: {
    label: "Аллодиум",
    icon: "/icons/resources/allodium.png",
    color: "#00CED1"
  }
};
