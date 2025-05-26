// 📄 src/config/ARMY_CONFIG.ts

export type ArmyUnitType = 'peasant' | 'sailor' | 'axeman' | 'spearman' | 'archer' | 'cavalry';

export interface ArmyUnitConfig {
  unitType: ArmyUnitType;
  label: string;
  icon: string;
  description?: string;
  class?: string;
}

export const ARMY_CONFIG: Record<ArmyUnitType, ArmyUnitConfig> = {
  peasant: {
    unitType: "peasant",
    label: "Крестьянин",
    icon: "/icons/army/peasant.png",
    description: "Базовый работник, может добывать и носить ресурсы.",
    class: "worker",
  },
  sailor: {
    unitType: "sailor",
    label: "Моряк",
    icon: "/icons/army/sailor.png",
    description: "Опытный моряк, быстро перемещается по воде.",
    class: "support",
  },
  axeman: {
    unitType: "axeman",
    label: "Пехотинец",
    icon: "/icons/army/axeman.png",
    description: "Тяжёлый пехотинец, эффективен против построек.",
    class: "melee",
  },
  spearman: {
    unitType: "spearman",
    label: "Копейщик",
    icon: "/icons/army/spearman.png",
    description: "Лучше всего против кавалерии и монстров.",
    class: "melee",
  },
  archer: {
    unitType: "archer",
    label: "Лучник",
    icon: "/icons/army/archer.png",
    description: "Стреляет на дальние дистанции, эффективен против легкой пехоты.",
    class: "ranged",
  },
  cavalry: {
    unitType: "cavalry",
    label: "Кавалерия",
    icon: "/icons/army/cavalry.png",
    description: "Быстрая атака и мобильность, уязвима для копейщиков.",
    class: "cavalry",
  },
};
