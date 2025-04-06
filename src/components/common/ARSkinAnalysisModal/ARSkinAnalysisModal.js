import React, { useState } from 'react';
import './ARSkinAnalysisModal.css';

const ARSkinAnalysisModal = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsLoading(true); // Show loading state
      // Simulate AI analysis
      setTimeout(() => {
        setResult('No issues detected.');
        setIsLoading(false); // Hide loading state
      }, 3000); // Simulate a 3-second delay
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>AR Skin Analysis</h2>
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-button">
            {image ? 'Change Image' : 'Choose Image'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {image && <img src={image} alt="Uploaded Skin" className="uploaded-image" />}
        </div>
        {isLoading && (
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        )}
        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
};

export default ARSkinAnalysisModal;