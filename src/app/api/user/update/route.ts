// ✅ src/app/api/user/update/route.ts (App Router version)

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export async function PUT(req: Request) {
  const { address, ...data } = await req.json();

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  try {
    await dbConnect();

    const allowedFields = [
      "name", "avatar", "food", "wood", "stone", "iron",
      "gold", "doubloon", "pearl", "allodium",
      "prestige", "levelPrestige", "prestigeProgress", "technologies",
      "activeBonuses", "activeQuest", "pendingRewards", "questPanelOpen" 
    ];
    
    

    const updatePayload: any = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updatePayload[key] = data[key];
      }
    }

    const user = await UserModel.findOneAndUpdate(
      { address },
      updatePayload,
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('[api/user/update] ❌ Ошибка:', err);
    return NextResponse.json({ error: 'Server error', details: err }, { status: 500 });
  }
}
