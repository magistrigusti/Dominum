// ✅ src/app/api/user/update/route.ts (App Router version)
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
      "army", "activeMining"
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

    const updateQuery: any = {};
    if (Object.keys(setFields).length > 0) {
      updateQuery.$set = setFields;
    }
    if (Object.keys(incFields).length > 0) {
      updateQuery.$inc = incFields;
    }

    if (data.heroId && data.heroArmy) {
      const hero = await UserModel.findOne({address, 'heroesid': data.heroId}, {'heroes.$': 1});

      if (hero && hero.heroes.length > 0) {
        const targetHero = hero.heroes[0];

        targetHero.troops = data.heroArmy;

        await UserModel.updateOne(
          {address, 'heros.id': data.heroId},
          {$set: {'heroes.$.troops': data.heroArmy}}
        );
      }
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

