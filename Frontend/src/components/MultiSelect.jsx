import Select from "react-select";
import axios from "axios";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "alphabets", label: "Alphabets" },
  { value: "highestAlphabet", label: "Highest Alphabet" }
];

const MultiSelect = ({ selectedCategories, setSelectedCategories }) => {
  const handleChange = async (selected) => {
    setSelectedCategories(selected || []);

    if (!selected || selected.length === 0) {
      return;
    }

    try {
      const formattedCategories = selected.map((cat) => cat.value); 

      await axios.post("http://localhost:5000/", {
        selectedCategories: formattedCategories
      });

      console.log("✅ Selection saved:", formattedCategories);
    } catch (error) {
      console.error("❌ Error saving selection:", error.response?.data || error.message);
    }
  };

  return <Select isMulti options={options} value={selectedCategories} onChange={handleChange} />;
};

export default MultiSelect;
