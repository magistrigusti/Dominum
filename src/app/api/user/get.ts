// 📄 src/app/api/user/get.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserByWallet } from '@/services/userService';

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();
    if (!wallet) {
      return NextResponse.json({ success: false, message: 'Wallet address is required.' }, { status: 400 });
    }
    const user = await getUserByWallet(wallet);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
