// src/app/api/user/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    await dbConnect();

    let user = await UserModel.findOne({ address });

    if (!user) {
      user = await UserModel.create({
        address,
        avatar: '/icons/user-icon.png',
      });
      console.log('✅ Создан новый пользователь:', user.address);
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('❌ [POST /api/user] Server error:', err);
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
