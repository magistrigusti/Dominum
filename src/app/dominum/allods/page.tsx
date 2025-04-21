// ✅ app/dominum/allods/page.tsx
'use client';

import styles from './AllodsPage.module.css';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';
import { StartIsland } from '@/components/Allods/StartIsland/StartIsland';
import { ResourcesBar } from "@/components/Resources/ResourcesBar/ResourcesBar";

export default function AllodsPage() {
  return (
    <div className={styles.allods_wrapper}>
      <DOMHeader />

      <div className={styles.icons_wrapper}>
        <ResourcesBar />
      </div>

      <div className={styles.map_scroll_area}>
        <StartIsland onOpenNode={(nodeId) => {
          console.log("Открыть точку с ID:", nodeId);
        }} />
      </div>

      <DOMFooter />
    </div>
  )
}