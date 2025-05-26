// app/dominum/page.tsx
'use client';
import Link from 'next/link';
import { Ship } from "@/components/Ship/Ship";
import { useEffect, useState } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { useRouter } from 'next/navigation';
import styles from "./DominumPage.module.css";
import { DOMHeader } from "@/components/Headers/DOMHeader";
import { DOMFooter } from "@/components/DOMFooter/DOMFooter";
import { ResourcesBar } from "@/components/Resources/ResourcesBar/ResourcesBar";
import { QuestButton } from "@/components/Quests/QuestButton/QuestButton";
import { useUser } from '@/contexts/UserContext';

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
          <Link href="/dominum/allods">
            <img
              className={styles.map_image}
              src="/dominum/allods/start-island.png"
              alt="Остров"
              style={{ cursor: 'pointer' }}
            />
          </Link>

          <Ship onClick={() => console.log("🚢 Корабль кликнут")} />
        </div>
      </div>


      <DOMFooter />
    </div>
  );
}
