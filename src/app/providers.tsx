'use client';

import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { UserProvider } from '@/context/UserContext';

// 📌 Оборачиваем UI-провайдер в dynamic
const TonConnectUIProvider = dynamic(
  () => import('@tonconnect/ui-react').then(mod => mod.TonConnectUIProvider),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{
        borderRadius: 's',
        colorsSet: {
          DARK: {
            connectButton: { background: 'orange' },
          },
        },
      }}
    >
      <UserProvider>
        {children}
      </UserProvider>
    </TonConnectUIProvider>
  );
}
