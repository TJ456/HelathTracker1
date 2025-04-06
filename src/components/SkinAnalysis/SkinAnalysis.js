import React, { useState } from 'react';
import axios from 'axios';

const SkinAnalysis = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        setError(null);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(
                'http://localhost:5001/api/analyze-skin',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setAnalysis(response.data);
        } catch (error) {
            console.error('Analysis error:', error);
            setError(error.response?.data?.detail || 'Error analyzing image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="skin-analysis-container">
            <h2>Skin Condition Analysis</h2>
            
            <div className="upload-section">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="file-input"
                />
                <button 
                    onClick={handleAnalyze}
                    disabled={!selectedFile || loading}
                    className="analyze-button"
                >
                    {loading ? 'Analyzing...' : 'Analyze Image'}
                </button>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {analysis && (
                <div className="analysis-results">
                    <h3>Analysis Results</h3>
                    <p>Condition: {analysis.condition}</p>
                    <p>Confidence: {(analysis.confidence * 100).toFixed(2)}%</p>
                    
                    <div className="probabilities">
                        <h4>Detailed Probabilities:</h4>
                        {Object.entries(analysis.probabilities).map(([condition, prob]) => (
                            <div key={condition} className="probability-item">
                                <span>{condition}:</span>
                                <span>{(prob * 100).toFixed(2)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkinAnalysis; 