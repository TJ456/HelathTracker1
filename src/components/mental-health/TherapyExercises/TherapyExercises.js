import React from 'react';
import './TherapyExercises.css';

const TherapyExercises = () => {
  const exercises = [
    { id: 1, name: 'Deep Breathing', duration: '5 mins' },
    { id: 2, name: 'Guided Meditation', duration: '10 mins' },
    { id: 3, name: 'Progressive Muscle Relaxation', duration: '15 mins' },
  ];

  return (
    <div className="therapy-exercises">
      <h2>Therapy Exercises</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <h3>{exercise.name}</h3>
            <p>{exercise.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TherapyExercises;