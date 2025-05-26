// 📄 src/config/ARMY_CONFIG.ts

export type ArmyUnitType = 'peasant' | 'sailor' | 'axeman' | 'spearman' | 'archer' | 'cavalry';

export interface ArmyUnitConfig {
  unitType: ArmyUnitType;
  label: string;
  icon: string;
  description?: string;
  class?: string;
  recruitLocation: string;
  bonus: string;
}

export const ARMY_CONFIG: Record<ArmyUnitType, ArmyUnitConfig> = {
  peasant: {
    unitType: "peasant",
    label: "Крестьянин",
    icon: "/icons/army/peasant.png",
    description: "Базовый работник, может добывать и носить ресурсы.",
    class: "worker",
    recruitLocation: "Замок",
    bonus: "Могут заходить в здания, их защита x2 в своих строениях.",
  },
  sailor: {
    unitType: "sailor",
    label: "Моряк",
    icon: "/icons/army/sailor.png",
    description: "Опытный моряк, быстро перемещается по астралу.",
    class: "support",
    recruitLocation: "Причал",
    bonus: "Бонус +50% в бою в астрале.",
  },
  axeman: {
    unitType: "axeman",
    label: "Пехотинец",
    icon: "/icons/army/axeman.png",
    description: "Тяжёлый пехотинец, эффективен против построек.",
    class: "melee",
    recruitLocation: "Казарма",
    bonus: "Повышенные показатели брони.",
  },
  spearman: {
    unitType: "spearman",
    label: "Копейщик",
    icon: "/icons/army/spearman.png",
    description: "Лучше всего против кавалерии и монстров.",
    class: "melee",
    recruitLocation: "Казарма",
    bonus: "Повышенный бонус к защите от кавалерии.",
  },
  archer: {
    unitType: "archer",
    label: "Лучник",
    icon: "/icons/army/archer.png",
    description: "Стреляет на дальние дистанции, эффективен против легкой пехоты.",
    class: "ranged",
    recruitLocation: "Стрельбище",
    bonus: "Преимущество в дальнем бою and в астрале.",
  },
  cavalry: {
    unitType: "cavalry",
    label: "Кавалерия",
    icon: "/icons/army/cavalry.png",
    description: "Быстрая атака и мобильность, уязвима для копейщиков.",
    class: "cavalry",
    recruitLocation: "Конюшня",
    bonus: "Бонус в бою на открытой местности.",
  },
};
