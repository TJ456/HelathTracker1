import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import FeatureCard from '../../components/common/FeatureCard/FeatureCard';
import { motion } from 'framer-motion';

// Using a placeholder image URL from Unsplash (health-themed)
const healthHeroImage = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Simulate real-time health data
  const [stats, setStats] = useState([
    { title: 'Heart Rate', value: '72 bpm', icon: '❤️', trend: 'stable' },
    { title: 'Steps', value: '5,000', icon: '👟', trend: 'up' },
    { title: 'Calories', value: '1,200 kcal', icon: '🔥', trend: 'down' },
    { title: 'Sleep', value: '7.5 hrs', icon: '😴', trend: 'stable' },
  ]);

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats([
        {
          title: 'Heart Rate',
          value: `${Math.floor(60 + Math.random() * 20)} bpm`,
          icon: '❤️',
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)]
        },
        {
          title: 'Steps',
          value: `${Math.floor(4000 + Math.random() * 2000)}`,
          icon: '👟',
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)]
        },
        {
          title: 'Calories',
          value: `${Math.floor(1000 + Math.random() * 500)} kcal`,
          icon: '🔥',
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)]
        },
        {
          title: 'Sleep',
          value: `${(6 + Math.random() * 3).toFixed(1)} hrs`,
          icon: '😴',
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)]
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Example feature data
  const features = [
    {
      title: 'AI Mental Health Support',
      description: 'Emotion recognition, journaling prompts, and crisis prediction.',
      icon: '🧠',
      bgColor: '#FF9AA2',
      onClick: () => navigate('/mental-health'),
    },
    {
      title: 'Predictive Health Analysis',
      description: 'AI-driven risk analysis and personalized treatment plans.',
      icon: '📊',
      bgColor: '#FFB7B2',
      onClick: () => navigate('/predictive-health-analysis'),
    },
    {
      title: 'AI Chatbot Assistance',
      description: 'Voice-activated symptom checker and health tips.',
      icon: '🤖',
      bgColor: '#FFDAC1',
      onClick: () => navigate('/chatbot'),
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your Health, Our Priority
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI-powered healthcare at your fingertips
          </motion.p>
          <motion.button 
            className="cta-button"
            onClick={() => navigate('/get-started')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Get Started →
          </motion.button>
        </div>
        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <img 
            src={healthHeroImage} 
            alt="Happy person using health app" 
            className="hero-image"
          />
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="stats-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2 className="section-title">Your Health Dashboard</h2>
        <p className="section-subtitle">Real-time health metrics and insights</p>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <StatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                onClick={() => alert(`View detailed stats for ${stat.title}`)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Features Section */}
      <motion.div 
        className="features-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2 className="section-title">Discover Our Features</h2>
        <p className="section-subtitle">Comprehensive tools for your health journey</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                bgColor={feature.bgColor}
                onClick={feature.onClick}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Access Section */}
      <motion.div 
        className="quick-access-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h2 className="section-title">Quick Access</h2>
        <p className="section-subtitle">Access our most popular features instantly</p>
        <div className="quick-access-grid">
          <motion.div
            className="quick-access-card skin-analysis"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/diagnostics/skin-analysis')}
          >
            <div className="quick-access-icon">🔍</div>
            <h3>Skin Analysis</h3>
            <p>Get instant analysis of your skin condition</p>
            <div className="quick-access-button">Analyze Now</div>
          </motion.div>
          <motion.div
            className="quick-access-card mental-health"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/mental-health')}
          >
            <div className="quick-access-icon">🧠</div>
            <h3>Mental Health</h3>
            <p>Track your mental well-being</p>
            <div className="quick-access-button">Start Tracking</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;