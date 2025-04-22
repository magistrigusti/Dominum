// app/dominum/heroes/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Hero } from '@/types/heroes';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';
import { ArmyBar } from '@/components/UI/ArmyBar/ArmyBar';
import styles from './HeroesPage.module.css';

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
};

export default function HeroesPage() {
  const hasMounted = useHasMounted();
  const { state } = useUser();
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const heroes = state.heroes || [];
const allArmy = state.army || {};
const activeMissions = state.missions || [];

// Вычесть армию, занятую в миссиях
const usedArmy: Partial<typeof allArmy> = {};
for (const mission of activeMissions) {
  for (const unit in mission.heroArmy) {
    const { count } = mission.heroArmy[unit as keyof typeof mission.heroArmy]!;
    if (!usedArmy[unit]) {
      usedArmy[unit] = { level: allArmy[unit]?.level || 1, count: 0 };
    }
    usedArmy[unit]!.count += count;
  }
}

// Оставшаяся доступная армия
const availableArmy = Object.fromEntries(
  Object.entries(allArmy).map(([unit, { level, count }]) => {
    const used = usedArmy[unit]?.count || 0;
    return [unit, { level, count: count - used }];
  })
);


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

        <ArmyBar army={availableArmy} />
      </div>
      <DOMFooter />
    </div>
  );
}
