import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models/UserModel';

export async function POST(req: Request) {
  const { address, questId } = await req.json();

  if (!address || questId !== 'repair_ship') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  await dbConnect();

  const user = await UserModel.findOne({ address });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (user.food < 1000 || user.wood < 2000 || user.iron < 100) {
    return NextResponse.json({ error: 'Not enough resources' }, { status: 403 });
  }

  user.food -= 2000;
  user.wood -= 1000;
  user.iron -= 100;

  user.prestige += 550;
  user.prestigeProgress += 550;

  user.heroes.push({
    id: `hero-${Date.now()}`,
    name: 'Лоцман',
    rarity: 'common',
    class: 'engineer',
  });

  await user.save();

  return NextResponse.json({
    success: true,
    prestige: user.prestige,
    prestigeProgress: user.prestigeProgress,
    heroes: user.heroes,
    questShipRepaired: true,
  });
}
