// 📄 src/models/InventoryModel.ts
import mongoose from "mongoose";

const InventoryItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },      // ID предмета из справочника
  quantity: { type: Number, default: 1 },        // Количество предметов
  equipped: { type: Boolean, default: false },   // Надет ли предмет на героя
  hero: { type: mongoose.Schema.Types.ObjectId, ref: "Hero" }, // Если предмет на герое
}, { _id: false });

const InventorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Владелец инвентаря
  items: { type: [InventoryItemSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);
