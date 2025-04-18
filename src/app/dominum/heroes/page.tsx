'use client';
import { Hero } from '@/types/heroes';
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
    quality: 'normal' as const,
    level: 1,
    exp: 0,
    expToNext: 100,
  },
  {
    id: '2',
    name: 'Добытчик',
    image: '/dominum/heroes/hero-workin-grey-2.png',
    quality: 'normal' as const,
    level: 1,
    exp: 0,
    expToNext: 120,
  },
];


export default function HeroesPage() {
const [selectedHero, setSelectedHero] = useState<Hero>(dummyHeroes[0]);


  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.hero_main_container}>
        <HeroViewer hero={selectedHero} />

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