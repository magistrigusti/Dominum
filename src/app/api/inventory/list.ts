// 📄 src/app/api/inventory/list.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserInventory } from "@/services/inventoryService";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const inventory = await getUserInventory(userId);
  return NextResponse.json(inventory);
}
