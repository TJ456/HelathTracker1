import React, { useState } from 'react';
import { FaClinicMedical, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="brand-link">
            <FaClinicMedical className="brand-icon" />
            <span>HealthSphere</span>
          </a>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="/" onClick={toggleMobileMenu}>Home</a></li>
          <li><a href="/dashboard" onClick={toggleMobileMenu}>Dashboard</a></li>
          <li><a href="/diagnostics" onClick={toggleMobileMenu}>Diagnostics</a></li>
          <li><a href="/telemedicine" onClick={toggleMobileMenu}>Telemedicine</a></li>
          <li><a href="/profile" onClick={toggleMobileMenu}>Profile</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;