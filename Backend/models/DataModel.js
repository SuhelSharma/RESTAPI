const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  email: { type: String, required: true },
  roll_number: { type: String, required: true },
  numbers: { type: [Number], default: [] },
  alphabets: { type: [String], default: [] },
  highest_alphabet: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

const DataModel = mongoose.model("Data", dataSchema);
module.exports = DataModel;
