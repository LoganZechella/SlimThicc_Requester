import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SongRequestForm from './components/SongRequestForm';
import Splitting from 'splitting';
import './styles/retro.css';
import backgroundNoise from './assets/background-noise.png';

function App() {
  const [time, setTime] = useState('--:--');
  const [counter, setCounter] = useState('0:00:00');

  // Initialize text splitting animation effect on component mount
  useEffect(() => {
    Splitting();
    
    // Set CSS variable for noise texture
    document.documentElement.style.setProperty('--noise-texture', `url(${backgroundNoise})`);
    
    // Initialize time display
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${mins}`);
    };
    
    // Update time every minute
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    
    // Initialize counter (simulated VHS counter)
    let seconds = 0;
    const counterInterval = setInterval(() => {
      seconds++;
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      setCounter(`${h}:${m}:${s}`);
    }, 1000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <>
      {/* Retro effects */}
      <div className="scanlines"></div>
      <div className="retro-background"></div>
      <div className="noise"></div>
      <div className="noise noise-moving"></div>
      
      {/* VHS-style UI elements */}
      <div className="vhs-play" data-splitting>PLAY</div>
      <div className="vhs-time">{time}</div>
      <div className="vhs-counter">SLP {counter}</div>
      
      <div className="app-container">
        <div className="card">
          <h1 className="title retro-text" data-splitting>Request a song from DJ Slim Thicc</h1>
          <SongRequestForm />
          <ToastContainer 
            position="bottom-center" 
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            theme="dark"
          />
        </div>
      </div>
    </>
  );
}

export default App;
