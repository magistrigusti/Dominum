// 📄 src/app/api/user/init/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/UserModel';
import { generateResourceNodes } from '@/services/resourceService';

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    await dbConnect();

    const user = await UserModel.findOne({ address });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Проверяем — пустые точки или день прошёл
    const needRegenerate = !user.resourceNodes || user.resourceNodes.length === 0 /* или по дате */;

    if (needRegenerate) {
      const newNodes = await generateResourceNodes(user._id);
      user.resourceNodes = newNodes.map(node => node._id);
      await user.save();
    }

    return NextResponse.json({ success: true, resourceNodes: user.resourceNodes });
  } catch (err) {
    console.error('❌ [POST /api/user/init] Server error:', err);
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
