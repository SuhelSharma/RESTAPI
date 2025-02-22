const DataModel = require("../models/DataModel");

const handlePost = async (req, res) => {
    try {
        const { user_id, email, roll_number, data, selectedCategories } = req.body;

        
        if (selectedCategories) {
            if (!Array.isArray(selectedCategories)) {
                return res.status(400).json({ error: "Invalid request format. Expected an array." });
            }

            console.log("Received Selection:", selectedCategories);
            return res.status(200).json({ message: "Selection received successfully!" });
        }

        
        if (!user_id || !email || !roll_number || !Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: "Missing required fields or invalid data format." });
        }

       
        const formatted_user_id = user_id.trim().toLowerCase().replace(/\s+/g, "_");

        
        const numbers = data.filter(item => !isNaN(item)).map(Number);
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

     
        const highest_alphabet = alphabets.length > 0 
            ? [alphabets.reduce((a, b) => (a.localeCompare(b) > 0 ? a : b))] 
            : [];

        console.log("✅ Processed Data:", { numbers, alphabets, highest_alphabet });

        const newData = await DataModel.create({
            user_id: formatted_user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet
        });

        res.status(201).json({
            is_success: true,
            user_id: formatted_user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet, 
            message: "✅ Data saved successfully!"
        });
    } catch (error) {
        console.error("❌ Error in handlePost:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { handlePost };
