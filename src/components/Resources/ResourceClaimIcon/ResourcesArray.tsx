import { ResourceClaimIcon } from '@/components/Resources/ResourceClaimIcon/ResourceClaimIcon';

export const BonusResources = () => {
  return (
    <>
      <ResourceClaimIcon resource="food" icon="/icons/resources/food.png" />
      <ResourceClaimIcon resource="wood" icon="/icons/resources/wood.png" />
      <ResourceClaimIcon resource="stone" icon="/icons/resources/stone.png" />
      <ResourceClaimIcon resource="iron" icon="/icons/resources/iron.png" />
      <ResourceClaimIcon resource="gold" icon="/icons/resources/gold.png" />
    </>
  );
};
