import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/UserModel';
import { generateResourceNodes } from "@/services/resourceService";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({error: 'Address is required'}, {status: 400});
    }

    await dbConnect();

    const user = await UserModel.findOne({ address });

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 400});
    }

    const needRegenerate = !user.resourceNodes || user.resourceNodes.length === 0;

    const (needRegenerate) {
      const newNodes = await generateResourceNodes(user._id);
      user.resourceNodes = newNodes.map(node => node._id);
      await user.save();
    }

    return NextResponse.json({success: true, resourceNodes: user.resourceNodes});
  } catch (err) {
    console.error("")
  }
}