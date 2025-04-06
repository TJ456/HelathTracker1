import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="stats-card" onClick={handleClick}>
      <div className="stats-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;