// /src/app/api/missions/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import MissionModel from "@/models/MissionModel";

// Получить все миссии пользователя (по ownerId)
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    if (!ownerId) {
      return NextResponse.json({ error: "No ownerId" }, { status: 400 });
    }
    const missions = await MissionModel.find({ owner: ownerId });
    return NextResponse.json({ missions });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
