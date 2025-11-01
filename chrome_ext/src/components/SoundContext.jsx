import React, { createContext, useState } from "react";
import useSound from "use-sound";

import birdchirp from "/assets/bird-chirp.mp3";
import firecrackling from "/assets/fireplace.mp3";
import oceanwaves from "/assets/ocean-waves.mp3";
import rain from "/assets/rainy-day.mp3";
import thunder from "/assets/thunder.mp3";
import bell from "/assets/bell.mp3";
import ding from "/assets/ding.mp3";
import notif from "/assets/notification.mp3";

export const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [volume, setVolume] = useState(0.5);
  const [currentBgSound, setCurrentBgSound] = useState(null); // for bg music
  const [currentTimerSound, setCurrentTimerSound] = useState(null); // for timer sounds

  // Background sounds (looped)
  const [playBird, { stop: stopBird }] = useSound(birdchirp, {
    loop: true,
    volume,
  });
  const [playFire, { stop: stopFire }] = useSound(firecrackling, {
    loop: true,
    volume,
  });
  const [playOcean, { stop: stopOcean }] = useSound(oceanwaves, {
    loop: true,
    volume,
  });
  const [playRain, { stop: stopRain }] = useSound(rain, { loop: true, volume });
  const [playThunder, { stop: stopThunder }] = useSound(thunder, {
    loop: true,
    volume,
  });

  // Timer sounds (one-shot)
  const [playBell] = useSound(bell, { volume });
  const [playDing] = useSound(ding, { volume });
  const [playNotif] = useSound(notif, { volume });

  // Stop all background sounds
  const stopAllBg = () => {
    stopBird();
    stopFire();
    stopOcean();
    stopRain();
    stopThunder();
  };

  // Play one background sound at a time
  const playBg = (soundName) => {
    if (currentBgSound === soundName) {
      stopAllBg();
      setCurrentBgSound(null);
    } else {
      stopAllBg();
      if (soundName === "bird") playBird();
      else if (soundName === "fire") playFire();
      else if (soundName === "ocean") playOcean();
      else if (soundName === "rain") playRain();
      else if (soundName === "thunder") playThunder();
      setCurrentBgSound(soundName);
    }
  };

  // Play a timer sound (one-shot)
  const playTimer = (soundName) => {
    setCurrentTimerSound(soundName);
    if (soundName === "bell") playBell();
    else if (soundName === "ding") playDing();
    else if (soundName === "notif") playNotif();
  };

  return (
    <SoundContext.Provider
      value={{
        volume,
        setVolume,
        currentBgSound,
        playBg,
        currentTimerSound,
        setCurrentTimerSound,
        playTimer,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}
