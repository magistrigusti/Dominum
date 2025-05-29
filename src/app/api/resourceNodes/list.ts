// 📄 src/app/api/resourceNodes/list.ts
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/UserModel";
import ResourceNodeModel from "@/models/ResourceNodeModel";

// GET /api/resourceNodes/list?wallet=адрес
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");
  if (!wallet) return NextResponse.json({ error: "Wallet required" }, { status: 400 });

  const user = await UserModel.findOne({ address: wallet });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const nodes = await ResourceNodeModel.find({ owner: user._id });
  return NextResponse.json(nodes);
}
