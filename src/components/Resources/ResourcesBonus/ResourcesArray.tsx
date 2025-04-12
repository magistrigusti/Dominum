// ✅ Новый компонент ResourcesArray.tsx
'use client';

import { ResourcesBonus } from '@/components/Resources/ResourcesBonus/ResourcesBonus';

export const BonusResources = () => {
  return (
    <>
      <ResourcesBonus
        resource="food"
        amount={60}
        icon="/icons/resources/food.png"
        cooldownMs={1 * 60 * 60}
        mineDurationMs={1000 * 60 * 60}
      />
      <ResourcesBonus
        resource="wood"
        amount={50}
        icon="/icons/resources/wood.png"
        cooldownMs={1 * 60 * 60 * 2}
        mineDurationMs={1000 * 60 * 60 * 2}
      />
      <ResourcesBonus
        resource="stone"
        amount={40}
        icon="/icons/resources/stone.png"
        cooldownMs={1 * 60 * 60 * 3}
        mineDurationMs={1000 * 60 * 60 * 3}
      />
      <ResourcesBonus
        resource="iron"
        amount={25}
        icon="/icons/resources/iron.png"
        cooldownMs={1 * 60 * 60 * 4}
        mineDurationMs={1000 * 60 * 60 * 4}
      />
      <ResourcesBonus
        resource="gold"
        amount={10}
        icon="/icons/resources/gold.png"
        cooldownMs={1 * 60 * 60 * 6}
        mineDurationMs={1000 * 60 * 60 * 6}
      />
    </>
  );
};
