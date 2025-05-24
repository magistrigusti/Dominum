//models/ArmyModel.ts
import mongoose from "mongoose";

// Описываем каждый юнит в армии
const ArmyUnitSchema = new mongoose.Schema({
  unitType: { type: String, required: true },      // Тип юнита ("peasant", "archer" и т.д.)
  level: { type: Number, default: 1 },             // Уровень юнита
  count: { type: Number, default: 0 },             // Количество юнитов этого типа и уровня
  // Можно добавить: опыт, бонусы, спецпараметры
}, { _id: false }); // _id не нужен для вложенной схемы

// Сама армия — массив таких юнитов
const ArmySchema = new mongoose.Schema({
  units: { type: [ArmyUnitSchema], default: [] },  // Массив юнитов с типом/уровнем/кол-вом
  owner: { type: mongoose.Schema.Types.ObjectId, refPath: "ownerModel" },
  ownerModel: { type: String, required: true, enum: ["User", "Hero"] },
  formation: { type: String, default: "default" },     // Строй армии (default, attack, defense)
  power: { type: Number, default: 0 },                // Сила армии (по расчету)
  createdAt: { type: Date, default: Date.now },        // Дата создания
}, { timestamps: true });

export default mongoose.models.Army || mongoose.model("Army", ArmySchema);



  
