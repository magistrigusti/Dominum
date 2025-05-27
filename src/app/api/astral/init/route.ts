// src/app/api/astral/init/route.ts
import { NextResponse } from "next/server";
import { getFullAstralMap } from "@/services/astralService";

export async function GET() {
  try {
    const map = await getFullAstralMap();
    return NextResponse.json(map);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
