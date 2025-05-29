// 📄 src/app/api/inventory/remove.ts
import { NextRequest, NextResponse } from 'next/server';
import { removeInventoryItem } from '@/services/inventoryService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, itemId } = await req.json();
    if (!wallet || !itemId) {
      return NextResponse.json({ success: false, message: 'wallet and itemId required.' }, { status: 400 });
    }
    const result = await removeInventoryItem(wallet, itemId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
