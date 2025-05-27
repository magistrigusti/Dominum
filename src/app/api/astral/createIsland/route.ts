// src/app/api/astral/createIsland/route.ts

import { NextResponse } from "next/server";
import { createIsland } from "@/services/astralService";

export async function POST(req: Request) {
  const islandData = await req.json();
  try {
    const map = await createIsland(islandData);
    return NextResponse.json(map);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
