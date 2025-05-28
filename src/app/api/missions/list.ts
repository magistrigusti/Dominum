// src/app/api/missions/list.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserMissions } from "@/services/missionService";

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();
    if (!wallet) {
      return NextResponse.json({success: false, message: "Wallet address is required"}, {status: 400});
    }
    const mission = await getUserMissions(wallet);
    return NextResponse.json({ success: true, data: mission});
  } catch (error) {
    return NextResponse.json({success: false, message: error}, {status: 500})
  }
}