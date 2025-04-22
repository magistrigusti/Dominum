// 📁 src/app/api/user/update/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/UserModel";
import { ARMY_STATS, ArmyUnitType } from "@/config/armyCapacity";

export async function PUT(req: Request) {
  const { address, heroArmy, army, ...data } = await req.json();

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  try {
    await dbConnect();

    const allowedFields = [
      "name",
      "avatar",
      "food",
      "wood",
      "stone",
      "iron",
      "gold",
      "doubloon",
      "pearl",
      "allodium",
      "prestige",
      "levelPrestige",
      "prestigeProgress",
      "technologies",
      "activeBonuses",
      "activeQuest",
      "questPanelOpen",
      "heroes",
      "heroArmy",
      "army",
      "activeMining",
      "missions",
      "resources", // ← если будет как объект
      "resourceNodes",
    ];

    const setFields: any = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        setFields[key] = data[key];
      }
    }
    const incFields: any = {};

    // ✅ уменьшаем количество войск при отправке
    if (army && typeof army === "object") {
      for (const unit in army) {
        const count = army[unit];
        if (typeof count === "number") {
          incFields[`army.${unit}.count`] = -count;
        }
      }
    }

    // ✅ если отмена — вернём войска и начислим ресурсы
    if (data.cancelMissionHeroId) {
      const user = await UserModel.findOne({ address });
      const mission = user?.missions.find(
        (m: any) => m.heroId === data.cancelMissionHeroId
      );

      if (mission) {
        const now = Date.now();
        const elapsed = Math.min(
          now - mission.startTime,
          mission.duration * 1000
        );
        const percent = elapsed / (mission.duration * 1000);

        const resourceType = mission.resource;
        let totalCapacity = 0;

        for (const unit in mission.heroArmy) {
          const count = mission.heroArmy[unit];

          const safeUnit = unit as ArmyUnitType;
          const level = user.army?.[safeUnit]?.level;

          const statsTable = ARMY_STATS[safeUnit];
          const unitStats = level && statsTable?.[level];

          if (!unitStats) continue;

          totalCapacity += unitStats.capacity * count;
        }

        const minedAmount = Math.floor(totalCapacity * percent);

        // ✅ начислить ресурсы
        const currentValue = user.resources?.[resourceType] || 0;
        setFields["resources"] = {
          ...user.resources,
          [resourceType]: currentValue + minedAmount,
        };

        // ✅ уменьшить remaining
        const updatedNodes = user.resourceNodes.map((node: any) => {
          if (node.id === mission.nodeId) {
            return {
              ...node,
              remaining: Math.max(0, (node.remaining || 0) - minedAmount),
            };
          }
          return node;
        });
        setFields.resourceNodes = updatedNodes;

        

        // ✅ возвращаем героя обратно
        const updatedHeroes = user.heroes.map((h: any) => {
          if (h.id === mission.heroId) {
            return mission.hero;
          }
          return h;
        });
        setFields.heroes = updatedHeroes;

        // ✅ вернуть войска
        const updatedArmy = { ...user.army };

        for (const unit in mission.heroArmy) {
          const returningCount = mission.heroArmy[unit];
          const current = updatedArmy[unit];

          const level =
            current?.level ?? user.army?.[unit as ArmyUnitType]?.level;

          updatedArmy[unit] = {
            level,
            count: (current?.count ?? 0) + returningCount,
          };
        }
        setFields.army = updatedArmy; // ⬅️ УДАЛИЛ — и Mongo ничего не получает!


        // ✅ СОХРАНЯЕМ ВСЁ СРАЗУ
        await UserModel.updateOne(
          { address },
          {
            ...(Object.keys(setFields).length > 0 && { $set: setFields }),
            ...(Object.keys(incFields).length > 0 && { $inc: incFields }),
          }
        );

        // ✅ удалить миссию
        user.missions = user.missions.filter(
          (m: any) => m.heroId !== data.cancelMissionHeroId
        );
        setFields.missions = user.missions;

        // ✅ возвращаем нового юзера
        const updatedUser = await UserModel.findOne({ address });
        return NextResponse.json(updatedUser);
      }
    }

    const updateQuery: any = {};
    if (Object.keys(setFields).length > 0) {
      updateQuery.$set = setFields;
    }
    if (Object.keys(incFields).length > 0) {
      updateQuery.$inc = incFields;
    }

    if (data.newMission) {
      await UserModel.updateOne(
        { address },
        { $push: { missions: data.newMission } }
      );
    }

    const user = await UserModel.findOneAndUpdate({ address }, updateQuery, {
      new: true,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    console.error("[api/user/update] ❌ Ошибка:", err);
    return NextResponse.json(
      { error: "Server error", details: err },
      { status: 500 }
    );
  }
}
