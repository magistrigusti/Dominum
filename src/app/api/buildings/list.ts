// 📄 src/app/api/buildings/list.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserBuildings } from '@/services/buildingService';

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();
    if (!wallet) {
      return NextResponse.json({ success: false, message: 'Wallet address is required.' }, { status: 400 });
    }
    const buildings = await getUserBuildings(wallet);
    return NextResponse.json({ success: true, data: buildings });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
