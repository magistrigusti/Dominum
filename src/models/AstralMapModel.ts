// src/models/AstralMapModel.ts

import mongoose from "mongoose";

const AstralIslandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: [
      'faction', 'wild', 'player', 'market', 'fortress', 'event', 'starter', 'special', 'pirate'
    ],
    default: 'wild' 
  },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceNodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResourceNode" }],
  avatar: { type: String },
  background: { type: String },
  isCapturable: { type: Boolean, default: true },
  canTrade: { type: Boolean, default: false },
  canHire: { type: Boolean, default: false },
  pvpZone: { type: Boolean, default: false },
  availableActions: [{ type: String }],
  description: { type: String },
}, { _id: false });

const AstralMapSchema = new mongoose.Schema({
  name: { type: String, default: 'Default Astral Map' },
  islands: [AstralIslandSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.AstralMap || mongoose.model("AstralMap", AstralMapSchema);
