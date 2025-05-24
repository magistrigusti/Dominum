//models/HeroModel.ts
import mongoose from "mongoose";
import ArmyUnitSchema from "./ArmyUnitSchema";

const HeroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Имя героя
    class: { type: String, required: true }, // Класс героя (warrior, mage и т.д.)
    level: { type: Number, default: 1 }, // Уровень
    exp: { type: Number, default: 0 }, // Опыт
    skills: { type: Array, default: [] }, // Навыки героя (ID или имена навыков)
    talentTree: { type: Object, default: {} }, // Прокачка (словарь талантов)
    heroArmy: { type: [ArmyUnitSchema], default: [] }, // Армия при герое
    prestige: { type: Number, default: 0 }, // Престиж, заработанный героем
    avatar: { type: String, default: "" }, // Картинка героя
    luck: { type: Number, default: 5 }, // Удача
    currentMission: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" }, // Активная миссия
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Владелец героя
    createdAt: { type: Date, default: Date.now }, // Дата создания
    status: { type: String, enum: ["idle", "in_mission", "wounded", "dead"], default: "idle" },
    isNFT: { type: Boolean, default: false },
    nftTokenId: { type: String, default: null },

    // ...основные поля героя...

    bonuses: {
      type: new mongoose.Schema(
        {
          // Бонусы ко всей армии героя
          attack: { type: Number, default: 0 },
          defense: { type: Number, default: 0 },
          armor: { type: Number, default: 0 },
          hp: { type: Number, default: 0 },
          capacity: { type: Number, default: 0 },
          speed: { type: Number, default: 0 },
          // ...ещё, если нужны
        },
        { _id: false }
      ),
      default: () => ({}),
    },

    // Инвентарь героя, каждый предмет может давать бонусы:
    inventory: [
      {
        itemId: { type: String }, // ID вещи (для связи с базой вещей/артефактов)
        name: { type: String },
        type: { type: String }, // weapon, armor, artifact...
        bonuses: {
          attack: { type: Number, default: 0 },
          defense: { type: Number, default: 0 },
          armor: { type: Number, default: 0 },
          hp: { type: Number, default: 0 },
          capacity: { type: Number, default: 0 },
          speed: { type: Number, default: 0 },
        },
        // Можно добавить: эффекты, срок действия, усиления и пр.
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
