'use client';

import { ReactNode, useEffect, useState } from 'react';
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { UserProvider } from '@/context/UserContext';

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div >
      <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{
        borderRadius: 's',
        colorsSet: {
          [THEME.DARK]: {
            connectButton: { background: 'orange' },
          },
        },
      }}
    >
      <UserProvider>{children}</UserProvider>
        </TonConnectUIProvider>
      </div>
    </div>
    
  );
}
