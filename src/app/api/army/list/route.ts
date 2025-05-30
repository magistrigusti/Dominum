// /src/app/api/army/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ArmyModel from "@/models/ArmyModel";

// Получить армию пользователя
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    if (!ownerId) {
      return NextResponse.json({ error: "No ownerId" }, { status: 400 });
    }
    const army = await ArmyModel.findOne({ owner: ownerId });
    return NextResponse.json({ army });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
