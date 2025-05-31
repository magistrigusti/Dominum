'use client';

import { useTon } from '@/contexts/TonContext';
import Image from 'next/image';
import styles from './user.module.css';

export default function UserPage() {
  const { tonBalance, jettons, nfts } = useTon();

  const hasIsland = true; // 💡 позже подставим из UserContext

  return (
    <div className={styles.container}>
      <h1>👤 Профиль игрока</h1>

      <section className={styles.balanceSection}>
        <h2>💰 Баланс TON</h2>
        <p>{Number(tonBalance) / 1e9} TON</p>
      </section>

      <section className={styles.tokenSection}>
        <h2>🪙 Jettons</h2>
        {jettons.length === 0 ? (
          <p>Нет токенов</p>
        ) : (
          jettons.map((jetton) => (
            <div key={jetton.jetton.address} className={styles.item}>
              <Image
                src={jetton.jetton.image || '/img/token_placeholder.png'}
                alt={jetton.jetton.name}
                width={32}
                height={32}
              />
              <span>{jetton.jetton.name} — {Number(jetton.balance) / 10 ** jetton.jetton.decimals}</span>
            </div>
          ))
        )}
      </section>

      <section className={styles.nftSection}>
        <h2>🎨 NFT</h2>
        {nfts.length === 0 ? (
          <p>Нет NFT</p>
        ) : (
          <div className={styles.nftGrid}>
            {nfts.map((nft) => (
              <div key={nft.address} className={styles.nftItem}>
                <Image
                  src={nft.previews?.[0]?.url || '/img/nft_placeholder.png'}
                  alt={nft.name || 'NFT'}
                  width={128}
                  height={128}
                />
                <p>{nft.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <button>👥 Друзья</button>
        <button>🚀 Корабль</button>
        {hasIsland && <button>🪐 Остров</button>}
      </footer>
    </div>
  );
}
