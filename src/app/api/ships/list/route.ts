// /src/app/api/ship/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ShipModel from "@/models/ShipModel";

// Получить инфу о корабле (по ownerId)
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    if (!ownerId) {
      return NextResponse.json({ error: "No ownerId" }, { status: 400 });
    }
    const ship = await ShipModel.findOne({ owner: ownerId });
    return NextResponse.json({ ship });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
