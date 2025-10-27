import React, { useContext, useState, useEffect, useRef } from 'react'
import { Themecontext } from './Themeprovider.jsx';
import { PomodoroContextGiver } from './PomodoroContext.jsx';

function Pomodoro() {
  //localStorage.setItem("work")
  const [mode, setMode] = useState('work');
  const [isRunning, setIsRunning] = useState(false); // default stopped
  const [timeLeft, setTimeLeft] = useState(10); // initial time in seconds

  const {worktime,shortbreaktime,longbreaktime}=useContext(PomodoroContextGiver)
  const intervalRef = useRef(null);

  useEffect(() => {
    if (mode === "work") setTimeLeft(worktime * 60);
    if (mode === "shortbreak") setTimeLeft(shortbreaktime * 60);
    if (mode === "longbreak") setTimeLeft(longbreaktime * 60);
  }, [mode, worktime, shortbreaktime, longbreaktime]);

  const formatTime = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  };

  const resetTime = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    
    if (mode === "work") setTimeLeft(worktime * 60);
    if (mode === "shortbreak") setTimeLeft(shortbreaktime * 60);
    if (mode === "longbreak") setTimeLeft(longbreaktime * 60);
  };

  const timerStart = () => {
    if (intervalRef.current) return; // prevent multiple intervals
    setIsRunning(true);
    let duration = timeLeft;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const { theme } = useContext(Themecontext);

  return (
    <>
      <h2 className={`${theme === 'light' ? 'widget-light' : 'widget-dark'} inline-block`}>
        Pomodoro</h2>{/* SHOW THE TIME HERE */}
      <div className='res' style={{ fontSize: "2em", margin: "1em 0" }}>
        {formatTime(timeLeft)}
      </div>
      <div className='block'>
      <button className='timer-option' onClick={() => setMode('work')}>Work</button>
      <button className='timer-option' onClick={() => setMode('shortbreak')}>Short break</button>
      <button className='timer-option' onClick={() => setMode('longbreak')}>Long break</button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={timerStart} disabled={isRunning}>Start</button>
        <button style={{ marginLeft: '10px' }} onClick={resetTime}>Reset</button>
      </div>
    </>
  );
}

export default Pomodoro;
