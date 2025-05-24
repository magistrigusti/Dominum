// models/ResourceNodeModel.ts
import mongoose from "mongoose";

// Модель ресурсной точки на острове
const ResourceNodeSchema = new mongoose.Schema({
  resource: { type: String, required: true },      // Тип ресурса (wood, stone и т.д.)
  level: { type: Number, default: 1 },             // Уровень точки
  position: {                                      // Координаты точки
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  totalAmount: { type: Number, required: true },   // Всего ресурса
  currentAmount: { type: Number, required: true }, // Остаток
  isDepleted: { type: Boolean, default: false },   // Истощена ли точка
  activeMission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" }, // Активная миссия на точке
  activeHero: { type: mongoose.Schema.Types.ObjectId, ref: "Hero" }, // Герой, который добывает
  avatar: { type: String, default: "" },           // Иконка точки
  quality: { type: String, default: "common" },    // Качество (common, rare, epic)
  cooldownEnd: { type: Date },                     // Время конца отката
  bonusMultiplier: { type: Number, default: 1 },   // Бонусы к сбору
  islandType: { type: String, default: "standard" }, // Тип острова
  createdAt: { type: Date, default: Date.now },    // Время генерации
}, { timestamps: true });

export default mongoose.models.ResourceNode || mongoose.model("ResourceNode", ResourceNodeSchema);
                                      