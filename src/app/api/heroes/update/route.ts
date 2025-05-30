// /src/app/api/heroes/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HeroModel from "@/models/HeroModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { heroId, update } = await req.json();
    if (!heroId || !update) {
      return NextResponse.json({ error: "Missing heroId or update data" }, { status: 400 });
    }
    const hero = await HeroModel.findByIdAndUpdate(heroId, update, { new: true });
    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }
    return NextResponse.json({ hero });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
