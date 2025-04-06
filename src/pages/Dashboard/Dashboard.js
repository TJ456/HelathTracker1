import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import HealthChart from '../../components/dashboard/HealthChart/HealthChart';
import './Dashboard.css';
import { FaHeartbeat, FaRunning, FaFire, FaBrain, FaHeart, FaDiagnoses, FaUserMd, FaPills } from 'react-icons/fa';
import { MdFace, MdOutlineSkinny } from 'react-icons/md'; // Updated skin icon imports

const Dashboard = () => {
  const navigate = useNavigate();
  const [healthData, setHealthData] = useState({
    heartRate: 72,
    steps: 5000,
    calories: 1200,
    mentalHealthScore: 78,
    diabetesRisk: 'Low',
    heartRisk: 'Moderate',
    skinHealth: 'Normal'
  });

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev => ({
        ...prev,
        heartRate: Math.floor(65 + Math.random() * 20),
        steps: prev.steps + Math.floor(Math.random() * 100),
        calories: prev.calories + Math.floor(Math.random() * 50),
        mentalHealthScore: Math.max(0, Math.min(100, prev.mentalHealthScore + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  const heartRateData = [
    { day: 'Mon', value: 72 },
    { day: 'Tue', value: 75 },
    { day: 'Wed', value: 71 },
    { day: 'Thu', value: 68 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 74 },
    { day: 'Sun', value: 72 }
  ];

  const mentalHealthData = [
    { day: 'Mon', score: 75 },
    { day: 'Tue', score: 72 },
    { day: 'Wed', score: 78 },
    { day: 'Thu', score: 80 },
    { day: 'Fri', score: 82 },
    { day: 'Sat', score: 85 },
    { day: 'Sun', score: 78 }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Health Dashboard</h1>
        <p className="dashboard-subtitle">Your comprehensive health overview</p>
      </div>
      
      <div className="stats-grid">
        <StatsCard 
          title="Heart Rate" 
          value={`${healthData.heartRate} bpm`} 
          icon={<FaHeartbeat />}
          trend="stable"
          onClick={() => navigateTo('/diagnostics/heart-risk')}
        />
        <StatsCard 
          title="Steps" 
          value={healthData.steps.toLocaleString()} 
          icon={<FaRunning />}
          trend="up"
        />
        <StatsCard 
          title="Calories" 
          value={`${healthData.calories.toLocaleString()} kcal`} 
          icon={<FaFire />}
          trend="up"
        />
        <StatsCard 
          title="Mental Health" 
          value={`${healthData.mentalHealthScore}/100`} 
          icon={<FaBrain />}
          trend={healthData.mentalHealthScore > 75 ? 'up' : 'down'}
          onClick={() => navigateTo('/mental-health')}
        />
      </div>

      <div className="health-risk-grid">
        <div 
          className="risk-card diabetes-risk" 
          onClick={() => navigateTo('/diagnostics/diabetes-risk')}
        >
          <div className="risk-icon">
            <FaPills />
          </div>
          <div className="risk-content">
            <h3>Diabetes Risk</h3>
            <p className={`risk-value ${healthData.diabetesRisk.toLowerCase()}`}>
              {healthData.diabetesRisk}
            </p>
            <p className="risk-description">Last assessment: Today</p>
          </div>
        </div>

        <div 
          className="risk-card heart-risk" 
          onClick={() => navigateTo('/diagnostics/heart-risk')}
        >
          <div className="risk-icon">
            <FaHeart />
          </div>
          <div className="risk-content">
            <h3>Heart Disease Risk</h3>
            <p className={`risk-value ${healthData.heartRisk.toLowerCase()}`}>
              {healthData.heartRisk}
            </p>
            <p className="risk-description">Last assessment: Yesterday</p>
          </div>
        </div>

        <div 
          className="risk-card skin-health" 
          onClick={() => navigateTo('/diagnostics/skin-analysis')}
        >
          <div className="risk-icon">
            <MdFace /> {/* Changed from MdSkinny to MdFace */}
          </div>
          <div className="risk-content">
            <h3>Skin Health</h3>
            <p className={`risk-value ${healthData.skinHealth.toLowerCase()}`}>
              {healthData.skinHealth}
            </p>
            <p className="risk-description">Last scan: 2 days ago</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Heart Rate Trends</h3>
          <HealthChart data={heartRateData} color="#ff6b6b" />
        </div>
        <div className="chart-container">
          <h3>Mental Wellness</h3>
          <HealthChart data={mentalHealthData} color="#4ecdc4" />
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button 
            className="action-card"
            onClick={() => navigateTo('/diagnostics')}
          >
            <FaDiagnoses className="action-icon" />
            <span>Run Diagnostics</span>
          </button>
          <button 
            className="action-card"
            onClick={() => navigateTo('/telemedicine')}
          >
            <FaUserMd className="action-icon" />
            <span>Talk to Doctor</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;