import { useState, useEffect } from "react";
import axios from "axios";
import MultiSelect from "./components/MultiSelect";
import FilterResults from "./components/FilterResults";
import DataInput from "./components/DataInput";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rollNo, setRollNo] = useState(""); // Track roll number

  // Fetch stored data from MongoDB when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restapi-lwbo.onrender.com/");
        setData(response.data || {});
      } catch (error) {
        console.error("❌ Error fetching stored data:", error);
      }
    };

    fetchData();
  }, []);

  // Update the document title when rollNo changes
  useEffect(() => {
    if (rollNo) {
      document.title = `Roll No: ${rollNo}`;
    } else {
      document.title = "Data Filtering App";
    }
  }, [rollNo]);

  // Function to handle submission from DataInput component
  const handleSubmit = async (submittedData) => {
    try {
      await axios.post("https://restapi-lwbo.onrender.com/", submittedData);
      console.log("✅ Data stored successfully!");

      if (submittedData.rollNo) {
        setRollNo(submittedData.rollNo); // Update roll number state
      }
    } catch (error) {
      console.error("❌ Error storing data:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Data Filter</h1>
      
      
      <DataInput setData={setData} onSubmit={handleSubmit} setRollNo={setRollNo} />
      
      <MultiSelect 
        selectedCategories={selectedCategories} 
        setSelectedCategories={setSelectedCategories} 
      />
      
      <FilterResults data={data} selectedCategories={selectedCategories} />
    </div>
  );
};

export default App;
