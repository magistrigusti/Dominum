// ✅ app/dominum/allods/page.tsx
'use client';

import styles from './AllodsPage.module.css';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';

export default function AllodsPage() {
  return (
    <div className={styles.allods_wrapper}>
      <DOMHeader />

      <div>
        <div>
          
        </div>
      </div>

      <DOMFooter />
    </div>
  )
}