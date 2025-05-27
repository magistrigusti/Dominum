// 📄 src/app/api/inventory/remove.ts
import { NextRequest, NextResponse } from "next/server";
import { removeItemFromInventory } from "@/services/inventoryService";

export async function POST(req: NextRequest) {
  const { userId, itemId, quantity } = await req.json();
  const inventory = await removeItemFromInventory(userId, itemId, quantity);
  return NextResponse.json(inventory);
}
