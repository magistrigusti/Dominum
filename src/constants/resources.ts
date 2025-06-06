// src/constants/resources.ts
import { UserState } from "@/contexts/UserContext";

type ResourceKey = keyof Pick<
  UserState,
  "food" | "wood" | "stone" | "iron" | "gold" | "doubloon" | "pearl" | "allodium"
>;

export type ResourceConfig = {
  key: ResourceKey;
  label: string;
  icon: string;
};

// ✅ фиксируем массив как readonly
export const RESOURCE_CONFIG = [
  { key: "food", label: "Еда", icon: "/icons/resources/food.png", avatar: "/icons/resources/food-1.png", },
  { key: "wood", label: "Дерево", icon: "/icons/resources/wood.png", avatar: "/icons/resources/wood-1.png", },
  { key: "stone", label: "Камень", icon: "/icons/resources/stone.png", avatar: "/icons/resources/stone-1.png", },
  { key: "iron", label: "Железо", icon: "/icons/resources/iron.png", avatar: "/icons/resources/iron-1.png", },
  { key: "gold", label: "Золото", icon: "/icons/resources/gold.png", avatar: "/icons/resources/gold-1.png", },
  { key: "doubloon", label: "Дублоны", icon: "/icons/resources/doubloon.png", avatar: "/icons/resources/gold-1.png", },
  { key: "pearl", label: "Жемчуг", icon: "/icons/resources/pearl.png", avatar: "/icons/resources/gold-1.png", },
  { key: "allodium", label: "Allodium", icon: "/icons/resources/allodium.png", avatar: "/icons/resources/gold-1.png", },
] as const;

export const RESOURCE_DIFFICULTY: Record<ResourceType, number> = {
  food: 1,
  wood: 1.2,
  stone: 1.5,
  iron: 2,
  gold: 3,
  doubloon: 4.5,
  pearl: 7,
  allodium: 10, // исправлено с astralCristal
};


export type ResourceType = typeof RESOURCE_CONFIG[number]["key"];
