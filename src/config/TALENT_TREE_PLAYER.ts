// 📄 src/config/TALENT_TREE_PLAYER.ts

export interface PlayerTalentNode {
  id: string;
  name: string;
  description: string;
  requiredPrestige: number;
  icon: string;
  bonus: { [stat: string]: number };
  next?: string[]; // id следующих нод
}

export const TALENT_TREE_PLAYER: PlayerTalentNode[] = [
  {
    id: "prestige_army_1",
    name: "Боевая подготовка I",
    description: "Увеличивает атаку всех войск на 2%.",
    requiredPrestige: 500,
    icon: "/assets/talents/army_attack.png",
    bonus: { armyAttack: 2 },
    next: ["prestige_resource_1"],
  },
  {
    id: "prestige_resource_1",
    name: "Ресурсная хватка I",
    description: "Увеличивает скорость добычи ресурсов на 3%.",
    requiredPrestige: 1500,
    icon: "/assets/talents/resource_speed.png",
    bonus: { miningSpeed: 3 },
    next: ["prestige_prestige_1"],
  },
  {
    id: "prestige_prestige_1",
    name: "Престиж нации I",
    description: "Увеличивает получаемый престиж за квесты на 5%.",
    requiredPrestige: 3500,
    icon: "/assets/talents/prestige.png",
    bonus: { prestigeGain: 5 },
    next: ["prestige_army_2"],
  },
  {
    id: "prestige_army_2",
    name: "Боевая подготовка II",
    description: "Увеличивает атаку всех войск ещё на 3%.",
    requiredPrestige: 7000,
    icon: "/assets/talents/army_attack_2.png",
    bonus: { armyAttack: 3 },
    next: ["prestige_resource_2"],
  },
  {
    id: "prestige_resource_2",
    name: "Ресурсная хватка II",
    description: "Скорость добычи ресурсов увеличивается ещё на 5%.",
    requiredPrestige: 14000,
    icon: "/assets/talents/resource_speed_2.png",
    bonus: { miningSpeed: 5 },
    next: ["prestige_prestige_2"],
  },
  {
    id: "prestige_prestige_2",
    name: "Престиж нации II",
    description: "Престиж за квесты увеличивается ещё на 10%.",
    requiredPrestige: 25000,
    icon: "/assets/talents/prestige_2.png",
    bonus: { prestigeGain: 10 },
    // Это может быть последняя ветка, либо можно добавить больше.
  },
];
