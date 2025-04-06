import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">
          © 2023 <span className="footer-accent">HealthSphere</span>. All rights reserved.
        </p>
        <p className="footer-tagline">
          Empowering you with AI-driven healthcare solutions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;