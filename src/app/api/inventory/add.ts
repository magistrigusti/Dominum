// 📄 src/app/api/inventory/add.ts
import { NextRequest, NextResponse } from "next/server";
import { addItemToInventory } from "@/services/inventoryService";

export async function POST(req: NextRequest) {
  const { userId, item } = await req.json();
  const inventory = await addItemToInventory(userId, item);
  return NextResponse.json(inventory);
}
