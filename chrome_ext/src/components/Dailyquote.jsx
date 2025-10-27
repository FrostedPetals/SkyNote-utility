import React, { useEffect, useState,useContext } from 'react';

import { Themecontext } from './Themeprovider';

function Dailyquote() {
  const [quote, setQuote] = useState(null); // start as null
  
  const {theme}=useContext(Themecontext);
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://thequoteshub.com/api/random-quote');
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setQuote(data);
      } catch (err) {
        console.error("Some error in data retrieval", err);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className={`${theme === 'light' ? 'widget-light' : 'widget-dark'} poiret-one-regular`}>
      <blockquote>
        {quote && quote.text ? quote.text : "Escape the ordinary"}
      </blockquote>
      <cite>
        <b >
        {quote && quote.author ? quote.author : "Unknown"}
        </b>
      </cite>
    </div>
  );
}

export default Dailyquote;
