// 📄 src/services/battleService.ts
import BattleModel from "@/models/BattleModel";
import { Battle } from "@/types/Battle";
import { ArmyUnit } from "@/types/Army";

// Псевдо-функция боя (расчёт делай как тебе надо)
export const startBattle = async (
  participants: string[],
  heroes: string[],
  armies: ArmyUnit[][]
) => {
  const battle = await BattleModel.create({
    participants,
    heroes,
    armies,
    result: "", // результат боя
    startedAt: new Date(),
  });
  return battle;
};

export const getBattleResult = async (battleId: string) => {
  return BattleModel.findById(battleId);
};
