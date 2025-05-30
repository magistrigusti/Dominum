// 📄 src/app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import HeroModel from "@/models/HeroModel";
import ArmyModel from "@/models/ArmyModel";
import MissionModel from "@/models/MissionModel";
import ShipModel from "@/models/ShipModel";
import ResourceNodeModel from "@/models/ResourceNodeModel";

// Получение/создание полной информации о пользователе (по wallet, id или токену)
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { userId, wallet, token, telegram } = await req.json();

    let user;
    if (userId) {
      user = await UserModel.findById(userId);
    } else if (wallet) {
      user = await UserModel.findOne({ wallet });
      // Если не нашли — создаём нового пользователя и сразу сохраняем данные из Telegram, если есть
      if (!user) {
        user = new UserModel({
          wallet,
          name: telegram?.first_name || "",
          avatar: telegram?.photo_url || "",
          telegram_username: telegram?.username || "",
          // другие дефолтные поля (например, prestige, createdAt и т.д.)
        });
        await user.save();
      }
    } else if (token) {
      return NextResponse.json({ error: "Auth by token не реализован" }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Нет параметров поиска пользователя" }, { status: 400 });
    }

    // Достаём связанные данные (герои, армия, миссии, корабль, ресурсы)
    const [heroes, army, missions, ship, resourceNodes] = await Promise.all([
      HeroModel.find({ owner: user._id }),
      ArmyModel.findOne({ owner: user._id }),
      MissionModel.find({ owner: user._id }),
      ShipModel.findOne({ owner: user._id }),
      ResourceNodeModel.find({ owner: user._id }),
    ]);

    return NextResponse.json({
      user,
      heroes,
      army,
      missions,
      ship,
      resourceNodes,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
