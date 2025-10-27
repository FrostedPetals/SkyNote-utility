import { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Themecontext } from "./components/Themeprovider";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import ToDo from "./components/ToDo";
import Dailyquote from "./components/Dailyquote";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";

const defaultLayout = ["clock", "weather", "todo", "quotes", "pomodoro"];

function App() {
  const [layout, setLayout] = useState(defaultLayout);
  const { theme, toggleTheme } = useContext(Themecontext);
  let UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);

  const changeWallpaper = () => {
    fetch(
      `https://api.unsplash.com/photos/random?query=landscape&client_id=${UNSPLASH_KEY}`
    )
      .then((r) => r.json())
      .then((js) => {
        document.body.style.backgroundImage = `url(${js.urls.regular})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      })
      .catch((err) => console.error("Error fetching Unsplash image:", err));
  };

  //  Separate widget groups 
  const Page1 = () => (
    <div className="dashboard-grid">
      <Pomodoro />      
    </div>
  );

  const Page2 = () => (
    <div className="dashboard-grid">

      <ToDo />
    </div>
  );

  return (
    <Router>
      <div className="navbar bg-base-100 shadow-sm ">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">
      <img src="/assets/skynote.png" className="max-w-[180px] max-h-[70px] w-auto h-auto object-contain"></img>
    </a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 text-2xl">

      <li>
        <details>
          <summary >Utility</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li>
                <Link to="/">
                  Pomodoro
                </Link>
            </li>
            <li>
                <Link to="/page2" >
                  To-do list
                </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>          <button onClick={toggleTheme} className="change-btn ">
            {theme === "light" ? "🌞" : "🌛"} Change theme
          </button>
          </li>
      <li> <button onClick={changeWallpaper} className="change-btn ">Change wallpaper</button></li>
      <li>
        
      </li>

    </ul>
  </div>
</div>

      <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="app-container">


      <div className="drawer drawer-end">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
        {/* Page content here */}


        <label htmlFor="my-drawer-5" className="drawer-button btn btn-lg btn-primary fixed bottom-4 left-4">Open drawer</label>
        </div>
        <div className="drawer-side">
        <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4 flex-col flex-1 ">
          {/* Sidebar content here */}
          <Dailyquote />
          <Clock />
          <Weather />
          <div>
                                            ⠀⠀⠀⠀⠀⠀⢀⣰⣀⠀⠀⠀⠀⠀⠀⠀⠀
            ⢀⣀⠀⠀⠀⢀⣄⠘⠀⠀⣶⡿⣷⣦⣾⣿⣧
            ⢺⣾⣶⣦⣰⡟⣿⡇⠀⠀⠻⣧⠀⠛⠀⡘⠏
            ⠈⢿⡆⠉⠛⠁⡷⠁⠀⠀⠀⠉⠳⣦⣮⠁⠀
            ⠀⠀⠛⢷⣄⣼⠃⠀⠀⠀⠀⠀⠀⠉⠀⠠⡧
            ⠀⠀⠀⠀⠉⠋⠀⠀⠀⠠⡥⠄⠀⠀  -AVIDHA HALDAR
          </div>
        </ul>
        </div>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="drawer-button btn btn-lg btn-primary fixed bottom-4 right-4" onClick={()=>document.getElementById('my_modal_5').showModal()}>⚙</button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {<Settings/>}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              
                  <button className="px-5 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold border border-pink-300 hover:bg-pink-200 hover:text-pink-800 transition-all duration-300" onClick={()=>{
    document.getElementById('my_modal_5').close(); navigate('/');} }>Close</button>
              
            </form>
          </div>
        </div>
      </dialog>

        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>  

      </div>
      </div>
    </Router>
  );
}

export default App;
