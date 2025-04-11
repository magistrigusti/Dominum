'use client';
import styles from "./LoginPage.module.css";
import { TonConnectButton} from "@tonconnect/ui-react";
import { useTonWallet } from '@tonconnect/ui-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const LoginPage = () => {
  const wallet = useTonWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet?.account?.address) {
      router.push('/menu');
    }
  }, [wallet]);

  return (
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

  );
};
