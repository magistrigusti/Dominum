// UserModel.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  name: { type: String, default: 'Capitan' },
  prestige: { type: Number, default: 100 },
  levelPrestige: { type: Number, default: 0 },
  prestigeProgress: { type: Number, default: 0 },
  technologies: { type: String, default: null },
  food: { type: Number, default: 100 },
  wood: { type: Number, default: 100 },
  stone: { type: Number, default: 0 },
  iron: { type: Number, default: 50 },
  gold: { type: Number, default: 0 },
  doubloon: { type: Number, default: 25 },
  pearl: { type: Number, default: 0 },
  allodium: { type: Number, default: 0 },
  questShipRepaired: { type: Boolean, default: false },


  // 🆕 Бонусы (временно активные ресурсы)
  activeBonuses: {
    type: Map,
    of: new mongoose.Schema({
      miningStart: { type: Number, required: true }, // Date.now()
      position: {
        top: { type: String, required: true },
        left: { type: String, required: true },
      }
    }, { _id: false }),
    default: {},
  },

  activeQuest: {
    type: {
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      status: {
        type: String,
        enum: ['active', 'complete'],
        default: 'active',
      },
    },
    default: null,
  },
  
  questPanelOpen: {
    type: Boolean,
    default: false,
  },

});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
