import React, { useState, useEffect } from 'react';
import './ProgressBar.css';
import Navbar from '../Nav';
import Footer from '../Footer'
import { Link } from 'react-router-dom';

const ProgressBar = () => {
  const [apiData, setApiData] = useState({ status: '' });

  useEffect(() => {
    // Replace 'your-api-url-here' with the actual URL of your API endpoint
    fetch('http://172.22.81.182:8080/rfid/getstat/13')
      .then((response) => response.text())
      .then((data) => {
        // Assuming the API response contains only the plain text "REACHED"
        setApiData({ status: data.trim() });
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const labels = ['DISPATCHED', 'REACHED', 'REACHED HUB 1', 'REACHED HUB 2', 'OUTFORDEL'];

  return (
    <div>
    <Navbar/>
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
        <Link to='/map'>
          <button className="bg-amber-400 hover:bg-amber-300 rounded-full h-11 w-24  text-black font-semibold   mt-5">
            Track
          </button>
        </Link>
      )}
    </div>
    <div className='mt-24'>
      <Footer/>
    </div>
    </div>
  );
};

export default ProgressBar;
