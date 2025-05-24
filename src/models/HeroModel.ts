//models/HeroModel.ts
import mongoose from "mongoose";

// Схема одного юнита в армии героя
const ArmyUnitSchema = new mongoose.Schema({
  unitType: { type: String, required: true },   // Тип юнита
  level: { type: Number, default: 1 },          // Уровень юнита
  count: { type: Number, default: 0 },          // Кол-во юнитов
}, { _id: false });

// Модель героя
const HeroSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Имя героя
  class: { type: String, required: true },          // Класс героя (warrior, mage и т.д.)
  level: { type: Number, default: 1 },              // Уровень
  exp: { type: Number, default: 0 },                // Опыт
  skills: { type: Array, default: [] },             // Навыки героя (ID или имена навыков)
  talentTree: { type: Object, default: {} },        // Прокачка (словарь талантов)
  heroArmy: { type: [ArmyUnitSchema], default: [] },// Армия при герое
  prestige: { type: Number, default: 0 },           // Престиж, заработанный героем
  avatar: { type: String, default: "" },            // Картинка героя
  inventory: { type: Array, default: [] },          // Инвентарь (ID предметов)
  status: { type: String, default: "idle" },        // idle, in_mission, wounded
  luck: { type: Number, default: 5 },               // Удача
  currentMission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" }, // Активная миссия
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },              // Владелец героя
  createdAt: { type: Date, default: Date.now },      // Дата создания
}, { timestamps: true });

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
