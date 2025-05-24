// 📄 src/models/UserModel.ts
import mongoose from "mongoose";
import ArmyUnitSchema from './ArmyUnitSchema';
import ResourceSubSchema from './ResourceSubSchema';

// ArmyUnitSchema и ResourceSubSchema импортируем из этого файла или отдельного, если переиспользуешь

const UserSchema = new mongoose.Schema({
  address:      { type: String, required: true, unique: true }, // Адрес пользователя (TON/ETH)
  avatar:       { type: String, required: true },               // Аватар
  name:         { type: String, default: 'Capitan' },           // Имя
  prestige:     { type: Number, default: 100 },                 // Престиж
  levelPrestige:{ type: Number, default: 0 },                   // Уровень престижа (левел игрока)
  prestigeProgress: { type: Number, default: 0 },               // Прогресс до след. уровня
  technologies: { type: String, default: null },                // Изученные технологии (можно потом заменить на массив)
  questShipRepaired: { type: Boolean, default: false },         // Квест: корабль починен

  // Все ресурсы теперь внутри объекта
  resources:    { type: ResourceSubSchema, default: () => ({}) },

  // Армия — массив структурированных юнитов (можно сделать объект, если удобнее для фронта)
  army: {
    type: [ArmyUnitSchema],
    default: [
      { unitType: 'peasant', level: 1, count: 0 },
      { unitType: 'sailor',  level: 1, count: 200 },
      { unitType: 'axeman',  level: 1, count: 0 },
      { unitType: 'spearman',level: 1, count: 0 },
      { unitType: 'archer',  level: 1, count: 0 },
      { unitType: 'cavalry', level: 1, count: 0 }
    ]
  },

  // Привязки к героям, миссиям, кораблям, ресурсным точкам — массивы ObjectId
  heroes:        [{ type: mongoose.Schema.Types.ObjectId, ref: "Hero" }],
  missions:      [{ type: mongoose.Schema.Types.ObjectId, ref: "Mission" }],
  ships:         [{ type: mongoose.Schema.Types.ObjectId, ref: "Ship" }],
  resourceNodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResourceNode" }],

  // Дополнительные поля
  createdAt:     { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
