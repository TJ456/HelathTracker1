import React, { useState, useRef, useEffect } from 'react';
import './MentalHealthSupportModal.css';

const MentalHealthSupportModal = ({ onClose }) => {
  const [mood, setMood] = useState('');
  const [showMusic, setShowMusic] = useState(false);
  const [showArt, setShowArt] = useState(false);
  const [playlist, setPlaylist] = useState('');
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [comment, setComment] = useState('');
  const canvasRef = useRef(null);

  const moodPlaylists = {
    happy: '37i9dQZF1DXdPec7aLTmlC', // Energetic and joyful playlist
    sad: '37i9dQZF1DX3rxVfibe1L0', // Happy, uplifting playlist
    angry: '37i9dQZF1DX3rxVfibe1L0', // Soothing, calming playlist
    neutral: '37i9dQZF1DX4WYpdgoIcn6', // Chill and relaxing playlist
  };

  const moodMessages = {
    happy: 'Keep shining! Your happiness is contagious. 🌟',
    sad: 'It’s okay to feel down. Let’s turn that frown upside down! 🌈',
    angry: 'Take a deep breath. Calmness is your superpower. 🧘‍♂️',
    neutral: 'Stay balanced and enjoy the little moments. 🌿',
  };

  const handleMoodChange = (e) => {
    const selectedMood = e.target.value;
    setMood(selectedMood);
    setPlaylist(moodPlaylists[selectedMood]); // Set playlist based on mood
    setShowMusic(true); // Automatically show music section
  };

  const handleMusicClick = () => {
    setShowMusic(true);
    setShowArt(false);
  };

  const handleArtClick = () => {
    setShowArt(true);
    setShowMusic(false);
    setComment(''); // Reset comment when switching to Art Therapy
  };

  // Drawing functionality
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !showArt) return; // Ensure canvas exists and Art Therapy is active

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineWidth = brushSize;
    context.strokeStyle = brushColor;

    let isDrawing = false;

    const startDrawing = (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
      context.beginPath();
      context.moveTo(x, y);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      // Cleanup mouse events
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);

      // Cleanup touch events
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [brushSize, brushColor, showArt]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas exists
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setComment(''); // Reset comment when clearing the canvas
  };

  // Submit drawing and get mental health comment
  const submitDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get pixel data from the canvas
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Count dark pixels (RGB values below a threshold)
    let darkPixelCount = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r < 100 && g < 100 && b < 100) {
        darkPixelCount++;
      }
    }

    // Determine the comment based on dark pixel count
    let comment = '';
    if (darkPixelCount > 10000) {
      comment = 'Your drawing has a lot of dark areas. It’s okay to feel down sometimes. 🌧️';
    } else if (darkPixelCount > 5000) {
      comment = 'Your drawing shows some tension. Take a deep breath and relax. 🧘‍♂️';
    } else {
      comment = 'Your drawing looks vibrant and full of life! Keep spreading positivity. 🌈';
    }

    setComment(comment);
  };

  // Clear canvas when Art Therapy is inactive
  useEffect(() => {
    if (!showArt) {
      clearCanvas();
    }
  }, [showArt]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>AI Mental Health Support</h2>

        {/* Mood Tracker */}
        <div className="mood-tracker">
          <h3>How are you feeling today?</h3>
          <select value={mood} onChange={handleMoodChange}>
            <option value="">Select Mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😠 Angry</option>
            <option value="neutral">😐 Neutral</option>
          </select>
        </div>

        {/* Mood Message */}
        {mood && (
          <div className="mood-message">
            <p>{moodMessages[mood]}</p>
          </div>
        )}

        {/* Music Therapy */}
        {showMusic && playlist && (
          <div className="music-therapy">
            <h3>Music Therapy</h3>
            <p>Here’s a playlist curated just for you:</p>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlist}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media"
              title="Spotify Playlist"
            ></iframe>
          </div>
        )}

        {/* Art Therapy */}
        {showArt && (
          <div className="art-therapy">
            <h3>Art Therapy</h3>
            <p>Draw something that represents how you feel today:</p>
            <div className="canvas-container">
              <canvas
                ref={canvasRef}
                width="400"
                height="200"
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
              ></canvas>
              <div className="art-tools">
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                />
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(e.target.value)}
                />
                <button onClick={clearCanvas}>Clear</button>
                <button onClick={submitDrawing}>Submit</button>
              </div>
            </div>
            {comment && (
              <div className="drawing-comment">
                <p>{comment}</p>
              </div>
            )}
          </div>
        )}

        {/* Therapy Options */}
        <div className="therapy-options">
          <button onClick={handleMusicClick}>Music Therapy</button>
          <button onClick={handleArtClick}>Art Therapy</button>
        </div>

        {/* Emergency Contact Section */}
        <div className="emergency-contact">
          <h3>Emergency Contacts (India)</h3>
          <p>If you need immediate help, contact:</p>
          <ul>
            <li>
              <strong>Vandrevala Foundation Helpline</strong>: <a href="tel:18602662345">1860 266 2345</a> (24x7)
            </li>
            <li>
              <strong>iCall Psychosocial Helpline</strong>: <a href="tel:9152987821">+91 91529 87821</a> (Mon-Sat, 10 AM - 8 PM)
            </li>
            <li>
              <strong>Fortis Stress Helpline</strong>: <a href="tel:8376804102">+91 83768 04102</a> (24x7)
            </li>
            <li>
              <strong>Suicide Prevention Helpline (AASRA)</strong>: <a href="tel:9820466726">+91 98204 66726</a> (24x7)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthSupportModal;