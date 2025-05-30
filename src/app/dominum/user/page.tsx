// src/app/user/page.tsx
'use client';
import { useUser } from '@/contexts/UserContext';
import styles from './UserPage.module.css';

export default function UserPage() {
  const { state } = useUser();

  return (
    <div className={styles.user_wrapper}>
      {/* Верхний блок — аватар + имя + баланс */}
      <div className={styles.profile_header}>
        <img
          src={state.avatar || '/img/default-avatar.png'}
          alt="avatar"
          className={styles.avatar}
        />
        <div className={styles.profile_info}>
          <div className={styles.name}>{state.name || 'Пользователь'}</div>
          <div className={styles.balance_label}>Общий баланс</div>
          <div className={styles.balance}>${state.balance || '0.00'}</div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className={styles.actions}>
        <button>Экипаж</button>
        <button>NFT</button>
        <button>Marketplace</button>
      </div>

      {/* Клеймы, чекапы */}
      <div className={styles.quest_box}>
        <span>Ежедневный бонус</span>
        <button className={styles.claim_btn}>Забрать</button>
        <div className={styles.next_claim}>Следующий через 09ч 00м</div>
      </div>

      {/* Балансы, токены, очки */}
      <div className={styles.points_section}>
        <div className={styles.token_box}>
          <img src="/icons/dom-token.png" alt="DOM" />
          <span>DOMINUM</span>
          <span className={styles.token_value}>{state.tokens?.dominum || 0}</span>
        </div>
        <div className={styles.token_box}>
          <img src="/icons/ton-token.png" alt="TON" />
          <span>TON</span>
          <span className={styles.token_value}>{state.tokens?.ton || 0}</span>
        </div>
        {/* Добавь свои ресурсы и NFT */}
      </div>

      {/* Навигация снизу */}
      <nav className={styles.footer_nav}>
        <button className={styles.active}>Профиль</button>
        <button>Корабль</button>
        <button>Остров</button>
        <button>NFT</button>
        <button>Кошелек</button>
      </nav>
    </div>
  );
}
