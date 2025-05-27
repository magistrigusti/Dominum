// 📄 src/app/api/buildings/create.ts
import { NextRequest, NextResponse } from "next/server";
import { createBuilding } from "@/services/buildingService";

export async function POST(req: NextRequest) {
  const { userId, type, position } = await req.json();
  const building = await createBuilding(userId, type, position);
  return NextResponse.json(building);
}
