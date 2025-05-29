// 📄 src/app/api/battles/result.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBattleResult } from '@/services/battleService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, battleId } = await req.json();
    if (!wallet || !battleId) {
      return NextResponse.json({ success: false, message: 'wallet and battleId required.' }, { status: 400 });
    }
    const result = await getBattleResult(wallet, battleId);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
