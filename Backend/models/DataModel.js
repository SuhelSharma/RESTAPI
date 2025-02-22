const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  email: { type: String, required: true },
  roll_number: { type: String, required: true },
  numbers: { type: [Number], required: true },
  alphabets: { type: [String], required: true },
  highest_alphabet: { type: String, required: true } // ✅ Ensure it's a string
});

const DataModel = mongoose.model("Data", dataSchema);

module.exports = DataModel;
