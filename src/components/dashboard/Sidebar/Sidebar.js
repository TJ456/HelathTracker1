import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Health-Tracker</h2>
      <ul>
        <li>Dashboard</li>
        <li>Mental Health</li>
        <li>Diagnostics</li>
        <li>Telemedicine</li>
        <li>Profile</li>
      </ul>
    </div>
  );
};

export default Sidebar;