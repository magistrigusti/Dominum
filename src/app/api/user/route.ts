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
    const { userId, wallet, token } = await req.json();

    let user;
    if (userId) {
      user = await UserModel.findById(userId);
    } else if (wallet) {
      user = await UserModel.findOne({ wallet });
    } else if (token) {
       return NextResponse.json({ error: "Auth by token не реализован" }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found"}, { status: 404 });
    }

    const [heroes, army, missions, ship, resourceNodes] = await Promise.all([
      HeroModel.find({ owner: user._id }),
      ArmyModel.findOne({ owner: user._id }),
      MissionModel.find({ owner: user._id }),
      ShipModel.findOne({ owner: user._id }),
      ResourceNodeModel.find({ owner: user._id }),
    ]);

    return NextResponse.json({
      user, heroes, army, missions, ship, resourceNodes,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}`}, { status: 500 })
  }
}