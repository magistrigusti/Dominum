// /src/app/api/army/assign/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ArmyModel from "@/models/ArmyModel";
import HeroModel from "@/models/HeroModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { heroId, army } = await req.json();
    if (!heroId || !army) {
      return NextResponse.json({ error: "Missing heroId or army" }, { status: 400 });
    }
    // Записываем army в heroArmy героя
    const hero = await HeroModel.findByIdAndUpdate(heroId, { heroArmy: army }, { new: true });
    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }
    // Можешь добавить изменение availableArmy пользователя здесь, если надо

    return NextResponse.json({ hero });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
