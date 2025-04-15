// app/dominum/page.tsx
'use client';
import { Ship } from "@/components/Ship/Ship";
import { useEffect } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { useRouter } from 'next/navigation';
import styles from "./DominumPage.module.css";
import { DOMHeader } from "@/components/Headers/DOMHeader";
import { DOMFooter } from "@/components/DOMFooter/DOMFooter";
import { ResourcesBar } from "@/components/Resources/ResourcesBar";
import { QuestButton } from "@/components/Quests/QuestButton/QuestButton";
import { useUser } from '@/context/UserContext';

export default function DominumPage() {
  const wallet = useTonWallet();
  const router = useRouter();
  const { state } = useUser();

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

      <QuestButton />

      <div className={styles.map_container}>
        <div className={styles.floating_island}>
          <img className={styles.map_image}
            src="/dominum/allod-2-1.png" alt="Остров"
          />

          <Ship
            onClick={() => console.log("🚢 Корабль кликнут")}
            src={state.questShipRepaired
              ? "/dominum/ships/ship-fixed.png"
              : "/dominum/ships/ship-start.png"}
            position={state.questShipRepaired
              ? { top: '90%', left: '50%' }
              : { top: '22%', left: '18%' }}
          />

        </div>
      </div>

      <DOMFooter />
    </div>
  );
}
