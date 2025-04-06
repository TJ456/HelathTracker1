import React, { useState } from 'react';
import './SkinAnalysis.css';
import { FaCloudUploadAlt, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SkinAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
    }
  };

  const analyzeSkin = async () => {
    if (!imageFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch('http://localhost:5001/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Full Response:', result);

      const interpretColorFeatures = (features) => {
        const hue = features.mean_hue;
        const saturation = features.mean_saturation;
        const value = features.mean_value;
        
        let colorAnalysis = [];
        if (hue < 30 && saturation > 50) colorAnalysis.push("Significant redness detected");
        if (saturation > 100) colorAnalysis.push("High color intensity");
        if (value < 100) colorAnalysis.push("Darker areas present");
        if (value > 150) colorAnalysis.push("Inflammation spots detected");
        
        return colorAnalysis.length > 0 ? colorAnalysis.join(", ") : "Normal skin coloration";
      };

      const interpretTextureFeatures = (features) => {
        const variance = features.variance;
        const stdDev = features.standard_deviation || features.std_deviation; // Handle possible key variation
        
        let textureAnalysis = [];
        if (variance > 1500) textureAnalysis.push("Significant texture variations");
        if (stdDev > 40) textureAnalysis.push("Uneven skin surface");
        if (variance > 2500) textureAnalysis.push("Multiple spots or lesions detected");
        
        return textureAnalysis.length > 0 ? textureAnalysis.join(", ") : "Normal skin texture";
      };

      const determineCondition = (features) => {
        const colorFeatures = features.color_features;
        const textureFeatures = features.texture_features;
        const edgeFeatures = features.edge_features;

        if (colorFeatures.mean_hue < 30 && 
            colorFeatures.mean_saturation > 100 && 
            textureFeatures.variance > 1500) {
          return {
            condition: "Acne",
            confidence: 0.85,
            severity: "moderate",
            description: "Multiple inflammatory acne lesions detected with significant redness and uneven texture",
            recommendations: [
              "Consult a dermatologist for proper treatment",
              "Keep the affected area clean with gentle cleansers",
              "Avoid touching or picking at the acne",
              "Consider over-the-counter acne treatments with benzoyl peroxide or salicylic acid",
              "Use non-comedogenic moisturizers and sunscreen"
            ]
          };
        }

        if (colorFeatures.mean_hue < 25 && 
            colorFeatures.mean_saturation > 120 && 
            textureFeatures.variance < 2000) {
          return {
            condition: "Rosacea",
            confidence: 0.80,
            severity: "moderate",
            description: "Significant facial redness with characteristic rosacea patterns",
            recommendations: [
              "Consult a dermatologist for proper diagnosis and treatment",
              "Avoid known triggers (spicy foods, alcohol, extreme temperatures)",
              "Use gentle, fragrance-free skincare products",
              "Apply broad-spectrum sunscreen daily",
              "Consider keeping a trigger diary"
            ]
          };
        }

        if (colorFeatures.mean_hue < 30 && 
            colorFeatures.mean_saturation > 90) {
          return {
            condition: "Inflammatory Skin Condition",
            confidence: 0.75,
            severity: "moderate",
            description: "Signs of skin inflammation with redness and potential irritation",
            recommendations: [
              "Consult a dermatologist for proper diagnosis",
              "Keep the affected area clean and moisturized",
              "Avoid scratching or irritating the area",
              "Use gentle, fragrance-free products",
              "Document any changes in the condition"
            ]
          };
        }

        if (textureFeatures.variance > 2500 || 
            textureFeatures.standard_deviation > 50) {
          return {
            condition: "Skin Texture Abnormality",
            confidence: 0.70,
            severity: "mild",
            description: "Uneven skin texture with possible lesions or irregularities",
            recommendations: [
              "Monitor the condition for any changes",
              "Keep the skin clean and moisturized",
              "Avoid harsh skincare products",
              "Consider consulting a dermatologist",
              "Use sun protection regularly"
            ]
          };
        }

        return {
          condition: "No Significant Condition",
          confidence: 0.60,
          severity: "mild",
          description: "No significant skin abnormalities detected",
          recommendations: [
            "Continue regular skincare routine",
            "Use sun protection",
            "Monitor for any changes",
            "Practice good skin hygiene"
          ]
        };
      };

      const analysis = result.analysis ? determineCondition(result.analysis.visual_features) : {
        condition: "No Analysis Available",
        confidence: 0,
        severity: "unknown",
        description: "Could not analyze the image. Please check the server.",
        recommendations: ["Try again or contact support"]
      };

      const transformedResult = {
        detectedConditions: [{
          condition: analysis.condition,
          confidence: analysis.confidence,
          severity: analysis.severity,
          description: analysis.description,
          recommendations: analysis.recommendations
        }],
        analysisDetails: {
          message: analysis.description,
          visualFeatures: [
            {
              feature: 'Color Analysis',
              value: interpretColorFeatures(result.analysis?.visual_features?.color_features || {})
            },
            {
              feature: 'Texture Analysis',
              value: interpretTextureFeatures(result.analysis?.visual_features?.texture_features || {})
            },
            {
              feature: 'Pattern Analysis',
              value: `Edge density: ${(result.analysis?.visual_features?.edge_features?.edge_density * 100 || 0).toFixed(1)}% - ${
                (result.analysis?.visual_features?.edge_features?.edge_density || 0) > 0.2 ? 'Irregular patterns detected' : 'Normal pattern distribution'
              }`
            }
          ]
        },
        modelStatus: result.model_status || "unknown"
      };

      setAnalysisResult(transformedResult);
    } catch (err) {
      console.error('Fetch Error Details:', err);
      setError(err.message || 'Failed to analyze image. Please check the server and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="skin-analysis-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Skin Condition Analysis</h2>

      <div 
        className="upload-section"
        onClick={() => document.getElementById('file-input').click()}
      >
        <FaCloudUploadAlt className="upload-icon" />
        <p className="upload-text">Click or drag an image here to upload</p>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="image-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <img src={selectedImage} alt="Selected skin" />
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaExclamationTriangle className="inline-block mr-2" />
          {error}
        </motion.div>
      )}

      <motion.button
        className={`analyze-button ${
          loading || !selectedImage ? 'disabled' : ''
        }`}
        onClick={analyzeSkin}
        disabled={loading || !selectedImage}
        whileHover={{ scale: loading || !selectedImage ? 1 : 1.02 }}
        whileTap={{ scale: loading || !selectedImage ? 1 : 0.98 }}
      >
        {loading ? (
          <span className="loading-text">
            <FaSpinner className="spinner" />
            Analyzing...
          </span>
        ) : (
          'Analyze Image'
        )}
      </motion.button>

      {loading && (
        <div className="loading-spinner" />
      )}

      <AnimatePresence>
        {analysisResult && (
          <motion.div 
            className="analysis-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {analysisResult.detectedConditions && analysisResult.detectedConditions.length > 0 ? (
              <>
                <h3 className="text-2xl font-semibold mb-4">Analysis Results</h3>
                {analysisResult.detectedConditions.map((condition, index) => (
                  <motion.div 
                    key={index}
                    className="condition-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="condition-header">
                      <h4 className="condition-title">{condition.condition || 'Unknown Condition'}</h4>
                      <div className="condition-header-right">
                        <span className={`severity ${condition.severity || 'unknown'}`}>
                          {(condition.severity || 'Unknown').charAt(0).toUpperCase() + (condition.severity || 'unknown').slice(1)} Severity
                        </span>
                        <span className="confidence">
                          {Math.round((condition.confidence || 0) * 100)}% Confidence
                        </span>
                      </div>
                    </div>

                    <p className="description">{condition.description || 'No description available.'}</p>

                    {condition.recommendations && condition.recommendations.length > 0 && (
                      <div className="recommendations">
                        <h4>Recommendations</h4>
                        <ul>
                          {condition.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ))}

                {analysisResult.analysisDetails && analysisResult.analysisDetails.visualFeatures && (
                  <div className="visual-features">
                    {analysisResult.analysisDetails.visualFeatures.map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="feature-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h5 className="font-semibold text-gray-700">{feature.feature}</h5>
                        <p className="feature-value">{feature.value}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {analysisResult.requiresImmediateAttention && (
                  <motion.div 
                    className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <FaExclamationTriangle className="inline-block mr-2" />
                    This condition requires immediate medical attention. Please consult a healthcare provider.
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FaCheckCircle className="text-green-500 text-5xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-700">No Significant Issues Detected</h3>
                <p className="text-gray-600 mt-2">
                  {analysisResult.analysisDetails?.message || 'The image appears to be normal.'}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SkinAnalysis;