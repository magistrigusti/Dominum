'use client';

import { useRouter } from 'next/navigation';
import styles from './MenuPage.module.css';
import { DOMHeader } from '../../components/Headers/DOMHeader';
import Link from 'next/link';

export default function MenuPage() {
  const router = useRouter();

  return (
    <div className={styles.memu_containte}>
      <DOMHeader />

      <h2 className={styles.menu_title}>
        Welcome to the <br />
        crypto space <br /> 
        Dominum <br />
        which is the entrance <br />
        to the crypto meta universe Allodium
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
