// 📄 src/app/api/battles/start.ts
import { NextRequest, NextResponse } from 'next/server';
import { startBattle } from '@/services/battleService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, enemyData, heroId, army } = await req.json();
    if (!wallet || !enemyData || !heroId || !army) {
      return NextResponse.json({ success: false, message: 'wallet, enemyData, heroId, army required.' }, { status: 400 });
    }
    const battleResult = await startBattle(wallet, { enemyData, heroId, army });
    return NextResponse.json({ success: true, data: battleResult });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
