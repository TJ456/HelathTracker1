import React, { useState } from 'react';
import './DiabetesRisk.css';

const DiabetesRisk = () => {
  const [riskLevel, setRiskLevel] = useState('Low');
  const [inputValue, setInputValue] = useState('');

  const calculateRisk = () => {
    // Simulate risk calculation
    const randomRisk = Math.random();
    if (randomRisk < 0.3) {
      setRiskLevel('Low');
    } else if (randomRisk < 0.7) {
      setRiskLevel('Medium');
    } else {
      setRiskLevel('High');
    }
  };

  return (
    <div className="diabetes-risk">
      <h2>Diabetes Risk Assessment</h2>
      <div className="risk-calculator">
        <input
          type="text"
          placeholder="Enter your blood sugar level"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={calculateRisk}>Calculate Risk</button>
      </div>
      <div className="risk-result">
        <h3>Your Risk Level: <span className={`risk-level ${riskLevel.toLowerCase()}`}>{riskLevel}</span></h3>
      </div>
      <p className="description">
        Use this tool to assess your risk of developing diabetes based on your blood sugar levels.
      </p>
    </div>
  );
};

export default DiabetesRisk;