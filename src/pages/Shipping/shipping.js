// ProgressBar.js
import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ trackingNumber }) => {
  const [apiData, setApiData] = useState({ status: '' });

  useEffect(() => {
    // Use the trackingNumber prop to construct the API URL
    if (trackingNumber) {
      fetch(`http://172.22.81.182:8080/rfid/getstat/${trackingNumber}`)
        .then((response) => response.text())
        .then((data) => {
          // Assuming the API response contains only the plain text "REACHED"
          setApiData({ status: data.trim() });
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
        });
    }
  }, [trackingNumber]); // Include trackingNumber in the dependency array

  const labels = ['DISPATCHED', 'REACHED', 'REACHED HUB 1', 'REACHED HUB 2', 'OUTFORDEL'];

  return (
    <div className="progress-bar">
      <div className="progress-labels">
        {labels.map((label) => (
          <div
            key={label}
            className={`progress-label ${apiData.status === label ? 'active' : ''}`}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={`progress-bar ${apiData.status}`} />
      {apiData.status === 'OUTFORDEL' && (
        <button className="bg-amber-400 hover:bg-amber-300 rounded-full h-11 w-24  text-black font-semibold   mt-5">
          Track
        </button>
      )}
    </div>
  );
};

export default ProgressBar;
