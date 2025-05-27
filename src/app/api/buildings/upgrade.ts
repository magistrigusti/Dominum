// 📄 src/app/api/buildings/upgrade.ts
import { NextRequest, NextResponse } from "next/server";
import { upgradeBuilding } from "@/services/buildingService";

export async function POST(req: NextRequest) {
  const { buildingId } = await req.json();
  const building = await upgradeBuilding(buildingId);
  return NextResponse.json(building);
}
