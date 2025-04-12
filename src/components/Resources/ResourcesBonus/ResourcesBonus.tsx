'use client';

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import styles from './ResourcesBonus.module.css';

type ResourcesKey = | "food" | "wood" | "stone" | "iron" | "gold" | "doubloon" | "pearl" | "allodium";

interface ResourcesBonusProps {
  resource: ResourcesKey;
  amount: number;
  icon: string;
  cooldownMs?: number;
}

export const ResourcesBonus = ({
  resource,
  amount,
  icon,
  cooldownMs = 1000 * 60 * 60 * 2,
}: ResourcesBonusProps) => {
  const { state, dispatch } = useUser();
  const [available, setAvailable] = useState(false);
  const [position, setPosition] = useState<{top: string; left: string}>({ top: "0%", left: "0%"});

  const storageKey = `lastClaim_${resource}`;

  useEffect(() => {
    const lastClick = localStorage.getItem(storageKey);
    const now = Date.now();

    if (!lastClick || now - Number(lastClick) >= cooldownMs) {
      setAvailable(true);
    }

    const interval = setInterval(() => {
      const last = localStorage.getItem(storageKey);

      if (!last || Date.now() - Number(last) >= cooldownMs) {
        setAvailable(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [storageKey, cooldownMs]);

  useEffect(() => {
    if (available) {
      const top = Math.floor(Math.random() * 50) + 10;
      const left = Math.floor(Math.random() * 50) + 20;
      setPosition({top: `${top}%`, left: `${left}%`});
    }
  }, [available]);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          address: state.address,
          [resource]: state[resource] + amount,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        dispatch({type: "SET_USER", payload: updated});
        localStorage.setItem(storageKey, String(Date.now()));
        setAvailable(false);
      }
    } catch (err) {
      console.error(`❌ Ошибка при начислении ресурса ${resource}:`, err);
    }
  };

  if (!available) return null;

  return (
    <div className={styles.bonus_wrapper}
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={handleClick}
    >
      <img className={styles.bonus_icon}
        src={icon}
        alt={`Забрать ${resource}`}
      />
    </div>
  )

}