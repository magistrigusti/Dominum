// src/app/api/heroes/update.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateHero } from '@/services/heroService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, heroId, updates } = await req.json();
    if (!wallet || !heroId) {
      return NextResponse.json({ success: false, message: 'wallet and heroId required.' }, { status: 400 });
    }
    const updated = await updateHero(wallet, heroId, updates);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
