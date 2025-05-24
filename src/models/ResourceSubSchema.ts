import mongoose from "mongoose";

// Схема одного ресурса
const ResourceSubSchema = new mongoose.Schema({
  food:    { type: Number, default: 100 },
  wood:    { type: Number, default: 100 },
  stone:   { type: Number, default: 0 },
  iron:    { type: Number, default: 50 },
  gold:    { type: Number, default: 0 },
  doubloon:{ type: Number, default: 25 },
  pearl:   { type: Number, default: 0 },
  allodium:{ type: Number, default: 0 }
}, { _id: false });

export default mongoose.models.ResourceSub || mongoose.model("ResourceSubS", ResourceSubSchema);
