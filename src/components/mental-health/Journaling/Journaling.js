import React, { useState } from 'react';
import './Journaling.css';

const Journaling = () => {
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Journal Entry:', entry);
    // Add API call to save journal entry
  };

  return (
    <div className="journaling">
      <h2>Journaling</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your thoughts here..."
        />
        <button type="submit">Save Entry</button>
      </form>
    </div>
  );
};

export default Journaling;