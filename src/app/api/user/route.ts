// 📄 src/app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import HeroModel from "@/models/HeroModel";
import ArmyModel from "@/models/ArmyModel";
import MissionModel from "@/models/MissionModel";
import ShipModel from "@/models/ShipModel";
import ResourceNodeModel from "@/models/ResourceNodeModel";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { wallet, telegram } = await req.json();

    if (!wallet) {
      return NextResponse.json({ error: "wallet required" }, { status: 400 });
    }

    let user = await UserModel.findOne({ wallet });

    if (!user) {
      user = new UserModel({
        wallet,
        name: telegram?.first_name || '',
        avatar: telegram?.photo_url || '',
        telegram_username: telegram?.username || '',
      });
      await user.save();
    }

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
  } catch (err) {
    return NextResponse.json({ error: "Server error", details: `${err}` }, { status: 500 });
  }
}
