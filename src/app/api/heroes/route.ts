// 📄 src/app/api/heroes/route.ts
import dbConnect  from '@/lib/dbConnect';
import { HeroModel } from '@/models/HeroModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await dbConnect();
  const address = req.nextUrl.searchParams.get('address');

  if (!address) return NextResponse.json(
    {error: 'Address is required'}, {status: 400}
  );

  const heroes = await HeroModel.find({userAddress: address});
  return NextResponse.json(heroes);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();

  const newHero = await HeroModel.create(data);
  return NextResponse.json(newHero);
}