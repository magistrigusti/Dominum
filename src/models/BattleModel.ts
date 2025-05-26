// 📄 src/models/BattleModel.ts
import mongoose from "mongoose";
import ArmyUnitSchema from "./ArmyUnitSchema";

const BattleSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ID участников
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }],      // ID героев
  armies: [{ type: [ArmyUnitSchema], default: [] }],                    // Армии участников
  log: { type: Array, default: [] },         // Лог боя (шаги, действия)
  result: { type: String },                  // Победитель/ничья/счет
  startedAt: { type: Date, default: Date.now },
  finishedAt: { type: Date }
}, { timestamps: true });

export default mongoose.models.Battle || mongoose.model("Battle", BattleSchema);
