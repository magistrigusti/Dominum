// /src/app/api/army/unassign/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HeroModel from "@/models/HeroModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { heroId } = await req.json();
    if (!heroId) {
      return NextResponse.json({ error: "Missing heroId" }, { status: 400 });
    }
    // Убираем heroArmy
    const hero = await HeroModel.findByIdAndUpdate(heroId, { heroArmy: {} }, { new: true });
    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }
    return NextResponse.json({ hero });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
