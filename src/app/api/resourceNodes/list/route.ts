// /src/app/api/resourceNodes/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ResourceNodeModel from "@/models/ResourceNodeModel";

// Получить ресурсные точки пользователя (по ownerId)
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");
    if (!ownerId) {
      return NextResponse.json({ error: "No ownerId" }, { status: 400 });
    }
    const resourceNodes = await ResourceNodeModel.find({ owner: ownerId });
    return NextResponse.json({ resourceNodes });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: `${error}` }, { status: 500 });
  }
}
