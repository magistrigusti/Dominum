// app/page.tsx
'use client';

import { useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './page.module.css';

const TonConnectButton = dynamic(
  () => import('@tonconnect/ui-react').then((m) => m.TonConnectButton),
  { ssr: false }
);

export default function Home() {
  const wallet = useTonWallet();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (wallet?.account?.address) {
        try {
          const res = await fetch('/api/user/check', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wallet: wallet.account.address }),
          });

          const data = await res.json();

          if (data?.exists) {
            router.push('/menu');
          } else {
            router.push('/');
          }
        } catch (err) {
          console.error('Ошибка при проверке пользователя:', err);
          router.push('/');
        } finally {
          setChecked(true);
        }
      }
    };

    checkUser();
  }, [wallet]);

  return (
    <div className={styles.login_bg_wrapper}>
      <div className={styles.login_inner}>
        <h4 className={styles.login_title}>Dominum™ Space</h4>
        <img src="/img/contract_actral_island.png" alt="" />
        <p className={styles.login_text}>
          You won't get through here unless you use a crypto wallet as a key.
        </p>
        <div style={{ margin: 'auto' }}>
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
}
