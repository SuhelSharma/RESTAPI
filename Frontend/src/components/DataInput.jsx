import { useState } from "react";
import axios from "axios";

const DataInput = ({ setData, setRollNo }) => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(dataInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error();
      }

      const requestData = {
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        data: parsedData.data,
      };

      const response = await axios.post("http://localhost:5000/", requestData);
      setData(response.data);
      setError("");
      setResponseMessage("✅ Data saved successfully!");

      // Update roll number in the parent component (App.js)
      setRollNo(rollNumber);
    } catch {
      setError("❌ Invalid JSON format! Use {\"data\": [values]}");
      setResponseMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        {/* User ID */}
        <div className="input-group">
          <label>User ID</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {/* Roll Number */}
        <div className="input-group">
          <label>Roll Number</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => {
              setRollNumber(e.target.value);
              setRollNo(e.target.value); // Update roll number title in real time
            }}
          />
        </div>

      
        <div className="input-group">
          <label>Enter Data</label>
          <textarea
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            placeholder='{"data": ["A", "3", "B"]}'
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>

        {responseMessage && <p className="success-message">{responseMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default DataInput;
