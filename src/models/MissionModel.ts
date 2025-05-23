// models/MissionModel.ts
import mongoose from "mongoose";

// Модель миссии (например, сбор ресурса, бой, доставка)
const MissionSchema = new mongoose.Schema({
  type: { type: String, required: true },             // Тип миссии (resource, battle, scout, delivery)
  hero: { type: mongoose.Schema.Types.ObjectId, ref: "Hero" }, // Герой, отправленный на миссию
  army: { type: Object, default: {} },                // Состав армии на миссии
  resourceNode: { type: mongoose.Schema.Types.ObjectId, ref: "ResourceNode" }, // Точка ресурса (если есть)
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Владелец миссии
  startTime: { type: Date, required: true },          // Время начала миссии
  endTime: { type: Date, required: true },            // Время завершения миссии
  status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" }, // Статус миссии
  reward: { type: Object, default: {} },              // Награда за миссию
  isCollectable: { type: Boolean, default: false },   // Можно ли собрать награду
  logs: { type: Array, default: [] },                 // Логи событий миссии (история шагов)
  createdAt: { type: Date, default: Date.now },       // Дата создания миссии
}, { timestamps: true });

export default mongoose.models.Mission || mongoose.model("Mission", MissionSchema);
