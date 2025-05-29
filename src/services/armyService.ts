// 📄 src/services/armyService.ts

import ArmyModel from '@/models/ArmyModel';
import HeroModel from '@/models/HeroModel';
import UserModel from '@/models/UserModel';

// Получить всю армию пользователя
export async function getUserArmy(wallet: string) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');
  return await ArmyModel.find({ owner: user._id });
}

// Назначить юнитов герою
export async function assignArmyToHero(wallet: string, heroId: string, units: any) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');
  const hero = await HeroModel.findOne({ _id: heroId, owner: user._id });
  if (!hero) throw new Error('Hero not found');

  // Проверяем, достаточно ли свободных юнитов у игрока (availableArmy)
  const availableArmy = await ArmyModel.findOne({ owner: user._id, type: 'available' });
  for (const unitType in units) {
    if (units[unitType] > (availableArmy.units[unitType] || 0)) {
      throw new Error(`Not enough units of type ${unitType}`);
    }
  }

  // Списываем из availableArmy, записываем в heroArmy
  for (const unitType in units) {
    availableArmy.units[unitType] -= units[unitType];
    hero.heroArmy = hero.heroArmy || {};
    hero.heroArmy[unitType] = (hero.heroArmy[unitType] || 0) + units[unitType];
  }
  await availableArmy.save();
  await hero.save();
  return { heroArmy: hero.heroArmy, availableArmy: availableArmy.units };
}

// Отозвать юнитов с героя обратно в availableArmy
export async function unassignArmyFromHero(wallet: string, heroId: string) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');
  const hero = await HeroModel.findOne({ _id: heroId, owner: user._id });
  if (!hero) throw new Error('Hero not found');

  const availableArmy = await ArmyModel.findOne({ owner: user._id, type: 'available' });
  if (hero.heroArmy) {
    for (const unitType in hero.heroArmy) {
      availableArmy.units[unitType] = (availableArmy.units[unitType] || 0) + hero.heroArmy[unitType];
    }
    hero.heroArmy = {};
    await availableArmy.save();
    await hero.save();
  }
  return { heroArmy: hero.heroArmy, availableArmy: availableArmy.units };
}
