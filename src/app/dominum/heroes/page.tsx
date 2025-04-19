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

const

export default function HeroesPage() {
  const { state } = useUser();
  const heroes = state.heroes || [];
  const [selectedHero, setSelectedHero] = useState<Hero | null>(heroes[0] || null);

  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!selectedHero && heroes.length > 0) {
      setSelectedHero(heroes[0]);
    }
  }, [heroes]);

  if (!hasMounted) return null;

  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />
      <div className={styles.hero_main_container}>
        {selectedHero && (
          <>
            <HeroViewer hero={selectedHero} />
            <HeroSelector
              heroes={heroes}
              selectedHero={selectedHero}
              onSelect={setSelectedHero}
            />
          </>
        )}
      </div>
      <DOMFooter />
    </div>
  );
}

