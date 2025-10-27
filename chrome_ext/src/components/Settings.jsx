import React,{useContext,useEffect,useState} from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { PomodoroContextGiver } from "./PomodoroContext.jsx";
import useSound from 'use-sound';
import birdchirp from "/assets/bird-chirp.mp3";
import firecrackling from "/assets/fireplace.mp3"
import oceanwaves from "/assets/ocean-waves.mp3"
import rain from "/assets/rainy-day.mp3"
import thunder from "/assets/thunder.mp3"

function Timings() {
  const {
    worktime,
    setWorkTime,
    shortbreaktime,
    setShortbreaktime,
    longbreaktime,
    setLongbreaktime,
}= useContext(PomodoroContextGiver);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">⏱ Timings</h2>
      <p className="text-gray-600 mb-4">Set work and break durations here.</p>

      <label htmlFor="worktime">Work: </label>
      <input
        id="worktime"
        type="number"
        min={5}
        value={worktime}
        onChange={(e) => setWorkTime(Number(e.target.value))}
        placeholder="Enter duration (min)"
        className="w-full rounded-2xl border mb-5 border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label htmlFor="shortbreak">Short break: </label>
      <input
        id="shortbreak"
        type="number"
        min={1}
        value={shortbreaktime}
        onChange={(e) => setShortbreaktime(Number(e.target.value))}
        placeholder="Enter duration (min)"
        className="w-full rounded-2xl border mb-5 border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label htmlFor="longbreak">Long break: </label>
      <input
        id="longbreak"
        type="number"
        min={1}
        value={longbreaktime}
        onChange={(e) => setLongbreaktime(Number(e.target.value))}
        placeholder="Enter duration (min)"
        className="w-full rounded-2xl border mb-5  border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function BgMusic() {
  
  const [playBird, { stop: stopBird }] = useSound(birdchirp, { loop: true });
  const [playFire, { stop: stopFire }] = useSound(firecrackling, { loop: true });
  const [playOcean, { stop: stopOcean }] = useSound(oceanwaves, { loop: true });
  const [playRain, { stop: stopRain }] = useSound(rain, { loop: true });
  const [playThunder, { stop: stopThunder }] = useSound(thunder, { loop: true });

  // Track which sound is currently playing
  const [currentSound, setCurrentSound] = useState(null);

  // Stop any playing sound before starting another
  const stopAll = () => {
    stopBird();
    stopFire();
    stopOcean();
    stopRain();
    stopThunder();
  };

  const handleToggle = (soundName, playFn, stopFn) => {
    if (currentSound === soundName) {
      stopFn(); // stop current
      setCurrentSound(null);
    } else {
      stopAll(); // stop previous if any
      playFn();  // play new one
      setCurrentSound(soundName);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">🎵 Background Music</h2>
      <p className="text-gray-600 mb-4">Choose your focus background track.</p>
      <ul className="space-y-2">
        <li className="flex flex-row justify-between">
          Chirping birds{" "}
          <button
            onClick={() => handleToggle("bird", playBird, stopBird)}
            className="btn btn-sm"
          >
            {currentSound === "bird" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Fireplace{" "}
          <button
            onClick={() => handleToggle("fire", playFire, stopFire)}
            className="btn btn-sm"
          >
            {currentSound === "fire" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Ocean waves{" "}
          <button
            onClick={() => handleToggle("ocean", playOcean, stopOcean)}
            className="btn btn-sm"
          >
            {currentSound === "ocean" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Rainy day{" "}
          <button
            onClick={() => handleToggle("rain", playRain, stopRain)}
            className="btn btn-sm"
          >
            {currentSound === "rain" ? "⏸ " : "▶ "}
          </button>
        </li>

        <li className="flex flex-row justify-between">
          Thunder{" "}
          <button
            onClick={() => handleToggle("thunder", playThunder, stopThunder)}
            className="btn btn-sm"
          >
            {currentSound === "thunder" ? "⏸ " : "▶ "}
          </button>
        </li>
      </ul>
    </div>
  );
}

function TimerSound() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">🔔 Timer Sound</h2>
      <p className="text-gray-600">Select a sound for timer completion.</p>
    </div>
  );
}


export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Header Buttons */}
      <div className="flex space-x-4 mb-6">
        <NavLink
          to="timings"
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
          to="bgmusic"
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
          to="timersound"
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
          <Route path="timings" element={<Timings />} />
          <Route path="bgmusic" element={<BgMusic />} />
          <Route path="timersound" element={<TimerSound />} />
        </Routes>
    </div>
  );
}
