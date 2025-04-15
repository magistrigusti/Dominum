// 📁 src/app/api/mining/claim/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import {UserModel} from '@/models/UserModel';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { address } = await req.json();

  if (!address) return NextResponse.json({error: 'Missing address'}, {status: 400});

  const user = await UserModel.findOne({address});
  if (!user || !user.activeMining) return NextResponse.json({error: "Nothing to claim"}, {status: 404});

  const now = Date.now();
  const startedAt = new Date(user.activeMining.startedAt).getTime();
  const passed = now - startedAt;

  if (passed < user.activeMining.duration) {
    return NextResponse.json({error: 'Mining not finished yet'}, {status: 403});
  }

  const { resource, remaining} = user.activeMining;

  user[resource] += remaining;
  user.activeMining = null;

  await user.save();

  return NextResponse.json({
    success: true,
    responces: {
      food: user.food,
      wood: user.wood,
      stone: user.stone,
      iron: user.iron,
      gold: user.gold,
    },
  });
}