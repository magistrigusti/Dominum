// 📄 src/models/BuildingModel.ts
import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Владелец здания
  type: { type: String, required: true },   // Тип здания (castle, barracks и т.д.)
  level: { type: Number, default: 1 },      // Уровень здания
  status: { type: String, enum: ["active", "under_construction", "destroyed"], default: "active" },
  finishedAt: { type: Date },               // Время окончания строительства/улучшения
  bonuses: { type: Object, default: {} },   // Бонусы здания (по типу)
  position: {                               // Координаты (если на карте)
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Building || mongoose.model("Building", BuildingSchema);
