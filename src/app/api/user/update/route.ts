// 📁 src/app/api/user/update/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';
import { ARMY_STATS, ArmyUnitType } from '@/config/armyCapacity';

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

    // ✅ уменьшаем количество войск при отправке
    if (army && typeof army === 'object') {
      for (const unit in army) {
        const count = army[unit];
        if (typeof count === 'number') {
          incFields[`army.${unit}.count`] = -count;
        }
      }
    }

    // ✅ если отмена — вернём войска и начислим ресурсы
    if (data.cancelMissionHeroId) {
      const user = await UserModel.findOne({ address });
      const mission = user?.missions.find((m: any) => m.heroId === data.cancelMissionHeroId);

      if (mission) {
        const now = Date.now();
        const elapsed = Math.min(now - mission.startTime, mission.duration * 1000);
        const percent = elapsed / (mission.duration * 1000);

        const resourceType = mission.resource;
        const minedAmount = Math.floor(
          Object.entries(mission.heroArmy).reduce((sum: number, [unit, countRaw]) => {
            const count = countRaw as number;
            const safeUnit = unit as ArmyUnitType;
            const level = user.army?.[safeUnit]?.level || 1;
            const capacity = ARMY_STATS[safeUnit][level].capacity;
            return sum + capacity * count;
          }, 0) * percent
        );

        // ✅ вернуть войска
        for (const unit in mission.heroArmy) {
          const count = mission.heroArmy[unit];
          incFields[`army.${unit}.count`] = (incFields[`army.${unit}.count`] || 0) + count;
        }

        // ✅ начислить ресурсы
        setFields[resourceType] = (user[resourceType] || 0) + minedAmount;

        // ✅ уменьшить remaining на точке
        const updatedNodes = user.resourceNodes.map((node: any) => {
          if (node.id === mission.nodeId) {
            return {
              ...node.toObject(),
              remaining: Math.max(0, (node.remaining || 0) - minedAmount),
            };
          }
          return node;
        });
        setFields.resourceNodes = updatedNodes;
      }

      // ✅ удалить миссию
      await UserModel.updateOne(
        { address },
        { $pull: { missions: { heroId: data.cancelMissionHeroId } } }
      );
    }

    const updateQuery: any = {};
    if (Object.keys(setFields).length > 0) {
      updateQuery.$set = setFields;
    }
    if (Object.keys(incFields).length > 0) {
      updateQuery.$inc = incFields;
    }

    if (data.heroId && data.heroArmy) {
      const hero = await UserModel.findOne({ address, 'heroes.id': data.heroId }, { 'heroes.$': 1 });

      if (hero && hero.heroes.length > 0) {
        await UserModel.updateOne(
          { address, 'heroes.id': data.heroId },
          { $set: { 'heroes.$.troops': data.heroArmy } }
        );
      }
    }

    if (data.newMission) {
      await UserModel.updateOne(
        { address },
        { $push: { missions: data.newMission } }
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
