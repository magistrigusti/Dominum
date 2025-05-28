// 📁 src/app/api/resource/init/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from "@/models/UserModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  const {address, resource, heroId, duration, position, totalAmount} = await req.json();

  if (!address || !resource || !heroId || !duration || !position || !totalAmount) {
    return NextResponse.json({error: 'Missing fields'}, {status: 400});
  }

  const user = await UserModel.findOne({ address });
  if (!user) return NextResponse.json({error: 'User not found'}, {status: 404});

  user.activeMining = {
    resource,
    heroId,
    startedAt: new Date(),
    duration,
    position,
    remaining: totalAmount,
  };

  await user.save();

  return NextResponse.json({success: true});
}