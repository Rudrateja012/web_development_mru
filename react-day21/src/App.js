import React, { useRef, useState } from 'react';
import logom from './logom.svg';
import logor from './logor.svg';
import logou from './logou.svg';
import logoh from './logoh.svg';
import './App.css';

function App() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const intervalRef = useRef(null);

  const startSpin = () => {
    if (!spinning) {
      setSpinning(true);
      intervalRef.current = setInterval(() => {
        setAngle(prev => prev + 10);
      }, 16);
    }
  };

  const stopSpin = () => {
    setSpinning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="App-logo-container"
          onMouseEnter={startSpin}
          onMouseLeave={stopSpin}
          onClick={stopSpin}
        >
          <img
            src={logom}
            className="App-logo"
            alt="logo"
            style={{ transform: `rotate(${angle}deg)` }}
          />
          <img
            src={logor}
            className="App-logo"
            alt="logo"
            style={{ transform: `rotate(${angle}deg)` }}
          />
          <img
            src={logou}
            className="App-logo"
            alt="logo"
            style={{ transform: `rotate(${angle}deg)` }}
          />
          <img
            src={logoh}
            className="App-logo"
            alt="logo"
            style={{ transform: `rotate(${angle}deg)` }}
          />
        </div>
        <p>
         hello this is rudra from malla reddy university, this is my first react app.
        </p>
        <a
          className="App-link"
          href="https://www.mallareddyuniversity.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          hello😊
        </a>
      </header>
    </div>
  );
}

export default App;
