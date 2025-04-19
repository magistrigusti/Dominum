'use client';

import { useRouter } from 'next/navigation';
import styles from './MenuPage.module.css';
import { DOMHeader } from '../../components/Headers/DOMHeader';
import Link from 'next/link';
import { useEffect } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';
import { useUser } from '@/context/UserContext';

export default function MenuPage() {
  const router = useRouter();
  const wallet = useTonWallet();
  const { dispatch } = useUser();

  useEffect(() => {
    if (wallet?.account?.address) {
      fetch('/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({address: wallet.account.address}),
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          dispatch({type: "SET_USER", payload: data});
          console.log('✅ Данные пользователя загружены на MenuPage', data);
        } else {
          console.error('❌ Ошибка ответа сервера:', data.error);
        }
      })
      .catch(err => console.error('❌ Ошибка fetch на MenuPage:', err));
    } else {
      router.push('/');
    }
  }, [wallet?.account?.address, router, dispatch]);

  return (
    <div className={styles.menu_container}>
      <DOMHeader />

      <h2 className={styles.menu_title}>
        Welcome to the <br />
        crypto space <br /> 
        Dominum <br />
      </h2>

      <div className={styles.icon_grid}>
        <Link href="/dominum">
          <img src="/icons/iconsDominum.png" alt="Dominum" className={styles.icon} />
        </Link>
        {/* <Link href="/mercatus">
          <img src="/icons/iconsMercatus.png" alt="Mercatus" className={styles.icon} />
        </Link>
        <Link href="/magisterium">
          <img src="/icons/iconsMagisterium.png" alt="Magisterium" className={styles.icon} />
        </Link>
        <Link href="/portal">
          <img src="/icons/iconsPortale.png" alt="Portal" className={styles.icon} />
        </Link> */}
      </div>
    </div>
  );
}
