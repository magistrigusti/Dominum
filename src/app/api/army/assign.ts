// src/app/api/army/assign.ts

import { NextRequest, NextResponse } from 'next/server';
import { assignArmyToHero } from '@/services/armyService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, heroId, units } = await req.json();
    if (!wallet || !heroId || !units) {
      return NextResponse.json({ success: false, message: 'wallet, heroId, units required.' }, { status: 400 });
    }
    const result = await assignArmyToHero(wallet, heroId, units);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
