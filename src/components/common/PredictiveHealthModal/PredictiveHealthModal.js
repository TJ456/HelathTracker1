import React, { useState } from "react";
import diseaseData from './diseaseData'; // Correct import path
import "./PredictiveHealthModal.css";

const PredictiveHealthModal = ({ onClose }) => {
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [bp, setBp] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state

    // Simulate health analysis (replace with actual API call)
    setTimeout(() => {
      const userData = { age: +age, bmi: +bmi, bloodSugar: +bloodSugar, bp: +bp };

      // Calculate risk level
      let riskLevel = "Low";
      let advice = "You are in good health! Maintain your lifestyle and stay active.";

      diseaseData.forEach(disease => {
        const factors = disease.riskFactors;
        let isAtRisk = true;

        // Check if user data meets the risk factors
        for (const key in factors) {
          if (factors[key].min !== undefined && userData[key] < factors[key].min) {
            isAtRisk = false;
            break;
          }
        }

        // Update risk level and advice if at risk
        if (isAtRisk && disease.riskLevel === "High") {
          riskLevel = "High";
          advice = disease.advice;
        } else if (isAtRisk && disease.riskLevel === "Moderate" && riskLevel !== "High") {
          riskLevel = "Moderate";
          advice = disease.advice;
        }
      });

      // Set the result
      setResult(`Risk Level: ${riskLevel}\nAdvice: ${advice}`);
      setIsLoading(false); // Hide loading state
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Predictive Health Analysis</h2>
        <p>Enter your health data below for analysis.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Age: <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </label>
          <label>
            BMI: <input type="number" value={bmi} onChange={(e) => setBmi(e.target.value)} required />
          </label>
          <label>
            Blood Sugar: <input type="number" value={bloodSugar} onChange={(e) => setBloodSugar(e.target.value)} required />
          </label>
          <label>
            Blood Pressure: <input type="number" value={bp} onChange={(e) => setBp(e.target.value)} required />
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {isLoading && (
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        )}

        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
};

export default PredictiveHealthModal;