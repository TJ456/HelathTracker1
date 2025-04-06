import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiagnosticPanel = () => {
  const [heartData, setHeartData] = useState(null);
  const [diabetesData, setDiabetesData] = useState(null);

  const submitHeartAnalysis = async (userData) => {
    try {
      const response = await axios.post('/api/health/heart-analysis', {
        age: userData.age,
        sex: userData.sex,
        cp: userData.chestPain,
        trestbps: userData.bloodPressure,
        chol: userData.cholesterol,
        fbs: userData.bloodSugar,
        restecg: userData.ecg,
        thalach: userData.maxHeartRate,
        exang: userData.exerciseAngina,
        oldpeak: userData.stDepression,
        slope: userData.stSlope,
        ca: userData.vessels,
        thal: userData.thalassemia
      });
      setHeartData(response.data);
    } catch (error) {
      console.error('Error in heart disease analysis:', error);
    }
  };

  const submitDiabetesAnalysis = async (userData) => {
    try {
      const response = await axios.post('/api/health/diabetes-analysis', {
        pregnancies: userData.pregnancies,
        glucose: userData.glucose,
        blood_pressure: userData.bloodPressure,
        skin_thickness: userData.skinThickness,
        insulin: userData.insulin,
        bmi: userData.bmi,
        diabetes_pedigree: userData.diabetesPedigree,
        age: userData.age
      });
      setDiabetesData(response.data);
    } catch (error) {
      console.error('Error in diabetes analysis:', error);
    }
  };

  return (
    <div className="diagnostic-panel">
      {/* Add your form components and visualization components here */}
      {/* Use the heartData and diabetesData states to display results */}
    </div>
  );
};

export default DiagnosticPanel; 