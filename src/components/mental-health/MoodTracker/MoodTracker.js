import React, { useState } from 'react';
import './MoodTracker.css';

const MoodTracker = () => {
  const [mood, setMood] = useState('');

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Mood:', mood);
    // Add API call to save mood data
  };

  return (
    <div className="mood-tracker">
      <h2>Track Your Mood</h2>
      <form onSubmit={handleSubmit}>
        <label>
          How are you feeling today?
          <select value={mood} onChange={handleMoodChange}>
            <option value="">Select Mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😠 Angry</option>
            <option value="neutral">😐 Neutral</option>
          </select>
        </label>
        <button type="submit">Save Mood</button>
      </form>
    </div>
  );
};

export default MoodTracker;