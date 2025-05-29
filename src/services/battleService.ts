// 📄 src/services/battleService.ts

import  BattleModel  from '@/models/BattleModel';
import  UserModel  from '@/models/UserModel';
import  HeroModel  from '@/models/HeroModel';
import { calculateBattle } from "@/lib/calculateBattle";

export async function startBattle(wallet: string, { enemyData, heroId, army }) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  const hero = await HeroModel.findOne({ _id: heroId, owner: user._id });
  if (!hero) throw new Error('Hero not found');

  const battleResult = calculateBattle({ hero, army, enemyData });

  const battle = new BattleModel({
    owner: user._id,
    hero: hero._id,
    enemy: enemyData,
    army,
    result: battleResult,
    cratedAt: new Date(),
  });
  await battle.save();
  return battle.toObject();
}

export async function getBattleResult(wallet: string, battleId: string) {
  const user = await UserModel.findOne({ address: wallet });
  if (!user) throw new Error('User not found');
  const battle = await BattleModel.findOne({ _id: battleId, owner: user._id });
  if (!battle) throw new Error('Battle not found');
  return battle.result;
}