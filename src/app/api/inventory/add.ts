// 📄 src/app/api/inventory/add.ts
import { NextRequest, NextResponse } from 'next/server';
import { addInventoryItem } from '@/services/inventoryService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, item } = await req.json();
    if (!wallet || !item) {
      return NextResponse.json({ success: false, message: 'wallet and item required.' }, { status: 400 });
    }
    const result = await addInventoryItem(wallet, item);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error}, { status: 500 });
  }
}
