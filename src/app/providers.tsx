// src/app/providers.tsx
'use client';
import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { UserProvider } from '@/contexts/UserContext';
import { ArmyProvider } from '@/contexts/ArmyContext';
import { HeroProvider } from '@/contexts/HeroContext';
import { MissionProvider } from '@/contexts/MissionContext';
import { ShipProvider } from '@/contexts/ShipContext';
import { ResourceProvider } from '@/contexts/ResourceContext';

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
        <ArmyProvider>
          <HeroProvider>
            <MissionProvider>
              <ShipProvider>
                <ResourceProvider>
                  {children}
                </ResourceProvider>
              </ShipProvider>
            </MissionProvider>
          </HeroProvider>
        </ArmyProvider>
      </UserProvider>

    </TonConnectUIProvider>
  );
}
