const diseaseData = [
    {
      name: "Diabetes",
      riskFactors: { bmi: { min: 25 }, bloodSugar: { min: 140 } },
      advice: "Reduce sugar intake, exercise regularly, and consult a doctor.",
      riskLevel: "High"
    },
    {
      name: "Hypertension",
      riskFactors: { bp: { min: 140 } },
      advice: "Monitor blood pressure, reduce salt intake, and stay active.",
      riskLevel: "Moderate"
    },
    {
      name: "Heart Disease",
      riskFactors: { age: { min: 45 }, bmi: { min: 28 }, bp: { min: 135 } },
      advice: "Maintain a healthy diet, avoid smoking, and get regular checkups.",
      riskLevel: "High"
    },
    {
      name: "Obesity",
      riskFactors: { bmi: { min: 30 } },
      advice: "Focus on weight management, eat a balanced diet, and exercise daily.",
      riskLevel: "Moderate"
    },
    {
      name: "Low Risk",
      riskFactors: {}, // No specific thresholds
      advice: "You are in good health! Maintain your lifestyle and stay active.",
      riskLevel: "Low"
    }
  ];
  
  export default diseaseData;