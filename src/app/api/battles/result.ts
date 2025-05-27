// 📄 src/app/api/battles/result.ts
import { NextRequest, NextResponse } from "next/server";
import { getBattleResult } from "@/services/battleService";

export async function POST(req: NextRequest) {
  const { battleId } = await req.json();
  const result = await getBattleResult(battleId);
  return NextResponse.json(result);
}
