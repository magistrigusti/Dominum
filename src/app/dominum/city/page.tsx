'use client';

import styles from './CityPage.module.css';
import { useRouter } from 'next/navigation';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';

export default function CityPage() {
  const router = useRouter();

  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.main_content}>
        <img
          src="/dominum/backGround/city_bg.png"
          alt="city background"
          className={styles.city_image}
        />

        <div className={styles.icon_wrapper}>
          <img
            src="/img/castle_icon.png"
            alt="Замок"
            className={styles.icon}
            style={{ top: '18%', left: '18%' }}
          />
          <img
            src="/img/forge_icon.png"
            alt="Кузня"
            className={styles.icon}
            style={{ top: '52%', left: '58%' }}
          />
          <img
            src="/img/dock_icon.png"
            alt="Причал"
            className={styles.icon}
            style={{ top: '70%', left: '25%' }}
          />
          <img
            src="/img/auction_icon.png"
            alt="Аукцион"
            className={styles.icon}
            style={{ top: '35%', left: '35%' }}
          />
        </div>
      </div>

      <DOMFooter />
    </div>
  );
}
