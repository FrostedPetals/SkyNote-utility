import React, {  createContext,useState } from 'react'

const Themecontext=createContext(); //always create context outside of provider
//function

function Themeprovider({children}) {
  const Themeprovider=createContext();
  const [theme,setTheme]=useState('light');

  const toggleTheme=()=>{
    setTheme((prev)=>(prev==='light')?'dark':'light')
  }
  return (
    <Themecontext.Provider value={{theme,setTheme,toggleTheme}}>
      {children}
    </Themecontext.Provider>
  )
}

export {Themecontext,Themeprovider}