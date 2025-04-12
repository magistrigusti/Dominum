// app/dominum/page.tsx
'use client';

import { useEffect } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { useRouter } from 'next/navigation';

import { ResourcesBonus } from "@/components/Resources/ResourcesBonus/ResourcesBonus";
import styles from "./DominumPage.module.css";
import { DOMHeader } from "../../components/Headers/DOMHeader";
import { DOMFooter } from "../../components/DOMFooter/DOMFooter";
import { ResourcesBar } from "@/components/Resources/ResourcesBar";

export default function DominumPage() {
  const wallet = useTonWallet();
  const router = useRouter();

  // 👮 редирект на логин, если кошелек отключён
  useEffect(() => {
    if (!wallet?.account?.address) {
      router.push('/');
    }
  }, [wallet, router]);

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
        </div>
      </div>

      <DOMFooter />
    </div>
  );
}
