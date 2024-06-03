import React from 'react';

export default function IndividualLeaderBoard({userName, numberOfGuesses, date}) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '5%', margin: '2%' }}>
      <h5 style={{ color: '#1a75ff', marginBottom: '5px' }}>{userName}</h5>
      <p style={{ color: '#757575', marginBottom: '2px' }}>Number of guesses: {numberOfGuesses}</p>
      <p style={{ color: '#757575', marginBottom: '2px' }}>Date: {date}</p>
    </div>
  );
}