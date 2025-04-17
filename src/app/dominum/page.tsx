// app/dominum/page.tsx
'use client';
import { Ship } from "@/components/Ship/Ship";
import { useEffect, useState } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { useRouter } from 'next/navigation';
import styles from "./DominumPage.module.css";
import { DOMHeader } from "@/components/Headers/DOMHeader";
import { DOMFooter } from "@/components/DOMFooter/DOMFooter";
import { ResourcesBar } from "@/components/Resources/ResourcesBar/ResourcesBar";
import { QuestButton } from "@/components/Quests/QuestButton/QuestButton";
import { useUser } from '@/context/UserContext';
import { ResourceNodeModal } from '@/components/Resources/ResourceNodeModal/ResourceNodeModal';

export default function DominumPage() {
  const [showModal, setShowModal] = useState(false);
  const [showSelectHero, setShowSelectHero] = useState(false);
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
          <img className={styles.map_image} src="/dominum/allod-2-1.png" alt="Остров" />

          {/* Модалка ресурса */}
          {showModal && (
            <ResourceNodeModal
              resource="wood"
              total={200}
              remaining={150}
              onCollect={() => {
                setShowModal(false);
                setShowSelectHero(true);
              }}
              onClose={() => setShowModal(false)}
            />
          )}

          <div className={styles.bonus_zone}>
            {/* если бонусы ещё остались — временно */}
          </div>

          <Ship onClick={() => console.log("🚢 Корабль кликнут")} />
        </div>
      </div>


      <DOMFooter />
    </div>
  );
}
