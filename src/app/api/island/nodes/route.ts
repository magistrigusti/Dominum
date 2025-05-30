// /src/app/api/island/nodes/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ResourceNodeModel from "@/models/ResourceNodeModel";

// Получить все ресурсные точки острова (по islandId)
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const islandId = searchParams.get("islandId");
    if (!islandId) {
      return NextResponse.json({ error: "No islandId" }, { status: 400 });
    }
    const nodes = await ResourceNodeModel.find({ islandId });
    return NextResponse.json({ nodes });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
