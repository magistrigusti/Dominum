//models/ArmyModel.ts
import mongoose from "mongoose";
import ArmyUnitSchema from "./ArmyUnitSchema";

const ArmySchema = new mongoose.Schema({
  units: { type: [ArmyUnitSchema], default: [] },    // Массив юнитов
  owner: { type: mongoose.Schema.Types.ObjectId, refPath: "ownerModel" }, // Владелец (User/Hero)
  ownerModel: { type: String, required: true, enum: ["User", "Hero"] },
  // Можно добавить: общее состояние армии, баффы, резервы и т.д.
  extraBonuses: {                                    // Общие бонусы от героя, предметов, артефактов
    attack:   { type: Number, default: 0 },
    defense:  { type: Number, default: 0 },
    armor:    { type: Number, default: 0 },
    hp:       { type: Number, default: 0 },
    capacity: { type: Number, default: 0 },
    speed:    { type: Number, default: 0 },
  },
  carryingResources: {                               // Что сейчас несёт армия (при необходимости)
    food:    { type: Number, default: 0 },
    wood:    { type: Number, default: 0 },
    stone:   { type: Number, default: 0 },
    iron:    { type: Number, default: 0 },
    gold:    { type: Number, default: 0 },
    doubloon: { type: Number, default: 0 },
    pearl:   { type: Number, default: 0 },
    allodium:{ type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Army || mongoose.model("Army", ArmySchema);


