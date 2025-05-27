// AstralMapModel.ts 
import mongoose from "mongoose";

const AstralIslandSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: [
      'faction', 'wild', 'player', 'market', 'fortress', 'event', 'starter', 'special', 'pirate'
    ], 
    default: "starter"
  },
  
})