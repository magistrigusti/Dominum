// 📄 src/services/heroService.ts

import HeroModel from '@/models/HeroModel';
import UserModel from '@/models/UserModel';
import HeroBaseStats from '@/config/heroes/HERO_BASE_STATS';
import HeroQualityConfig from '@/config/heroes/HERO_QUALITIES';
import { Types } from 'mongoose';

// Получить всех героев пользователя
export async function getUserHeroes(wallet: string) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');
  return await HeroModel.find({ owner: user._id });
}

// Создать нового героя (например, за квест/приз)
export async function createHero(wallet: string, heroData: any) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');

  // 1. Проверить лимиты по количеству героев (например, максимум 10)
  const heroCount = await HeroModel.countDocuments({ owner: user._id });
  if (heroCount >= 10) throw new Error('Maximum heroes reached');

  // 2. Получить базовые статы и качество
  const baseStats = HeroBaseStats(heroData.class, heroData.race, heroData.quality);
  const qualityConfig = HeroQualityConfig(heroData.quality);

  // 3. Создать героя
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

// Обновить героя (уровень, опыт, снаряжение и т.д.)
export async function updateHero(wallet: string, heroId: string, updates: any) {
  const user = await UserModel.findOne({ wallet });
  if (!user) throw new Error('User not found');

  const hero = await HeroModel.findOne({ _id: heroId, owner: user._id });
  if (!hero) throw new Error('Hero not found');

  // Применить обновления только к разрешённым полям
  if (updates.level !== undefined) hero.level = updates.level;
  if (updates.experience !== undefined) hero.experience = updates.experience;
  if (updates.equipment !== undefined) hero.equipment = updates.equipment;
  if (updates.stats !== undefined) hero.stats = { ...hero.stats, ...updates.stats };

  await hero.save();
  return hero.toObject();
}
