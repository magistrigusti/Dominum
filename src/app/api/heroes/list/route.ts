// /src/app/api/heroes/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HeroModel from "@/models/HeroModel";

// Получить всех героев пользователя (по ownerId)
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    if (!ownerId) {
      return NextResponse.json({ error: "No ownerId" }, { status: 400 });
    }
    const heroes = await HeroModel.find({ owner: ownerId });
    return NextResponse.json({ heroes });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
