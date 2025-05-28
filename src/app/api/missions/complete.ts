// src/app/api/missions/complete.ts
import { NextRequest, NextResponse } from 'next/server';
import { completeMission } from '@/services/missionService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, missionId } = await req.json();
    if (!wallet || !missionId) {
      return NextResponse.json({ success: false, message: 'wallet and missionId required.' }, { status: 400 });
    }
    const result = await completeMission(wallet, missionId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
