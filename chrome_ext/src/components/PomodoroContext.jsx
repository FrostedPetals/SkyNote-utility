import React, { useState } from 'react'
import { createContext } from 'react';

export const PomodoroContextGiver=createContext();
function PomodoroContext({children}) {
  let [worktime,setWorkTime]=useState(25);
  let [shortbreaktime,setShortbreaktime]=useState(5);
  let [longbreaktime,setLongbreaktime]=useState(10);
  return (
    <PomodoroContextGiver.Provider value={{worktime,setWorkTime,shortbreaktime,setShortbreaktime,longbreaktime,setLongbreaktime}}>
      {children}
    </PomodoroContextGiver.Provider>
  )
}

export default PomodoroContext