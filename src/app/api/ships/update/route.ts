// /src/app/api/ship/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ShipModel from "@/models/ShipModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { shipId, update } = await req.json();
    if (!shipId || !update) {
      return NextResponse.json({ error: "Missing shipId or update" }, { status: 400 });
    }
    const ship = await ShipModel.findByIdAndUpdate(shipId, update, { new: true });
    if (!ship) {
      return NextResponse.json({ error: "Ship not found" }, { status: 404 });
    }
    return NextResponse.json({ ship });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
