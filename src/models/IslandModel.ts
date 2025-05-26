import mongoose from "mongoose";

const IslandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  type: { type: String, required: true, enum: [
    'standard', 'special', 'pirate', 'event', 'starter', "wild", "faction", "market", "fortress"
  ] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resourceNodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResourceNode"}],
  avatar: { type: String },
  background: { type: String },
  isCapturable: { type: Boolean, default: true },
  canTrade: { type: Boolean, default: false },
  canHire: { type: Boolean, default: false },
  pvpZone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true } );

export default mongoose.models.Island || mongoose.model("Island", IslandSchema);