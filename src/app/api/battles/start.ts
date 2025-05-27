// 📄 src/app/api/battles/start.ts
import { NextRequest, NextResponse } from "next/server";
import { startBattle } from "@/services/battleService";

export async function POST(req: NextRequest) {
  const { participants, heroes, armies } = await req.json();
  const battle = await startBattle(participants, heroes, armies);
  return NextResponse.json(battle);
}
