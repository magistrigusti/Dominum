//models/ShipModel.ts
import mongoose from "mongoose";

const ShipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  level: { type: Number, default: 1 },
  status: { type: String, default: "normal" },
  capacity: { type: Number, default: 10000 },
  speed: { type: Number, default: 10 },
  equipment: { type: Number, default: 10 },
  durability: { type: Number, default: 100 },
  maxDurability: { type: Number, default: 100 },
  repairEnd: { type: Date },
  cargo: { type: Array, default: [] },
  currentIsland: { type: mongoose.Schema.Types.ObjectId, ref: "Island" },
  avatar: { type: String, default: "" },
  special: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Ship || mongoose.model("Ship", ShipSchema);