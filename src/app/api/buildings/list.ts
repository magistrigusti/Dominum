// 📄 src/app/api/buildings/list.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserBuildings } from "@/services/buildingService";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const buildings = await getUserBuildings(userId);
  return NextResponse.json(buildings);
}
