// app/page.tsx
'use client';
        
import { useTonWallet } from '@tonconnect/ui-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic"; // ✅

import styles from "./page.module.css";

// ✅ оборачиваем кнопку, чтобы не ломала SSR
const TonConnectButton = dynamic(
  () => import("@tonconnect/ui-react").then((m) => m.TonConnectButton),
  { ssr: false }
);

export default function Home() {
  const wallet = useTonWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet?.account?.address) {
      router.push('/menu');
    } else {
      router.push('/')
    }
  }, [wallet]);

  return (
    <div className={styles.login_bg_wrapper}>
      <div className={styles.login_inner}>
        <h4 className={styles.login_title}>Dominum Space</h4>
        <img src="/img/contract_actral_island.png" alt="" />

        <p className={styles.login_text}>
          You won't get through here unless
          you use a crypto wallet as a key.
        </p>

        <div style={{ margin: "auto" }}>
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
}
