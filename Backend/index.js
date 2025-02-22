require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/filterData";

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  });

// ✅ Define Mongoose Schema
const DataSchema = new mongoose.Schema({
  data: { type: [mongoose.Schema.Types.Mixed], required: true },
  numbers: { type: [Number], default: [] },
  alphabets: { type: [String], default: [] },
  highest_alphabet: { type: String, default: null }, // ✅ Ensure it's a STRING
  createdAt: { type: Date, default: Date.now },
});

const DataModel = mongoose.model("Data", DataSchema);

app.use(cors());
app.use(express.json());

// ✅ POST Request Handler
app.post("/", async (req, res) => {
    try {
        const inputData = req.body.data;

        if (!inputData || !Array.isArray(inputData)) {
            return res.status(400).json({ error: "Invalid input format. Expected {'data': ['A', '3', 'B']}" });
        }

        if (inputData.length === 0) {
            return res.status(400).json({ error: "Data array cannot be empty." });
        }

        const numbers = inputData.filter(item => !isNaN(item)).map(Number);
        const alphabets = inputData.filter(item => isNaN(item));
        
        // ✅ Fix: Store highest_alphabet as a STRING, not an ARRAY
        const highestAlphabet = alphabets.length > 0 
            ? alphabets.reduce((a, b) => (a.localeCompare(b) > 0 ? a : b)) 
            : "";

        console.log("✅ Processed Data:", { numbers, alphabets, highest_alphabet: highestAlphabet });

        // ✅ Save to MongoDB
        const newData = new DataModel({ data: inputData, numbers, alphabets, highest_alphabet: highestAlphabet });
        await newData.save();

        res.status(201).json({ 
            message: "✅ Data saved successfully!", 
            numbers, 
            alphabets, 
            highest_alphabet: highestAlphabet 
        });
    } catch (error) {
        console.error("❌ Error processing request:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
