'use client';
import Link from "next/link";
import { TonConnectButton} from "@tonconnect/ui-react";
import styles from "./DOMHeader.module.css";

export const DOMHeader = () => {

  return (
    <div style={{ display: "flex", alignItems: "center", width: "80%"}}>
      <div className={styles.user_header_wrapper}>
        <Link className={styles.user_link} href="/user">
          <img
            className={styles.user_img}
            src="/icons/user-icon.png"
            alt="User Profile"
          />
          <p>Magistru</p>
        </Link>

        <TonConnectButton />
      </div>
    </div>
  );
};
