// models/ResourceNodeModel.ts
import mongoose from "mongoose";

// Модель ресурсной точки на острове
const ResourceNodeSchema = new mongoose.Schema({
  resource: { type: String, required: true },         // Тип ресурса (wood, stone, iron, gold, pearl)
  level: { type: Number, default: 1 },                // Уровень точки
  position: {                                         // Координаты точки на острове
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  totalAmount: { type: Number, required: true },      // Всего ресурса в точке
  currentAmount: { type: Number, required: true },    // Остаток ресурса
  isDepleted: { type: Boolean, default: false },      // Истощена ли точка
  activeMission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" }, // Активная миссия сбора
  avatar: { type: String, default: "" },              // Иконка/аватар точки
  quality: { type: String, default: "common" },       // Качество (common, rare, epic)
  cooldownEnd: { type: Date },                        // Когда точка снова будет доступна (если есть откат)
  bonusMultiplier: { type: Number, default: 1 },      // Бонусы (например, x2 сбор)
  islandType: { type: String, default: "standard" },  // Тип острова (можно расширить)
  createdAt: { type: Date, default: Date.now },       // Дата генерации точки
}, { timestamps: true });

export default mongoose.models.ResourceNode || mongoose.model("ResourceNode", ResourceNodeSchema);
