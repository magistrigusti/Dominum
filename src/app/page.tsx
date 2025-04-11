'use client';
import { useTonWallet } from '@tonconnect/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from "./page.module.css";

export default function Home() {
  const wallet = useTonWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet?.account?.address) {
      router.push('/menu');
    } else {
      router.push('/login')
    }
  }, [wallet]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
          fuck
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
