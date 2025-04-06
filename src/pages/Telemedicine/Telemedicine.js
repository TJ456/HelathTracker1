import React, { useState } from 'react';
import DoctorList from '../../components/telemedicine/DoctorList';
import VideoCall from '../../components/telemedicine/VideoCall/VideoCall';
import './Telemedicine.css';

const Telemedicine = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);

  const handleStartCall = (doctor) => {
    setSelectedDoctor(doctor);
    setShowVideoCall(true);
  };

  return (
    <div className="telemedicine">
      <h1>Telemedicine Services</h1>

      {showVideoCall ? (
        <div className="video-consultation">
          <h2>Video Consultation</h2>
          <div className="doctor-info">
            {selectedDoctor && (
              <div className="selected-doctor">
                <h3>Consulting with: Dr. {selectedDoctor.name}</h3>
                <p>{selectedDoctor.specialization}</p>
              </div>
            )}
          </div>
          <VideoCall />
          <button 
            className="back-button"
            onClick={() => setShowVideoCall(false)}
          >
            ← Back to Doctor List
          </button>
        </div>
      ) : (
        <>
          {/* Doctor Availability Section */}
          <div className="doctor-availability">
            <h2>Doctors Available Now</h2>
            <p className="online-doctors">12+ doctors online</p>
            <button
              className="cta-button"
              onClick={() => handleStartCall({ name: 'General Consultation', specialization: 'General Physician' })}
            >
              Start Instant Consultation
            </button>
          </div>

          {/* Doctors List Section */}
          <div className="doctors-list-section">
            <h2>Meet Our Specialists</h2>
            <DoctorList onSelectDoctor={(doctor) => handleStartCall(doctor)} />
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h2>Why Choose Our Telemedicine Service?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>24/7 Availability</h3>
                <p>Access healthcare professionals anytime, anywhere</p>
              </div>
              <div className="feature-card">
                <h3>Secure Platform</h3>
                <p>HIPAA-compliant video consultations for your privacy</p>
              </div>
              <div className="feature-card">
                <h3>Expert Doctors</h3>
                <p>Connect with qualified and experienced healthcare providers</p>
              </div>
              <div className="feature-card">
                <h3>Easy to Use</h3>
                <p>Simple interface for hassle-free consultations</p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="testimonials-section">
            <h2>What Our Users Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "The telemedicine service is amazing! I got instant help from a doctor without leaving my home."
                </p>
                <p className="testimonial-author">- John Doe</p>
              </div>
              <div className="testimonial-card">
                <p className="testimonial-text">
                  "Very professional doctors and excellent video quality. Highly recommended!"
                </p>
                <p className="testimonial-author">- Jane Smith</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Telemedicine;