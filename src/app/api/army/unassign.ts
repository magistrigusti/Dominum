// src/app/api/army/unassign.ts
import { NextRequest, NextResponse } from 'next/server';
import { unassignArmyFromHero } from '@/services/armyService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, heroId } = await req.json();
    if (!wallet || !heroId) {
      return NextResponse.json({ success: false, message: 'wallet, heroId required.' }, { status: 400 });
    }
    const result = await unassignArmyFromHero(wallet, heroId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
