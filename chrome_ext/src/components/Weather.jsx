import React, { useEffect, useState,useContext } from 'react';

import { Themecontext } from './Themeprovider';
function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  
  const {theme}=useContext(Themecontext);

  //const APIKEY = process.env.VITE_WEATHER_API; 
  const APIKEY = import.meta.env.VITE_WEATHER_API;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIKEY}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch weather");
          }
          const data = await res.json();
          console.log(data)
          setWeather(data);
        } catch (err) {
          console.error("Some error in data retrieval", err);
          setError("Unable to fetch weather data");
        }
      },
      (err) => {
        console.error("Error reading geographical coordinates", err);
        setError("Location access denied");
      }
    );
  }, [APIKEY]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather...</p>;
  }

   const weathercond=weather.list; //weathercond is an array 

    const nowUTC = Math.floor(Date.now() / 1000); // current time in UTC seconds

    let closest = weathercond[0];
    let minDiff = Math.abs(weathercond[0].dt - nowUTC);

    for (let i = 1; i < weather.list.length; i++) {
      const diff = Math.abs(weathercond[i].dt - nowUTC);
      if (diff < minDiff) {
        minDiff = diff;
        closest = weathercond[i];
      }
    }

    let str=closest.weather[0].description
    str=str.split(" ").reduce((final,elem)=>{
      return final+elem[0].toUpperCase()+ elem.slice(1)+" ";
    },"")
    if (str.includes("Rain")) str+=" 🌧"
    else if (str.includes("Sun")) str+= " ☀"
    else if (str.includes("Clear")) str+=" 🌅"
    else if (str.includes("Cloud")) str+= " ☁"
    else if (str.includes("Snow")) str+=" ❄"
    else if (str.includes("Storm")) str+= " ⛈"
    else if (str.includes("Wind")) str+=" 🍃"
    

  return (
    <div className={(theme==='light'?'widget-light':'widget-dark')}>
      <h2><b><u>{weather.city.name}</u></b></h2>
      <p><b>Temperature:</b> {closest.main.temp}°C</p>
      <p><b>Humidity:</b> {closest.main.humidity}</p>
      <p><b>Condition:</b> {str}</p>
    </div>
  );
}

export default Weather;
