// 📄 src/models/UserModel.ts
import mongoose from 'mongoose';
import ResourceSubSchema from './ResourceSubSchema';
import ArmyUnitSchema from './ArmyModel';

const UserSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  name: { type: String, default: 'Capitan' },
  prestige: { type: Number, default: 0 },
  levelPrestige: { type: Number, default: 0 },
  prestigeProgress: { type: Number, default: 1000 },
  technologies: { type: String, default: null },
  questShipRepaired: { type: Boolean, default: false },
  resources: { type: ResourceSubSchema, default: () => ({})},
  army: {
    type: [ArmyUnitSchema],
    default: [
      { unitType: 'peasant', level: 1, count: 0 },
      { unitType: 'sailor', level: 1, count: 200 },
      { unitType: 'axeman', level: 1, count: 0 },
      { unitType: 'spearman', level: 1, count: 0 },
      { unitType: 'archer', level: 1, count: 0 },
      { unitType: 'cavalary', level: 1, count: 0}
    ]
  },
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
  missions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }],
  ships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ship' }],
  resourceNodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ResourceNode' }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true }); 

export default mongoose.models.User || mongoose.model("User", UserSchema);