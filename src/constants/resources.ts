// src/constants/resources.ts
import { UserState } from "@/context/UserContext";

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
  { key: "food", label: "Еда", icon: "/icons/resources/food.png" },
  { key: "wood", label: "Дерево", icon: "/icons/resources/wood.png" },
  { key: "stone", label: "Камень", icon: "/icons/resources/stone.png" },
  { key: "iron", label: "Железо", icon: "/icons/resources/iron.png" },
  { key: "gold", label: "Золото", icon: "/icons/resources/gold.png" },
  { key: "doubloon", label: "Дублоны", icon: "/icons/resources/doubloon.png" },
  { key: "pearl", label: "Жемчуг", icon: "/icons/resources/pearl.png" },
  { key: "allodium", label: "Allodium", icon: "/icons/resources/allodium.png" },
] as const;

export type ResourceType = typeof RESOURCE_CONFIG[number]["key"];
