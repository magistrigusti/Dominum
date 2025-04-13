'use client';

import { useState } from 'react';
import { HeroViewer } from '@/components/Heroes/HeroViewer/HeroViewer';
import { HeroSelector } from '@/components/Heroes/HeroSelector/HeroSelector';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';

const dummyHeroes = [
  {
    id: '1',
    name: 'Добытчик',
    image: '/dominum/heroes/hero-workin-grey.png',
    quality: 'обычный',
    level: 1,
    exp: 10,
    expToNext: 1000,
  },
  {
    id: '2',
    name: 'Добытчик',
    image: '/dominum/heroes/hero-workin-grey-2.png',
    quality: 'обычный',
    level: 1,
    exp: 35,
    expToNext: 1000,
  },
];



export default function HeroesPage() {
  const [selectedHero, setSelectedHero] = useState(dummyHeroes[0]);

  return (
    <div>
      <DOMHeader />

      <div style={{padding: "1rem"}}>
        <HeroViewer hero={selectedHero} />

        <HeroSelector heroes={dummyHeroes} onSelect={setSelectedHero} />
      </div>

      <DOMFooter />
    </div>
  )
}