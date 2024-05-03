import React from 'react';

const FillBar = ({ value, maxValue, wordValue }) => {
  const fillPercentage = (value / maxValue) * 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '2%' }}>
      <div
        style={{
          width: '100%', 
          height: '5vh', 
          backgroundColor: '#818696', 
          borderRadius: '5px',
          marginRight: '10px', 
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${fillPercentage}%`,
            height: '100%',
            backgroundColor: '#0077B6', 
            borderRadius: 'inherit', 
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: '9px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#ffffff'
          }}
        >
          {value}
        </span>
        <span
          style={{
            position: 'absolute',
            left: '9px',
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: '#ffffff'
          }}
        >
          {wordValue}
        </span>
      </div>
    </div>
  );
};

export default FillBar;
