// app/dominum/page.tsx
'use client';

import { useEffect } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { useRouter } from 'next/navigation';
import { BonusResources } from "@/components/Resources/ResourcesBonus/ResourcesArray";
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
        <div className={styles.bonus_zone}>
          <div>
            <img className={styles.map_image} src="/dominum/allod-1.png" alt="Остров" />
          </div>
          <BonusResources />
        </div>

        <div className={styles.ship_wrapper}>
          <img className={styles.ship_image} src="/dominum/ship-start.png" alt="Корабль" />
        </div>
      </div>



      <DOMFooter />
    </div>
  );
}
