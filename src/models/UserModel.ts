// 📄 src/models/UserModel.ts
import mongoose from "mongoose";

const MissionSchema = new mongoose.Schema({
  heroId: { type: String, required: true },
  armyCount: { type: Number, required: true },
  nodeId: { type: String, required: true },
  resource: { 
    type: String, 
    enum: ['food', 'wood', 'stone', 'iron', 'gold', 'doubloon', 'pearl', 'allodium'] 
  },  
  duration: { type: Number, required: true },
  startTime: { type: Number, required: true },
  hero: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quality: { type: String, enum: ['normal', 'good', 'rare', 'epic', 'legendary'] },
    level: { type: Number, required: true },
    exp: { type: Number, required: true },
    expToNext: { type: Number, required: true },
  },
  heroArmy: {
    type: Map,
    of: Number,
    default: {}
  },
}, { _id: false });

const HeroSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true},
  image: { type: String, required: true},
  quality: { type: String, enum: ['normal', 'good', 'rare', 'epic', 'legendary'] },
  level: { type: Number, required: true },
  exp: { type: Number, required: true },
  expToNext: { type: Number, required: true},
  heroArmy: {
    type: Object,
    default: {}
  },
  
});

const ArmyUnitSchema = new mongoose.Schema({
  level: { type: Number, default: 1 },
  count: { type: Number, default: 200 },
}, { _id: false });

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
  army: {
    type: Map,
    of: ArmyUnitSchema,
    default: () => ({
      peasant:  { level: 1, count: 0 },
      sailor:   { level: 1, count: 200 }, // ← стартовое значение
      axeman:   { level: 1, count: 0 },
      spearman: { level: 1, count: 0 },
      archer:   { level: 1, count: 0 },
      cavalry:  { level: 1, count: 0 },
    }),
  },

  missions: {
    type: [MissionSchema],
    default: [],
  },
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
  resourceNodes: {
    type: [{
      id: { type: String, required: true },
      resource: { type: String, required: true },
      level: { type: Number, require: true },
      position: {
        x: Number,
        y: Number
      },
      remaining: Number,
      lastRestoedAt: String
    }],
    default: []
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
