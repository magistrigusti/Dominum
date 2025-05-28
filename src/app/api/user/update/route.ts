// 📄 src/app/api/user/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateUserProfile } from '@/services/userService';

export async function POST(req: NextRequest) {
  try {
    const { wallet, name, avatar, quote } = await req.json();
    if (!wallet) {
      return NextResponse.json({ success: false, message: 'Wallet address is required.' }, { status: 400 });
    }
    const updated = await updateUserProfile({ wallet, name, avatar, quote });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
