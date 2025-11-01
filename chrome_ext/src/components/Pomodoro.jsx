import React, { useContext, useState, useEffect, useRef } from 'react'
import { Themecontext } from './Themeprovider.jsx';
import { PomodoroContextGiver } from './PomodoroContext.jsx';
import { SoundContext,SoundProvider } from "./SoundContext.jsx";
import bell from "/assets/bell.mp3"
import ding from "/assets/ding.mp3"
import notif from "/assets/notification.mp3"
import useSound from 'use-sound';

function Pomodoro() {
  //localStorage.setItem("work")
  const [mode, setMode] = useState('work');
  const [isRunning, setIsRunning] = useState(false); // default stopped
  const [timeLeft, setTimeLeft] = useState(10); // initial time in seconds

  const {worktime,shortbreaktime,longbreaktime,alarmsound,setAlarmsound}=useContext(PomodoroContextGiver)
  const intervalRef = useRef(null);
  

  const [playbell,{stop:bellstop}]=useSound(bell);
  const [playding,{stop:dingstop}]=useSound(ding);
  const [playnotif,{stop:notifstop}]=useSound(notif);

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
  
    const {currentTimerSound, setCurrentTimerSound, playTimer}=useContext(SoundContext)

  const timerStart = () => {
    if (intervalRef.current) return; // prevent multiple intervals
    setIsRunning(true);
    let duration = timeLeft;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playTimer(currentTimerSound);
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
    <div className="border-2 p-5 max-w-[94%] mx-auto sm:mt-4 sm:p-6">

      <div className="backdrop-blur-lg bg-white/10 border text-center justify-center flex place-items-center border-white/20 p-6 rounded-2xl shadow-xl text-white text-2xl max-w-sm">
        {formatTime(timeLeft)}
      </div>
      <div className='flex flex-col '>
      <div className='block'>
      <button className={`px-5 py-2 rounded-lg font-bold transition-all duration-300
    ${theme === "light"
      ? "bg-white text-blue-600 border border-blue-400 hover:shadow-[0_0_15px_#60a5fa] hover:scale-105"
      : "bg-gray-900 text-cyan-400 border border-cyan-500 hover:shadow-[0_0_20px_#06b6d4] hover:scale-105"
    }`} onClick={() => setMode('work')}>Work</button>

      <button className={`px-5 py-2 rounded-lg font-bold transition-all duration-300
    ${theme === "light"
      ? "bg-white text-blue-600 border border-blue-400 hover:shadow-[0_0_15px_#60a5fa] hover:scale-105"
      : "bg-gray-900 text-cyan-400 border border-cyan-500 hover:shadow-[0_0_20px_#06b6d4] hover:scale-105"
    }`} onClick={() => setMode('shortbreak')}>Short break</button>

      <button className={`px-5 py-2 rounded-lg font-bold transition-all duration-300
    ${theme === "light"
      ? "bg-white text-blue-600 border border-blue-400 hover:shadow-[0_0_15px_#60a5fa] hover:scale-105"
      : "bg-gray-900 text-cyan-400 border border-cyan-500 hover:shadow-[0_0_20px_#06b6d4] hover:scale-105"
    }`} onClick={() => setMode('longbreak')}>Long break</button>

      </div>
      <div className='inline-block m-4'>
        <button onClick={timerStart} disabled={isRunning} className='btn btn-ghost text-xl'>Start</button>
        <button style={{ marginLeft: '10px' }} onClick={resetTime} className='btn btn-ghost text-xl'>Reset</button>
      </div>
      </div>
    </div>
  );
}

export default Pomodoro;
