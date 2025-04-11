// app/dominum/page.tsx
'use client';

import { ResourcesBar } from "@/components/Resources/ResourcesBar";
import styles from "./DominumPage.module.css";
import { DOMHeader } from "../../components/Headers/DOMHeader";
import { DOMFooter } from "../../components/DOMFooter/DOMFooter";


export default function DominumPage() {      
  
  return (
    <div className={styles.page_wrapper}>
      <DOMHeader />

      <div className={styles.icons_wrapper}>
        <ResourcesBar />
      </div>

      <div className={styles.page_content}>
        <img src="/Dominum/ship-1.jpg" alt="icon" />
      </div>

      <DOMFooter />
    </div>
  );
};
