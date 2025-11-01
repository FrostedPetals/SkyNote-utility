import React, { useContext } from "react";
import Typewriter from "typewriter-effect"; {/*USEFUL*/}
import { Themecontext } from "./Themeprovider";
function Home() {
  const {theme}=useContext(Themecontext)
  return (
    <>
    <div className={` text-4xl sm:text-5xl md:text-9xl font-bold tracking-wide ${theme==='light'?`
   text-gray-900
  [text-shadow:_0_0_8px_rgb(255_255_255_/_0.6),_0_0_16px_rgb(200_200_255_/_0.5)]`:`text-white
  [text-shadow:_0_0_12px_rgb(0_255_255_/_0.8),_0_0_28px_rgb(0_200_255_/_1)]` }`}>
      <Typewriter
        options={{
          strings: ["SkyNote", "Rise, focus, shine."],
          autoStart: true,
          loop: true,
          pauseFor: 1000,
        }}
      />
    </div>

    </>
  );
}

export default Home;
