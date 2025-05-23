import mongoose from "mongoose";

const ArmySchema = new mongoose.Schema({
  units: { type: Object}
})