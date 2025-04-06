import React, { useState } from 'react';
import ARSkinAnalysisModal from '../ARSkinAnalysisModal/ARSkinAnalysisModal';
import MentalHealthSupportModal from '../MentalHealthSupportModal/MentalHealthSupportModal';
import PredictiveHealthModal from '../PredictiveHealthModal/PredictiveHealthModal'; // Import new modal
import './FeatureCard.css';

const FeatureCard = ({ title, description, icon }) => {
  const [isSkinModalOpen, setIsSkinModalOpen] = useState(false);
  const [isMentalHealthModalOpen, setIsMentalHealthModalOpen] = useState(false);
  const [isPredictiveHealthModalOpen, setIsPredictiveHealthModalOpen] = useState(false); // New state for Predictive Health Analysis

  const handleClick = () => {
    console.log(`Feature clicked: ${title}`);  // Debugging log
    if (title === 'Skin Disease Detection') {
      setIsSkinModalOpen(true);
    } else if (title === 'AI Mental Health Support') {
      setIsMentalHealthModalOpen(true);
    } else if (title === 'Predictive Health Analysis') {
      console.log("Opening Predictive Health Modal...");  // Debugging log
      setIsPredictiveHealthModalOpen(true);
    }
    console.log("isPredictiveHealthModalOpen:", isPredictiveHealthModalOpen); // Debugging log
  };
  
  return (
    <>
      <div className="feature-card" onClick={handleClick}>
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {/* Render the AR Skin Analysis Modal */}
      {isSkinModalOpen && (
        <ARSkinAnalysisModal onClose={() => setIsSkinModalOpen(false)} />
      )}

      {/* Render the Mental Health Support Modal */}
      {isMentalHealthModalOpen && (
        <MentalHealthSupportModal onClose={() => setIsMentalHealthModalOpen(false)} />
      )}

      {/* Render the Predictive Health Analysis Modal */}
      {isPredictiveHealthModalOpen && (
        <PredictiveHealthModal onClose={() => setIsPredictiveHealthModalOpen(false)} />
      )}
    </>
  );
};

export default FeatureCard;