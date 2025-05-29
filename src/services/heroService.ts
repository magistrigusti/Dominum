// 📄 src/services/heroService.ts

import HeroModel from '@/models/HeroModel';
import UserModel from '@/models/UserModel';
import { getHeroBaseStats } from '@/config/heroes/HERO_BASE_STATS';
import { getHeroQualityConfig } from '@/config/heroes/HERO_QUALITIES';
import { Types } from 'mongoose';

export async function getUserHeroes(wallet: string) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not Found');
  return await HeroModel.find({ owner: user._id});
}

export async function createHero(wallet: string, heroData: any) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');

  const heroCount = await HeroModel.countDocuments({ owner: user._id});
  if (heroCount >= 10) throw new Error('Masimom heroes resched');

  const baseStats = getHeroBaseStats(heroData.class, heroData.race, heroData.quality);
  const qualityConfig = getHeroQualityConfig(heroData.quality);

  const hero = new HeroModel({
    ...heroData,
    owner: user._id,
    level: 1,
    experience: 0,
    quality: heroData.quality,
    maxLevel: qualityConfig.maxLevel,
    stats: baseStats,
    equipment: [],
    createdAt: new Date(),
  });
  await hero.save();
  return hero.toObject();
}

export async function updateHero(wallet: string, heroId: string, updates: any) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');

  const hero = await HeroModel.findOne({ _id: heroId, owner: user._id });
  if (!hero) throw new Error('Hero not found');

  if (updates.level !== undefined) hero.level = updates.level;
  if (updates.experience !== undefined) hero.experience = updates.experience;
  if (updates.equipment !== undefined) hero.equipment = updates.equipment;
  if (updates.stats !== undefined) hero.stats = { ...hero.stats, ...updates.stats };

  await hero.save();
  return hero.toObject();
}