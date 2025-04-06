import React, { useState, useEffect } from 'react';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const Dashboard = () => {
  const [healthMetrics, setHealthMetrics] = useState({
    heartDisease: null,
    diabetes: null,
    skinCondition: null,
    cholesterol: null
  });

  const [historicalData, setHistoricalData] = useState({
    dates: [],
    heartMetrics: [],
    diabetesMetrics: [],
    cholesterolMetrics: []
  });

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(fetchHealthData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchHealthData = async () => {
    try {
      const [heartData, diabetesData, skinData, cholesterolData, historicalMetrics] = 
        await Promise.all([
          axios.get('/api/health/heart-analysis'),
          axios.get('/api/health/diabetes-analysis'),
          axios.get('/api/health/skin-analysis'),
          axios.get('/api/health/cholesterol-analysis'),
          axios.get('/api/health/historical-metrics')
        ]);

      setHealthMetrics({
        heartDisease: heartData.data,
        diabetes: diabetesData.data,
        skinCondition: skinData.data,
        cholesterol: cholesterolData.data
      });

      setHistoricalData(historicalMetrics.data);
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  // Heart Disease Risk Chart Configuration
  const heartDiseaseChart = {
    labels: historicalData.dates,
    datasets: [
      {
        label: 'Blood Pressure (Systolic)',
        data: historicalData.heartMetrics?.map(m => m.systolic),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Heart Rate',
        data: historicalData.heartMetrics?.map(m => m.heartRate),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Diabetes Analysis Chart
  const diabetesChart = {
    labels: historicalData.dates,
    datasets: [
      {
        label: 'Blood Glucose Level',
        data: historicalData.diabetesMetrics?.map(m => m.glucoseLevel),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
      {
        label: 'HbA1c',
        data: historicalData.diabetesMetrics?.map(m => m.hba1c),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ]
  };

  // Cholesterol Analysis Radar Chart
  const cholesterolRadar = {
    labels: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides'],
    datasets: [
      {
        label: 'Current Levels',
        data: [
          healthMetrics.cholesterol?.total,
          healthMetrics.cholesterol?.hdl,
          healthMetrics.cholesterol?.ldl,
          healthMetrics.cholesterol?.triglycerides
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
      }
    ]
  };

  // Risk Assessment Doughnut Chart
  const riskAssessmentChart = {
    labels: ['Heart Disease Risk', 'Diabetes Risk', 'Cholesterol Risk'],
    datasets: [
      {
        data: [
          healthMetrics.heartDisease?.riskScore,
          healthMetrics.diabetes?.riskScore,
          healthMetrics.cholesterol?.riskScore
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ]
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Clinical Health Analytics Dashboard</h1>
        <div className="last-updated">
          Last Updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="metrics-grid">
        {/* Heart Disease Analysis Section */}
        <div className="metric-card">
          <h2>Cardiovascular Health Trends</h2>
          <Line 
            data={heartDiseaseChart}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Cardiovascular Metrics Over Time'
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
          <div className="metric-details">
            <p>Risk Level: {healthMetrics.heartDisease?.riskLevel}</p>
            <p>Key Factors: {healthMetrics.heartDisease?.keyFactors.join(', ')}</p>
          </div>
        </div>

        {/* Diabetes Analysis Section */}
        <div className="metric-card">
          <h2>Diabetes Indicators</h2>
          <Bar 
            data={diabetesChart}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Glucose and HbA1c Levels'
                }
              }
            }}
          />
          <div className="metric-details">
            <p>Current A1C: {healthMetrics.diabetes?.currentA1C}</p>
            <p>Glucose Trend: {healthMetrics.diabetes?.glucoseTrend}</p>
          </div>
        </div>

        {/* Cholesterol Analysis Section */}
        <div className="metric-card">
          <h2>Lipid Profile Analysis</h2>
          <Radar 
            data={cholesterolRadar}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Cholesterol Components'
                }
              }
            }}
          />
        </div>

        {/* Overall Risk Assessment */}
        <div className="metric-card">
          <h2>Comprehensive Risk Assessment</h2>
          <Doughnut 
            data={riskAssessmentChart}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Risk Distribution'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 