// 📄 src/services/battleService.ts

import { ArmyUnit } from "@/types/Army";

export function calculateDamage(attacker: ArmyUnit, defender: ArmyUnit, advantageMatrix: any) {
  // ATK - DEF - ARMOR
  // const baseDamage = Math.max(0, attacker.baseStats.attack - defender.baseStats.defense - defender.baseStats.armor);
  // Учёт преимуществ
  const advantage = advantageMatrix[attacker.unitType][defender.unitType] || 1.0;
  // return baseDamage * advantage;
}

// Контратака и накопление ярости
export function handleCounterAttack(attacker: ArmyUnit, defender: ArmyUnit) {
  // Контратака один раз после своей атаки
  // ...реализовать накопление ярости и активацию умений по твоей логике!
}
