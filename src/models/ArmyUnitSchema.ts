//models/ArmyUnitSchema.ts
import mongoose from 'mongoose';

const ArmyUnitSchema = new mongoose.Schema({
  unitType: { type: String, required: true },
  level: { type: Number, default: 1 },
  count: { type: Number, default: 0 },
  baseStats: {
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    armor: { type: Number, default: 0 },
    hp: { type: Number, default: 0 },
    capacity: { type: Number, default: 0 }
  },
  bonuses: {
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    armor: { type: Number, default: 0 },
    hp: { type: Number, default: 0 },
    capacity: { type: Number, default: 0 },
    speed: { type: Number, default: 0 }
  },

  effects: { type: Array, default: [] }
}, { _id: false });

export default ArmyUnitSchema;
