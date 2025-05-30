// /src/app/api/heroes/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import HeroModel from "@/models/HeroModel";
import UserModel from "@/models/UserModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    // data должен содержать owner, имя героя, расу, класс, качество, стартовые значения
    if (!data.owner) {
      return NextResponse.json({ error: "No owner" }, { status: 400 });
    }
    const hero = new HeroModel(data);
    await hero.save();

    // Добавляем id героя пользователю
    await UserModel.findByIdAndUpdate(data.owner, { $push: { heroIds: hero._id } });

    return NextResponse.json({ hero });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
