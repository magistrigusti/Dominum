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
  mineDurationMs?: number;
}

interface BonusData {
  miningStart: number;
  position: { top: string; left: string };
}

export const ResourcesBonus = ({
  resource,
  amount,
  icon,
  cooldownMs = 1000 * 60 * 60 * 2,
  mineDurationMs = 1000 * 30,
}: ResourcesBonusProps) => {
  const { state, dispatch } = useUser();
  const activeBonuses: Record<string, BonusData> = (state as any).activeBonuses || {};
  const userBonus: BonusData | undefined = activeBonuses[resource];
  const [available, setAvailable] = useState(false);
  const [mining, setMining] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [position, setPosition] = useState<{ top: string; left: string }>({ top: "0%", left: "0%" });

  useEffect(() => {
    const now = Date.now();

    if (userBonus && userBonus.miningStart) {
      const elapsed = now - userBonus.miningStart;
      if (elapsed < mineDurationMs) {
        setMining(true);
        setTimeLeft(Math.ceil((mineDurationMs - elapsed) / 1000));
        setPosition(userBonus.position);
        return;
      }
    }

    if (!userBonus?.miningStart || now - userBonus.miningStart >= cooldownMs) {
      setAvailable(true);
      if (!userBonus?.position) {
        const top = Math.floor(Math.random() * 50) + 5;
        const left = Math.floor(Math.random() * 50) + 15;
        const pos = { top: `${top}%`, left: `${left}%` };
        setPosition(pos);
      } else {
        setPosition(userBonus.position);
      }
    }
  }, [state, resource, cooldownMs, mineDurationMs]);

  const handleClick = async () => {
    const miningStart = Date.now();
    const newBonus = {
      [resource]: {
        miningStart,
        position,
      },
    };

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: state.address,
          activeBonuses: {
            ...activeBonuses,
            ...newBonus,
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
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: state.address,
          [resource]: state[resource] + amount,
          activeBonuses: {
            ...activeBonuses,
            [resource]: undefined,
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
          ⏳ {timeLeft}s
        </div>
      )}
    </div>
  );
};