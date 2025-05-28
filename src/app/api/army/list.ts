// src/app/api/army/list.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserArmy } from '@/services/armyService';

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();
    if (!wallet) {
      return NextResponse.json({ success: false, message: 'Wallet address is required.' }, { status: 400 });
    }
    const army = await getUserArmy(wallet);
    return NextResponse.json({ success: true, data: army });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}