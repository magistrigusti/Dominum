// src/app/api/heroes/list.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserHeroes } from '@/services/heroService';

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();
    if (!wallet) {
      return NextResponse.json({ success: false, message: 'Wallet address is required.' }, { status: 400 });
    }
    const heroes = await getUserHeroes(wallet);
    return NextResponse.json({ success: true, data: heroes });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
