import React,{useContext,useEffect,useState} from "react";
import { NavLink, Routes, Route,Navigate,Outlet } from "react-router-dom";
import { PomodoroContextGiver } from "./PomodoroContext.jsx";
import { SoundContext,SoundProvider } from "./SoundContext.jsx";
import useSound from 'use-sound';
import birdchirp from "/assets/bird-chirp.mp3";
import firecrackling from "/assets/fireplace.mp3"
import oceanwaves from "/assets/ocean-waves.mp3"
import rain from "/assets/rainy-day.mp3"
import thunder from "/assets/thunder.mp3"
import bell from "/assets/bell.mp3"
import ding from "/assets/ding.mp3"
import notif from "/assets/notification.mp3"
export function Timings() {
  const {
    alarmsound,
    setAlarmsound,
    worktime,
    setWorkTime,
    shortbreaktime,
    setShortbreaktime,
    longbreaktime,
    setLongbreaktime,
}= useContext(PomodoroContextGiver);

  return (
    <div className="flex flex-col flex-wrap">
      <h2 className="text-xl font-semibold mb-3">🧭 Timings</h2>
      <p className="text-gray-600 mb-4">Set work and break durations here.</p>

      <label htmlFor="worktime">Work: </label>
      <input
        id="worktime"
        type="number"
        min={5}
        value={worktime}
        onChange={(e) => setWorkTime(Number(e.target.value))}
        placeholder="Enter duration (min)"
        className="w-full text-gray-500 rounded-2xl border mb-5 border-white/20 bg-white/10 px-4 py-2  placeholder-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label htmlFor="shortbreak">Short break: </label>
      <input
        id="shortbreak"
        type="number"
        min={1}
        value={shortbreaktime}
        onChange={(e) => setShortbreaktime(Number(e.target.value))}
        placeholder="Enter duration (min)"
        className="w-full text-gray-500 rounded-2xl border mb-5 border-white/20 bg-white/10 px-4 py-2 placeholder-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label htmlFor="longbreak">Long break: </label>
      <input
        id="longbreak"
        type="number"
        min={1}
        value={longbreaktime}
        onChange={(e) => setLongbreaktime(Number(e.target.value))}
        placeholder="Enter duration (min)"
        className="w-full text-gray-500 rounded-2xl border mb-5  border-white/20 bg-white/10 px-4 py-2  placeholder-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <img src="/assets/time.jpg" className="border rounded-lg border-white/10 shadow-[0_0_20px_rgba(120,120,120)]"/>
    </div>
  );
}

export function BgMusic() {
  const {volume,
        setVolume,
        currentBgSound,
        playBg,
        currentTimerSound,
        playTimer} = useContext(SoundContext);

  return (
    <div className="flex flex-col flex-wrap">
      <h2 className="text-xl font-semibold mb-3">🎵 Background Music</h2>
      <p className="text-gray-600 mb-4">Choose your focus background track.</p>
      <label htmlFor="vol">{parseFloat(volume)<0.53?"🔉":"🔊"}</label>
      <input
        type="range"
        id="vol"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={e => setVolume(parseFloat(e.target.value))}
        className="range range-primary mb-4"
      />
      
      <ul className="space-y-2">
        <li className="flex flex-row justify-between">
          Chirping birds{" "}
          <button
            onClick={() => playBg("bird")}
            className="btn btn-sm"
          >
            {currentBgSound === "bird" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Fireplace{" "}
          <button
            onClick={() => playBg("fire")}
            className="btn btn-sm"
          >
            {currentBgSound === "fire" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Ocean waves{" "}
          <button
            onClick={() => playBg("ocean")}
            className="btn btn-sm"
          >
            {currentBgSound === "ocean" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Rainy day{" "}
          <button
            onClick={() => playBg("rain")}
            className="btn btn-sm"
          >
            {currentBgSound === "rain" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Thunder{" "}
          <button
            onClick={() => playBg("thunder")}
            className="btn btn-sm"
          >
            {currentBgSound === "thunder" ? "⏸ " : "▶ "}
          </button>
        </li>
      </ul>
      <img src="/assets/music.jpg" className="border rounded-lg border-white/10 shadow-[0_0_20px_rgba(120,120,120)]"/>
    </div>
  );
}

export function TimerSound() {
  const {currentTimerSound, setCurrentTimerSound, playTimer}=useContext(SoundContext)
  return (
    <div className="flex flex-col flex-wrap">
      <h2 className="text-xl font-semibold mb-3">🔔 Timer Sound</h2>
      <p className="text-gray-600">Select a sound for timer completion.</p>
      <ul>
        <li className="flex flex-row justify-between">
          Bell
          <button onClick={()=>{ playTimer('bell'); }} className="btn btn-ghost">Set</button>
        </li>
        <li className="flex flex-row justify-between">
          Ding
          <button onClick={()=>{playTimer('ding')}} className="btn btn-ghost">Set</button>
        </li>
        <li className="flex flex-row justify-between">
          Notification
          <button onClick={()=>{playTimer('notif')}} className="btn btn-ghost">Set</button>
        </li>
      </ul>
      <img src="/assets/alarmclock.jpg" className="border rounded-lg border-white/10 shadow-[0_0_20px_rgba(120,120,120)]"/>
    </div>
  );
}


export default function Settings() {
  return (
    
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Header Buttons */}
      <div className="flex space-x-4 mb-6">
        <NavLink
          to="/timings"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-semibold transition ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Timings
        </NavLink>

        <NavLink
          to="/bgmusic"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-semibold transition ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          BG Music
        </NavLink>

        <NavLink
          to="/timersound"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-semibold transition ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          Timer Sound
        </NavLink>
      </div>
        <Routes>
          <Route path="/timings" element={<Timings/>}/>
          <Route path="/bgmusic" element={<BgMusic/>} />
          <Route path="/timersound" element={<TimerSound/>}/>
        </Routes>  

    </div>
  );
}
