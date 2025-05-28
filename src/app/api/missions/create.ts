// src/app/api/missions/create.ts
import { NextRequest, NextResponse } from 'next/server';
import { createMission } from '@/services/missionService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, missionData } = await req.json();
    if (!wallet || !missionData) {
      return NextResponse.json({ success: false, message: 'wallet and missionData required.' }, { status: 400 });
    }
    const mission = await createMission(wallet, missionData);
    return NextResponse.json({ success: true, data: mission });
  } catch (error) {
    return NextResponse.json({ success: false, message: error}, { status: 500 });
  }
}
