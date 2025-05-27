// src/app/api/astral/moveShip/route.ts

import { NextResponse } from "next/server";
// import ShipModel from "@/models/ShipModel"; // если есть отдельная модель корабля
import { UserModel } from "@/models/UserModel";

export async function POST(req: Request) {
  const { userId, islandId } = await req.json();

  if (!userId || !islandId) {
    return NextResponse.json({ error: "userId и islandId обязательны" }, { status: 400 });
  }

  try {
    // Пример: currentIsland у User (или у Ship)
    await UserModel.findByIdAndUpdate(userId, { currentIsland: islandId });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
