// ✅ src/app/api/user/update/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export async function PUT(req: Request) {
  const { address, army, ...data } = await req.json();

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    await dbConnect();

    const allowedFields = [
      "name", "avatar", "food", "wood", "stone", "iron",
      "gold", "doubloon", "pearl", "allodium",
      "prestige", "levelPrestige", "prestigeProgress", "technologies",
      "activeBonuses", "activeQuest", "questPanelOpen", "heroes", 
      "army", "activeMining", "missions"
    ];

    const setFields: any = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        setFields[key] = data[key];
      }
    }

    const incFields: any = {};

    // ✅ уменьшаем количество войск, если отправлены
    if (army && typeof army === 'object') {
      for (const unit in army) {
        const count = army[unit];
        if (typeof count === 'number') {
          incFields[`army.${unit}.count`] = -count;
        }
      }
    }

    // ✅ возвращаем войска при отмене
    if (data.cancelMissionHeroId && data.heroArmy) {
      for (const unit in data.heroArmy) {
        const count = data.heroArmy[unit];
        if (typeof count === 'number') {
          incFields[`army.${unit}.count`] = (incFields[`army.${unit}.count`] || 0) + count;
        }
      }
    }

    const updateQuery: any = {};
    if (Object.keys(setFields).length > 0) {
      updateQuery.$set = setFields;
    }
    if (Object.keys(incFields).length > 0) {
      updateQuery.$inc = incFields;
    }

    // ✅ сохраняем войска в героя
    if (data.heroId && data.heroArmy) {
      const hero = await UserModel.findOne({ address, 'heroes.id': data.heroId }, { 'heroes.$': 1 });
      if (hero && hero.heroes.length > 0) {
        await UserModel.updateOne(
          { address, 'heroes.id': data.heroId },
          { $set: { 'heroes.$.troops': data.heroArmy } }
        );
      }
    }

    // ✅ добавляем миссию
    if (data.newMission) {
      await UserModel.updateOne(
        { address },
        { $push: { missions: data.newMission } }
      );
    }

    // ✅ удаляем миссию
    if (data.cancelMissionHeroId) {
      await UserModel.updateOne(
        { address },
        { $pull: { missions: { heroId: data.cancelMissionHeroId } } }
      );
    }

    const user = await UserModel.findOneAndUpdate(
      { address },
      updateQuery,
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('[api/user/update] ❌ Ошибка:', err);
    return NextResponse.json({ error: 'Server error', details: err }, { status: 500 });
  }
}
