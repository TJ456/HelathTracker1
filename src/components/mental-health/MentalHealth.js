import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSmile, FaMeh, FaFrown, FaHeart, FaBrain, FaBook, FaMoon, FaSun, 
         FaMusic, FaYinYang, FaChartLine, FaLightbulb, FaHeadphones, FaFilm } from 'react-icons/fa';
import './MentalHealth.css';

const MentalHealth = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [activities, setActivities] = useState([]);
  const [showJournal, setShowJournal] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [predictedMood, setPredictedMood] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const moods = [
    { 
      icon: <FaSmile />, 
      label: 'Happy', 
      color: '#4ade80', 
      music: [
        { genre: 'Upbeat Pop', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC' },
        { genre: 'Dance Hits', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX7ZUug1ANKRP' },
        { genre: 'Feel-good Indie', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL' }
      ],
      movies: [
        { title: 'La La Land', genre: 'Musical/Romance', mood: 'Uplifting', link: 'https://www.imdb.com/title/tt3783958/' },
        { title: 'The Secret Life of Walter Mitty', genre: 'Adventure', mood: 'Inspiring', link: 'https://www.imdb.com/title/tt0359950/' },
        { title: 'Big Hero 6', genre: 'Animation', mood: 'Heartwarming', link: 'https://www.imdb.com/title/tt2245084/' }
      ]
    },
    { 
      icon: <FaMeh />, 
      label: 'Neutral', 
      color: '#fbbf24', 
      music: [
        { genre: 'Ambient', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP' },
        { genre: 'Soft Rock', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX6xOPeSOGone' },
        { genre: 'Classical Focus', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn' }
      ],
      movies: [
        { title: 'The Grand Budapest Hotel', genre: 'Comedy/Drama', mood: 'Quirky', link: 'https://www.imdb.com/title/tt2278388/' },
        { title: 'Chef', genre: 'Comedy/Drama', mood: 'Feel-good', link: 'https://www.imdb.com/title/tt2883512/' },
        { title: 'The Hundred-Foot Journey', genre: 'Drama', mood: 'Charming', link: 'https://www.imdb.com/title/tt2980648/' }
      ]
    },
    { 
      icon: <FaFrown />, 
      label: 'Sad', 
      color: '#f87171', 
      music: [
        { genre: 'Calming', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY' },
        { genre: 'Meditation', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5jGX6m' },
        { genre: 'Acoustic Chill', playlist: 'https://open.spotify.com/playlist/37i9dQZF1DX4E3UdUs7fUx' }
      ],
      movies: [
        { title: 'Inside Out', genre: 'Animation', mood: 'Understanding Emotions', link: 'https://www.imdb.com/title/tt2096673/' },
        { title: 'Good Will Hunting', genre: 'Drama', mood: 'Therapeutic', link: 'https://www.imdb.com/title/tt0119217/' },
        { title: 'The Pursuit of Happyness', genre: 'Drama', mood: 'Motivational', link: 'https://www.imdb.com/title/tt0454921/' }
      ]
    }
  ];

  const activityOptions = [
    { icon: <FaHeart />, label: 'Exercise', color: '#ec4899', impact: 0.8 },
    { icon: <FaBrain />, label: 'Meditation', color: '#8b5cf6', impact: 0.7 },
    { icon: <FaBook />, label: 'Reading', color: '#3b82f6', impact: 0.6 },
    { icon: <FaMoon />, label: 'Good Sleep', color: '#6366f1', impact: 0.9 },
    { icon: <FaSun />, label: 'Outdoors', color: '#f59e0b', impact: 0.75 }
  ];

  const mindfulnessExercises = [
    { title: 'Deep Breathing', duration: '5 mins', benefit: 'Reduces stress and anxiety' },
    { title: 'Body Scan', duration: '10 mins', benefit: 'Improves body awareness' },
    { title: 'Mindful Walking', duration: '15 mins', benefit: 'Enhances focus' },
    { title: 'Gratitude Practice', duration: '5 mins', benefit: 'Boosts positivity' }
  ];

  useEffect(() => {
    const savedMoodHistory = localStorage.getItem('moodHistory');
    if (savedMoodHistory) {
      setMoodHistory(JSON.parse(savedMoodHistory));
    }
  }, []);

  const analyzeMood = () => {
    let moodScore = 0;
    
    // Analyze sleep quality (25% weight)
    moodScore += (sleepQuality / 10) * 25;
    
    // Analyze energy level (25% weight)
    moodScore += (energyLevel / 10) * 25;
    
    // Analyze activities (25% weight)
    const activityImpact = activities.reduce((sum, activity) => {
      const activityObj = activityOptions.find(opt => opt.label === activity);
      return sum + (activityObj ? activityObj.impact : 0);
    }, 0);
    moodScore += (activityImpact / activities.length || 0) * 25;
    
    // Enhanced journal sentiment analysis (25% weight)
    const positiveWords = [
      'happy', 'good', 'great', 'wonderful', 'excited', 'peaceful',
      'joy', 'love', 'amazing', 'fantastic', 'excellent', 'blessed',
      'grateful', 'thankful', 'positive', 'awesome', 'beautiful'
    ];
    const negativeWords = [
      'sad', 'bad', 'tired', 'angry', 'stressed', 'anxious',
      'depressed', 'unhappy', 'worried', 'frustrated', 'lonely',
      'nothing', 'empty', 'exhausted', 'overwhelmed', 'hopeless'
    ];
    
    const words = journalEntry.toLowerCase().split(/\s+/);
    let sentimentScore = 0;
    let wordCount = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) {
        sentimentScore += 1;
        wordCount++;
      }
      if (negativeWords.includes(word)) {
        sentimentScore -= 1.5; // Give more weight to negative words
        wordCount++;
      }
    });

    // If no sentiment words found, lean towards neutral-sad
    const normalizedSentiment = wordCount === 0 
      ? 0.3 // Default to slightly negative when no sentiment words
      : (sentimentScore / wordCount + 1) / 2; // Normalize to 0-1

    moodScore += normalizedSentiment * 25;

    // Determine predicted mood with adjusted thresholds
    let predicted;
    if (moodScore >= 65) predicted = moods[0]; // Happy
    else if (moodScore >= 35) predicted = moods[1]; // Neutral
    else predicted = moods[2]; // Sad

    setPredictedMood(predicted);
    setShowRecommendations(true);

    // Save to history with timestamp parts for better graph display
    const timestamp = new Date();
    const newEntry = {
      timestamp: timestamp.toISOString(),
      timeOfDay: timestamp.getHours(),
      activities,
      journalEntry,
      sleepQuality,
      energyLevel,
      predictedMood: predicted.label,
      moodScore,
      sentimentScore: normalizedSentiment
    };
    const updatedHistory = [...moodHistory, newEntry];
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
  };

  const toggleActivity = (activity) => {
    if (activities.includes(activity.label)) {
      setActivities(activities.filter(a => a !== activity.label));
    } else {
      setActivities([...activities, activity.label]);
    }
  };

  return (
    <motion.div 
      className="mental-health-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="title">Mental Wellness Analysis</h1>

      {/* Input Section */}
      <section className="input-section">
        <h2>Track Your Mental State</h2>
        
        {/* Activities */}
        <div className="input-group">
          <h3>What activities have you done today?</h3>
          <div className="activities-grid">
            {activityOptions.map((activity, index) => (
              <motion.div
                key={activity.label}
                className={`activity-card ${activities.includes(activity.label) ? 'selected' : ''}`}
                onClick={() => toggleActivity(activity)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ backgroundColor: activities.includes(activity.label) ? activity.color : undefined }}
              >
                <div className="activity-icon">{activity.icon}</div>
                <span>{activity.label}</span>
                <div className="activity-impact">Impact: {activity.impact * 100}%</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="input-group">
          <div className="sliders-section">
            <div className="slider-container">
              <h3>Sleep Quality</h3>
              <input
                type="range"
                min="1"
                max="10"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                className="slider sleep-slider"
              />
              <div className="slider-value">{sleepQuality}/10</div>
            </div>

            <div className="slider-container">
              <h3>Energy Level</h3>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                className="slider energy-slider"
              />
              <div className="slider-value">{energyLevel}/10</div>
            </div>
          </div>
        </div>

        {/* Journal */}
        <div className="input-group">
          <div className="journal-section">
            <div className="journal-header" onClick={() => setShowJournal(!showJournal)}>
              <h3>Express Your Thoughts</h3>
              <motion.span
                animate={{ rotate: showJournal ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </div>
            <AnimatePresence>
              {showJournal && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <textarea
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    placeholder="How are you feeling? What's on your mind?"
                    className="journal-textarea"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          className="analyze-button"
          onClick={analyzeMood}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Analyze My Mental State
        </motion.button>
      </section>

      {/* Analysis Results */}
      <AnimatePresence>
        {showRecommendations && predictedMood && (
          <motion.section
            className="analysis-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="analysis-content">
              <h2 className="analysis-title">Your Mental Wellness Analysis</h2>
              <div className="analysis-subtitle">
                Based on your activities, sleep quality, energy levels, and emotional expression
              </div>
              
              <div className="prediction-card">
                <div className="prediction-icon" style={{ color: predictedMood.color }}>
                  {predictedMood.icon}
                </div>
                <div className="prediction-details">
                  <h3>Current Emotional State: {predictedMood.label}</h3>
                  <div className="mood-stats">
                    <div className="stat-item">
                      <span className="stat-label">Sleep Quality:</span>
                      <span className="stat-value">{sleepQuality}/10</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Energy Level:</span>
                      <span className="stat-value">{energyLevel}/10</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Activities Done:</span>
                      <span className="stat-value">{activities.length}</span>
                    </div>
                  </div>
                  <p className="mood-description">
                    {predictedMood.label === 'Happy' && "You're in a positive state! Let's maintain this energy with some uplifting activities."}
                    {predictedMood.label === 'Neutral' && "You're in a balanced state. Here are some activities to enhance your mood."}
                    {predictedMood.label === 'Sad' && "We're here to support you. Here are some activities that might help lift your spirits."}
                  </p>
                </div>
              </div>

              <h3 className="recommendations-title">Personalized Recommendations for Your Well-being</h3>

              {/* Music Recommendations */}
              <div className="recommendations-grid">
                <div className="recommendation-card music">
                  <FaHeadphones className="recommendation-icon" />
                  <h3>Music Therapy</h3>
                  <ul>
                    {predictedMood.music.map((item, index) => (
                      <li key={index}>
                        <strong>{item.genre}</strong>
                        <a 
                          href={item.playlist} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="playlist-link"
                        >
                          Listen on Spotify ▶
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Movie Recommendations */}
                <div className="recommendation-card movies">
                  <FaFilm className="recommendation-icon" />
                  <h3>Movie Therapy</h3>
                  <ul>
                    {predictedMood.movies.map((movie, index) => (
                      <li key={index}>
                        <strong>{movie.title}</strong>
                        <span>{movie.genre}</span>
                        <small>{movie.mood}</small>
                        <a 
                          href={movie.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="movie-link"
                        >
                          View on IMDb 🎬
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mindfulness Exercises */}
                <div className="recommendation-card mindfulness">
                  <FaYinYang className="recommendation-icon" />
                  <h3>Mindfulness Exercises</h3>
                  <ul>
                    {mindfulnessExercises.map((exercise, index) => (
                      <li key={index}>
                        <strong>{exercise.title}</strong>
                        <span>{exercise.duration}</span>
                        <small>{exercise.benefit}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Progress Chart */}
      <section className="progress-section">
        <h2>Your Wellness Journey</h2>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color happy"></span>
            <span>Happy (65-100)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color neutral"></span>
            <span>Neutral (35-64)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color sad"></span>
            <span>Sad (0-34)</span>
          </div>
        </div>
        <div className="progress-chart">
          {moodHistory.slice(-7).map((entry, index) => (
            <div key={index} className="chart-column">
              <div className="chart-bar-wrapper">
                <div 
                  className="progress-bar"
                  style={{
                    height: `${(entry.moodScore || 0)}%`,
                    backgroundColor: moods.find(m => m.label === entry.predictedMood)?.color
                  }}
                />
                <div className="score-label">{Math.round(entry.moodScore)}%</div>
              </div>
              <div className="chart-label">
                <div className="date-label">
                  {new Date(entry.timestamp).toLocaleDateString(undefined, { weekday: 'short' })}
                </div>
                <div className="time-label">
                  {new Date(entry.timestamp).toLocaleTimeString(undefined, { hour: 'numeric' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default MentalHealth; 