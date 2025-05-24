import mongoose from "mongoose";
import ArmySchema from "./ArmyModel";

const HeroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacityArmy: { type: Number, default: 1000 },                     
  quality: { type: String, default: '' },
  class: { type: String, required: true },
  level: { type: Number, default: 1 },
  exp: { type: Array, default: 0 },
  expNextLevel: { type: Array, default: 1000 },
  talentTree: { type: Object, default: {} },
  skills: { type: Array, default: {} },
  heroArmy: { type: [ArmySchema], default: [] },
  avatar: { type: String, default: "" },
  inventory: { type: Array, default: 0 },
  status: { type: String, default: [] },
  currentMission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);

