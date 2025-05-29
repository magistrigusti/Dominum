// src/app/api/missions/list.ts
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/UserModel";
import MissionModel from "@/models/MissionModel";

// GET /api/missions/list?wallet=адрес
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");
  if (!wallet) return NextResponse.json({ error: "Wallet required" }, { status: 400 });

  const user = await UserModel.findOne({ address: wallet });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const missions = await MissionModel.find({ owner: user._id });
  return NextResponse.json(missions);
}
