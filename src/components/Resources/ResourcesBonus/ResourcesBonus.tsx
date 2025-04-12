'use client';

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import styles from './ResourcesBonus.module.css';

type ResourcesKey =
  | "food" | "wood" | "stone" | "iron"
  | "gold" | "doubloon" | "pearl" | "allodium";

interface ResourcesBonusProps {
  resource: ResourcesKey;
  amount: number;
  icon: string;
  cooldownMs?: number;
  mineDurationMs?: number; // ⏱️ сколько длится "добыча"
}

export const ResourcesBonus = ({
  resource,
  amount,
  icon,
  cooldownMs = 1000 * 60 * 60 * 2,
  mineDurationMs = 1000 * 30, // ⏱️ по умолчанию: 30 секунд
}: ResourcesBonusProps) => {
  const { state, dispatch } = useUser();
  const [available, setAvailable] = useState(false);
  const [mining, setMining] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [position, setPosition] = useState<{top: string; left: string}>({ top: "0%", left: "0%" });

  const storageKey = `lastClaim_${resource}`;
  const miningKey = `mining_${resource}`;

  // ⏱️ Проверка, можно ли показать иконку
  useEffect(() => {
    const lastClaim = Number(localStorage.getItem(storageKey));
    const now = Date.now();

    if (!lastClaim || now - lastClaim >= cooldownMs) {
      setAvailable(true);
    }

    const interval = setInterval(() => {
      const last = Number(localStorage.getItem(storageKey));
      if (!last || Date.now() - last >= cooldownMs) {
        setAvailable(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [storageKey, cooldownMs]);

  // 📍 Устанавливаем случайную позицию
  useEffect(() => {
    if (available) {
      const top = Math.floor(Math.random() * 50) + 10;
      const left = Math.floor(Math.random() * 50) + 20;
      setPosition({ top: `${top}%`, left: `${left}%` });
    }
  }, [available]);

  // ⛏️ Обработка клика
  const handleClick = () => {
    setMining(true);
    setTimeLeft(mineDurationMs / 1000);
    localStorage.setItem(miningKey, String(Date.now()));
  };

  // ⏱️ Таймер обратного отсчета
  useEffect(() => {
    if (!mining) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishMining();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mining]);

  // ✅ Завершение добычи
  const finishMining = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: state.address,
          [resource]: state[resource] + amount,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        dispatch({ type: "SET_USER", payload: updated });
        localStorage.setItem(storageKey, String(Date.now()));
        setAvailable(false);
        setMining(false);
      }
    } catch (err) {
      console.error(`❌ Ошибка при начислении ресурса ${resource}:`, err);
    }
  };

  if (!available) return null;

  return (
    <div
      className={styles.bonus_wrapper}
      style={{ top: position.top, left: position.left }}
      onClick={!mining ? handleClick : undefined}
    >
      <img
        src={icon}
        alt={`Забрать ${resource}`}
        className={`${styles.bonus_icon} ${!mining ? styles.pulsing : ''}`}
      />
      {mining && (
        <div className={styles.timer}>
          ⏳ {timeLeft}s
        </div>
      )}
    </div>
  );
};
