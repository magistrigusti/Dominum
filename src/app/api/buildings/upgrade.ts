// 📄 src/app/api/buildings/upgrade.ts
import { NextRequest, NextResponse } from 'next/server';
import { upgradeBuilding } from '@/services/buildingService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, buildingId } = await req.json();
    if (!wallet || !buildingId) {
      return NextResponse.json({ success: false, message: 'wallet and buildingId required.' }, { status: 400 });
    }
    const result = await upgradeBuilding(wallet, buildingId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
