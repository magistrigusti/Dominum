// 📄 src/app/api/user/update/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import { ARMY_STATS, ArmyUnitType } from "@/config/army/ARMY_STATS"; // путь исправь если не совпадает
import { Mission } from "@/types/Mission"; // если надо для типизации

export async function PUT(req: Request) {
  const { address, army, heroArmy, missions, resources, cancelMissionId, updateHero, ...data } = await req.json();

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await UserModel.findOne({ address });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Сборка апдейтов
    const setFields: any = {};
    const incFields: any = {};

    // === 1. Армия (если надо уменьшить или увеличить — по массиву или объекту)
    if (army) {
      // Если у тебя army — объект: { peasant: { level, count }, ... }
      setFields.army = army;
      // Если массив — тут нужна другая логика (обнови если надо)
    }

    // === 2. heroArmy (если нужно обновить/сбросить у героя)
    if (heroArmy && Array.isArray(heroArmy) && data.heroId) {
      // Найти героя и обновить его heroArmy
      const heroIndex = user.heroes.findIndex((h: any) => h._id == data.heroId);
      if (heroIndex !== -1) {
        user.heroes[heroIndex].heroArmy = heroArmy;
        setFields.heroes = user.heroes;
      }
    }

    // === 3. Миссии (добавить, удалить, обновить)
    if (missions) {
      setFields.missions = missions;
    }

    // === 4. Ресурсы (ResourceSub как объект)
    if (resources) {
      setFields.resources = { ...user.resources, ...resources };
    }

    // === 5. Отмена миссии (возврат армии/героя/ресурсов)
    if (cancelMissionId) {
      const mission = user.missions.find((m: any) => m._id == cancelMissionId);
      if (mission) {
        // Вернуть героя и армию (примерно — адаптируй под твой тип)
        if (mission.hero && mission.heroArmy) {
          // Вернуть героя в доступные (status = idle, убираем currentMission)
          const heroIdx = user.heroes.findIndex((h: any) => h._id == mission.hero);
          if (heroIdx !== -1) {
            user.heroes[heroIdx].status = "idle";
            user.heroes[heroIdx].currentMission = null;
          }
          setFields.heroes = user.heroes;

          // Вернуть армию (увеличить user.army по типу)
          for (const unit of mission.heroArmy) {
            if (!user.army[unit.unitType]) user.army[unit.unitType] = { level: unit.level, count: 0 };
            user.army[unit.unitType].count += unit.count;
          }
          setFields.army = user.army;
        }

        // Выдать ресурсы, если миссия частично выполнена
        if (mission.reward && mission.reward.resources) {
          for (const [res, value] of Object.entries(mission.reward.resources)) {
            user.resources[res] = (user.resources[res] || 0) + (value as number);
          }
          setFields.resources = user.resources;
        }

        // Удалить миссию из списка
        user.missions = user.missions.filter((m: any) => m._id != cancelMissionId);
        setFields.missions = user.missions;
      }
    }

    // === 6. Обновить героя (например, xp, level, статы)
    if (updateHero && updateHero.heroId) {
      const heroIdx = user.heroes.findIndex((h: any) => h._id == updateHero.heroId);
      if (heroIdx !== -1) {
        user.heroes[heroIdx] = {
          ...user.heroes[heroIdx],
          ...updateHero.fields
        };
        setFields.heroes = user.heroes;
      }
    }

    // === 7. Любые дополнительные allowedFields
    const allowedFields = [
      "name",
      "avatar",
      "prestige",
      "levelPrestige",
      "prestigeProgress",
      "technologies",
      "activeBonuses",
      "activeQuest",
      "questPanelOpen",
      "activeMining",
      "resourceNodes"
    ];
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        setFields[key] = data[key];
      }
    }

    // --- Сохраняем все изменения ---
    await UserModel.updateOne(
      { address },
      {
        ...(Object.keys(setFields).length > 0 && { $set: setFields }),
        ...(Object.keys(incFields).length > 0 && { $inc: incFields }),
      }
    );

    // --- Отдаём обновлённого пользователя ---
    const updatedUser = await UserModel.findOne({ address });
    return NextResponse.json(updatedUser);

  } catch (err) {
    console.error("[api/user/update] ❌ Ошибка:", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}
