// src/app/api/missions/cancel.ts
import { NextRequest, NextResponse } from 'next/server';
import { cancelMission } from '@/services/missionService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, missionId } = await req.json();
    if (!wallet || !missionId) {
      return NextResponse.json({ success: false, message: 'wallet and missionId required.' }, { status: 400 });
    }
    const result = await cancelMission(wallet, missionId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error}, { status: 500 });
  }
}
