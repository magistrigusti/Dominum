'use client';

import styles from './CityPage.module.css';
import { useRouter } from 'next/navigation';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';

export default function CityPage() {
  const router = useRouter();

  return (
    <div className={styles.city_wrapper}>
      <DOMHeader />

      <img
        src="/dominum/backGround/city_bg.png"
        alt="city background"
        className={styles.city_image}
      />

      {/* иконки будут поверх картинки */}

      <DOMFooter />
    </div>
  );
}
