// src/app/api/heroes/create.ts
import { NextRequest, NextResponse } from 'next/server';
import { createHero } from '@/services/heroService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, heroData } = await req.json();
    if (!wallet || !heroData) {
      return NextResponse.json({ success: false, message: 'wallet and heroData required.' }, { status: 400 });
    }
    const hero = await createHero(wallet, heroData);
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
