'use client';

import { useState } from 'react';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';
import styles from './HeroesPage.module.css';

const dummyHeroes = [
  {
    id: '1',
    name: 'Добытчик',
    image: '/dominum/heroes/hero-workin-grey.png',
    quality: 'обычный',
    level: 1,
    exp: 10,
    expToNext: 100,
  },
  {
    id: '2',
    name: 'Добытчик',
    image: '/dominum/heroes/hero-workin-grey-2.png',
    quality: 'обычный',
    level: 2,
    exp: 30,
    expToNext: 120,
  },
];

export default function HeroesPage() {
  const [selectedHero, setSelectedHero] = useState(dummyHeroes[0]);

  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.hero_main_container}>
        <HeroViewer hero={selectedHero} />

        {/* Пол под героем */}
        <div style={{
          width: '120px',
          height: '16px',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.25), rgba(0,0,0,0))',
          margin: '0 auto -30px auto',
          borderRadius: '50%',
          filter: 'blur(4px)',
          transform: 'scale(1.3)'
        }} />

        <HeroSelector
          heroes={dummyHeroes}
          selectedHero={selectedHero}
          onSelect={setSelectedHero}
        />

      </div>

      <DOMFooter />
    </div>
  );
}