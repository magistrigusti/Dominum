// src/app/api/island/nodes.ts
import { NextRequest, NextResponse } from 'next/server';
import { getResourceNodes, updateResourceNodes } from '@/services/resourceService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, nodes } = await req.json();
    if (!wallet) {
      return NextResponse.json({ success: false, message: 'Wallet address is required.' }, { status: 400 });
    }
    if (nodes) {
      // Обновление ресурсных точек
      const updated = await updateResourceNodes(wallet, nodes);
      return NextResponse.json({ success: true, data: updated });
    } else {
      // Получение ресурсных точек
      const found = await getResourceNodes(wallet);
      return NextResponse.json({ success: true, data: found });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
