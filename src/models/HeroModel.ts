// 📄 src/models/HeroModel.ts
import mongoose, { Schema, models } from 'mongoose';

const HeroSchema = new Schema({
  userAddress: {type: String, required: true},
  name: {type: String, required: true},
  image: {type: String, required: true},
  quality: {type: String, enum: [
    'normal', 'good', 'rare', 'epic', 'legendary'
  ]},
  level: {type: Number, default: 1},
  exp: {type: Number, default: 0},
  expToLevel: {type: Number, default: 1000},
});

export const HeroModel = models.Hero || mongoose.model('Hero', HeroSchema);