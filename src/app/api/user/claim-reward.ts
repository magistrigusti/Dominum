// ap/api/user/claim-rewards.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { address, resource } = await req.json();

  if (!address || !resource) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const user = await UserModel.findOne({ address });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const pending = user.pendingRewards?.[resource] ?? 0;
  if (pending <= 0) {
    return NextResponse.json({ error: 'Nothing to claim' }, { status: 401 });
  }

  user[resource] += pending;
  user.pendingRewards[resource] = 0;
  await user.save();

  return NextResponse.json({
    success: true,
    resources: {
      food: user.food,
      wood: user.wood,
      stone: user.stone,
      iron: user.iron,
      gold: user.gold,
    },
    pendingRewards: user.pendingRewards,
  });
}
