'use client';

import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';
import { ResourcesBar } from '@/components/Resources/ResourcesBar';
import { LordInfo } from '@/components/Lord/LordInfo';
import { PrestigeBar } from '@/components/Lord/PrestigeBar';

export default function LordPage() {
  return (
    <div>
      <DOMHeader />

      <div style={{padding: "1rem"}}>
        <ResourcesBar />
        <LordInfo />
        <PrestigeBar />
      </div>

      <DOMFooter />
    </div>
  )
}