import styles from "./LoginPage.module.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react';
import { useTonWallet } from '@tonconnect/ui-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserProvider } from '@/app/context/UserContext';




export default function Home() {
  const wallet = useTonWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet?.account?.address) {
      router.push('/menu');
    }
  }, [wallet]);

  return (
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
      <UserProvider>
        <div className={styles.login_bg_wrapper}>
          <div className={styles.login_inner}>
            <div>
              <h4 className={styles.login_title}>Dominum Space</h4>
              <img src="/img/contract_actral_island.png" alt="" />

              <p className={styles.login_text}>
                You won't get through here unless
                you use a crypto wallet as a key.
              </p>
            </div>

            <div style={{ margin: "auto" }}>
              <TonConnectButton />
            </div>
          </div>
        </div>
      </UserProvider>
    </TonConnectUIProvider>

  );
}
