// 📄 src/app/api/user/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { userId, update } = await req.json();

    if (!userId || !update) {
      return NextResponse.json({ error: "Missing userId or update data"}, { status: 400});
    }

    const user = await UserModel.findByIdAndUpdate(userId, update, { new: true });
    if (!user) {
      return NextResponse.json({ error: "User not found"}, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}`}, { status: 500 })
  }
}