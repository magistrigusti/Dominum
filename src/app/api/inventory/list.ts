// 📄 src/app/api/inventory/list.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserInventory } from '@/services/inventoryService';

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();
    if (!wallet) {
      return NextResponse.json({ success: false, message: 'Wallet address is required.' }, { status: 400 });
    }
    const inventory = await getUserInventory(wallet);
    return NextResponse.json({ success: true, data: inventory });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
