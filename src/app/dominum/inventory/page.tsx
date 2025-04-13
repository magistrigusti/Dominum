// ✅ app/dominum/inventory/page.tsx
'use client';

import { useEffect, useState } from 'react';
import styles from './InventoryPage.module.css';
import { DOMHeader } from '@/components/Headers/DOMHeader';
import { DOMFooter } from '@/components/DOMFooter/DOMFooter';
import { useUser } from '@/context/UserContext';

interface InventoryItem {
  id: string;
  icon: string;
  amount: number;
}

const dummyInventory: InventoryItem[] = [
  { id: 'wood', icon: '/icons/resources/wood.png', amount: 12 },
  { id: 'stone', icon: '/icons/resources/stone.png', amount: 3 },
  { id: 'gold', icon: '/icons/resources/gold.png', amount: 7 },
];

export default function InventoryPage() {
  const { state } = useUser();
}