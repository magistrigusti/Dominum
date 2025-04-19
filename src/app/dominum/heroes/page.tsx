// app/dominum/heroes/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Hero } from '@/types/heroes';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';
import styles from './HeroesPage.module.css';

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
};

export default function HeroesPage() {
  const { state } = useUser();
  const heroes = state.heroes || [];
  const hasMounted = useHasMounted();

  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  useEffect(() => {
    if (!selectedHero && heroes.length > 0) {
      setSelectedHero(heroes[0]);
    }
  }, [heroes.length]);

  console.log('[HeroesPage]', {
    hasMounted,
    heroes,
    selectedHero,
    state,
  });
  

  if (!hasMounted || heroes.length === 0 || !selectedHero) return null;

  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />
      <div className={styles.hero_main_container}>
        <HeroViewer hero={selectedHero} />
        <HeroSelector
          heroes={heroes}
          selectedHero={selectedHero}
          onSelect={setSelectedHero}
        />
      </div>
      <DOMFooter />
    </div>
  );
}
