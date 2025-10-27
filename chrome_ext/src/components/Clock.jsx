import React, { useContext,useState,useEffect } from 'react'
import dayjs from 'dayjs'
import { Themecontext } from './Themeprovider';
function Clock() {
  const [time, setTime] = useState(dayjs());
  const {theme}=useContext(Themecontext);
  useEffect(()=>{
    setInterval(()=> setTime(dayjs()), 1000);
  },[]);
    return (<div className={(theme==='light'?'widget-light':'widget-dark')}>
    <div className="time">{time.format('HH:mm:ss')}</div>
    <div className="date"><b>{time.format('dddd, MMM D')}</b></div>
  </div>);
}

export default Clock