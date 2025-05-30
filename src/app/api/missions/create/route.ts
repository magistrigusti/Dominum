// /src/app/api/missions/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import MissionModel from "@/models/MissionModel";
import HeroModel from "@/models/HeroModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    // data должен содержать owner, heroId, army, resourceNodeId, тип миссии и т.д.
    if (!data.owner || !data.heroId || !data.resourceNodeId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Создаем миссию
    const mission = new MissionModel({
      ...data,
      createdAt: new Date(),
      status: "active"
    });
    await mission.save();

    // Привязываем миссию к герою (можно добавить к activeMission)
    await HeroModel.findByIdAndUpdate(data.heroId, { activeMission: mission._id });

    return NextResponse.json({ mission });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
