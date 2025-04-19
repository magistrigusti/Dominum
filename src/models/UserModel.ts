// 📄 src/models/UserModel.ts
import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true},
  image: { type: String, required: true},
  quality: { type: String, enum: ['normal', 'good', 'rare', 'epic', 'legendary'] },
  level: { type: Number, required: true },
  exp: { type: Number, required: true },
  expToNext: { type: Number, required: true},
});

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
  heroes: {
    type: [HeroSchema],
    default: () => [
      {
        id: '1',
        name: 'Frenk',
        image: '/dominum/heroes/hero-workin-grey.png',
        quality: 'normal',
        level: 1,
        exp: 0,
        expToNext: 1000,
      },
      {
        id: '2',
        name: 'Mary',
        image: '/dominum/heroes/hero-workin-grey-2.png',
        quality: 'normal',
        level: 1,
        exp: 0,
        expToNext: 1000,
      },
    ]
  },
  activeMining: {
    type: {
      resource: { type: String, enum: ['food', 'wood', 'stone', 'iron', 'gold'] },
      heroId: { type: String },
      startedAt: { type: Date },
      duration: { type: Number },
      position: { type: {x: Number, y: Number }},
      remaining: { type: Number },
    },
    default: null,
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
