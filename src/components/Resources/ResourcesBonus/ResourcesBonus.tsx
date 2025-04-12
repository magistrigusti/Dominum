// ResouresBonus.tsx
'use client';

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import styles from './ResourcesBonus.module.css';

// 🔑 Типы ресурсов
export type ResourcesKey =
  | "food" | "wood" | "stone" | "iron"
  | "gold" | "doubloon" | "pearl" | "allodium";

interface ResourcesBonusProps {
  resource: ResourcesKey;
  amount: number;
  icon: string;
  cooldownMs?: number;
  mineDurationMs?: number;
}

interface BonusData {
  miningStart?: number;
  cooldownStart?: number;
  position?: { top: string; left: string };
}

interface ExtendedUserState {
  address: string;
  [key: string]: any;
  activeBonuses?: Record<string, BonusData>;
}

export const ResourcesBonus = ({
  resource,
  amount,
  icon,
  cooldownMs = 1000 * 60 * 60 * 2,
  mineDurationMs = 1000 * 30,
}: ResourcesBonusProps) => {
  const { state, dispatch } = useUser();
  const typedState = state as ExtendedUserState;
  const activeBonuses: Record<string, BonusData> = typedState.activeBonuses || {};
  const userBonus: BonusData | undefined = activeBonuses[resource];

  const [position, setPosition] = useState<{ top: string; left: string }>({ top: "0%", left: "0%" });
  const [timeLeft, setTimeLeft] = useState(0);
  const [mining, setMining] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!typedState?.address || !typedState?.activeBonuses) return; // ⛔ Не загружен пользователь

    const now = Date.now();

    if (userBonus?.miningStart && now - userBonus.miningStart < mineDurationMs) {
      const remaining = Math.ceil((mineDurationMs - (now - userBonus.miningStart)) / 1000);
      setMining(true);
      setTimeLeft(remaining);
      setPosition(userBonus.position!);
      return;
    }

    if (userBonus?.cooldownStart && now - userBonus.cooldownStart < cooldownMs) {
      return;
    }

    setAvailable(true);
    if (userBonus?.position) {
      setPosition(userBonus.position);
    } else {
      const top = Math.floor(Math.random() * 50) + 5;
      const left = Math.floor(Math.random() * 50) + 15;
      const pos = { top: `${top}%`, left: `${left}%` };
      setPosition(pos);
    }
  }, [typedState]);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    parts.push(`${s}s`);
    return parts.join(" ");
  };

  const handleClick = async () => {
    const miningStart = Date.now();
    const newBonus: BonusData = {
      miningStart,
      position,
    };

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: typedState.address,
          activeBonuses: {
            ...activeBonuses,
            [resource]: newBonus,
          },
        }),
      });

      if (res.ok) {
        setMining(true);
        setTimeLeft(mineDurationMs / 1000);
      }
    } catch (err) {
      console.error("❌ Ошибка при запуске добычи:", err);
    }
  };

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

  const finishMining = async () => {
    const cooldownStart = Date.now();
    const newBonus: BonusData = {
      cooldownStart,
      position,
    };

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: typedState.address,
          [resource]: typedState[resource] + amount,
          activeBonuses: {
            ...activeBonuses,
            [resource]: newBonus,
          },
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        dispatch({ type: "SET_USER", payload: updated });
        setAvailable(false);
        setMining(false);
      }
    } catch (err) {
      console.error(`❌ Ошибка при начислении ресурса ${resource}:`, err);
    }
  };

  if (!available && !mining) return null;

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
          ⏳ {formatTime(timeLeft)}
        </div>
      )}
    </div>
  );
};