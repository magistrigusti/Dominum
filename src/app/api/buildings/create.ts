// 📄 src/app/api/buildings/create.ts
import { NextRequest, NextResponse } from 'next/server';
import { createBuilding } from '@/services/buildingService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, buildingType } = await req.json();
    if (!wallet || !buildingType) {
      return NextResponse.json({ success: false, message: 'wallet and buildingType required.' }, { status: 400 });
    }
    const building = await createBuilding(wallet, buildingType);
    return NextResponse.json({ success: true, data: building });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
