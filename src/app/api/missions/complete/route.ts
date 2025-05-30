// /src/app/api/missions/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import MissionModel from "@/models/MissionModel";
import HeroModel from "@/models/HeroModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { missionId } = await req.json();
    if (!missionId) {
      return NextResponse.json({ error: "Missing missionId" }, { status: 400 });
    }
    const mission = await MissionModel.findByIdAndUpdate(missionId, { status: "completed", completedAt: new Date() }, { new: true });
    if (!mission) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 });
    }
    // Можно убрать активную миссию у героя
    if (mission.heroId) {
      await HeroModel.findByIdAndUpdate(mission.heroId, { $unset: { activeMission: 1 } });
    }
    return NextResponse.json({ mission });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
