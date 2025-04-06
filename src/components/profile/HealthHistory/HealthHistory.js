import React from 'react';
import './HealthHistory.css';

const HealthHistory = () => {
  return (
    <div className="health-history">
      <h3>Medical History</h3>
      <div className="history-items">
        <div className="history-item">
          <div className="item-date">15 Jan 2023</div>
          <div className="item-content">
            <h4>Annual Checkup</h4>
            <p>Blood work and physical examination. All results normal.</p>
          </div>
        </div>
        <div className="history-item">
          <div className="item-date">22 Mar 2023</div>
          <div className="item-content">
            <h4>Vaccination</h4>
            <p>Flu vaccine administered. No adverse reactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;