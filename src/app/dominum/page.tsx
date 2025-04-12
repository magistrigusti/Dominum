// app/dominum/page.tsx
'use client';
import { ResourcesBonus } from "@/components/Resources/ResourcesBonus/ResourcesBonus";
import styles from "./DominumPage.module.css";
import { DOMHeader } from "../../components/Headers/DOMHeader";
import { DOMFooter } from "../../components/DOMFooter/DOMFooter";
import { ResourcesBar } from "@/components/Resources/ResourcesBar";

export default function DominumPage() {

  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.icons_wrapper}>
        <ResourcesBar />
      </div>



      <div className={styles.map_container}>
        <img src="/dominum/allod.png" alt="Остров" className={styles.map_image} />

        <div className={styles.icons_food}>
          <ResourcesBonus
            resource="food"
            amount={50}
            icon="/icons/resources/food.png"
            cooldownMs={1 * 60 * 60}
          />

          <ResourcesBonus
            resource="gold"
            amount={10}
            icon="/icons/resources/gold.png"
            cooldownMs={1 * 60 * 60 * 4}
          />

          <ResourcesBonus
            resource="wood"
            amount={30}
            icon="/icons/resources/wood.png"
            cooldownMs={1 * 60 * 60 * 2}
          />

        </div>
      </div>


      <DOMFooter />
    </div>
  );
};
