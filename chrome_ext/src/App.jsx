import { useEffect, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Themecontext } from "./components/Themeprovider";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import ToDo from "./components/ToDo";
import Dailyquote from "./components/Dailyquote";
import Pomodoro from "./components/Pomodoro";
import Settings from "./components/Settings";
import Home from "./components/Home";

const defaultLayout = ["clock", "weather", "todo", "quotes", "pomodoro"];

function App() {
  const [layout, setLayout] = useState(defaultLayout);
  const { theme, toggleTheme } = useContext(Themecontext);
  let UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

  useEffect(() => {
    document.body.style.backgroundImage = "url('/assets/defaultbg.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "bottom";
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

  return (
    <Router>
      {/*NAVBAR*/}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="!text-lg !py-2 menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                {" "}
                <button onClick={toggleTheme} className="change-btn ">
                  {theme === "light" ? "🌞" : "🌛"} Change theme
                </button>
              </li>
              <li>
                <a>Utility</a>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/pomodoro"
                      className="!text-xl !font-semibold !py-2"
                    >
                      Pomodoro
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/todo"
                      className="!text-xl !font-semibold !py-2"
                    >
                      To-do list
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <button onClick={changeWallpaper} className="change-btn ">
                  Change wallpaper
                </button>
              </li>
            </ul>
          </div>
          <img
            src="/assets/skynote.png" alt="SkyNote"
            className="max-w-[180px] max-h-[70px] w-auto h-auto object-contain"
          ></img>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {" "}
              <button onClick={toggleTheme} className="change-btn ">
                {theme === "light" ? "🌞" : "🌛"} Change theme
              </button>
            </li>
            <li>
              <details>
                <summary className="!text-xl !font-semibold !py-2">
                  Utility
                </summary>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/pomodoro"
                      className="!text-xl !font-semibold !py-2"
                    >
                      Pomodoro
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/todo"
                      className="!text-xl !font-semibold !py-2"
                    >
                      To-do list
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              {" "}
              <button onClick={changeWallpaper} className="change-btn ">
                Change wallpaper
              </button>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <button className="hover:scale-180 hover:transition-transform duration-200 text-xl ">
            💗
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="app-container">
          <div className="drawer drawer-end">
            <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <Routes>
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/todo" element={<ToDo />} />
                <Route path="/" element={<Home />} />
              </Routes>
              <label
                htmlFor="my-drawer-5"
                className="drawer-button btn btn-lg btn-primary fixed bottom-4 left-4"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-5"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full w-80 p-4 flex-col flex-1 ">
                {/* Sidebar content here */}
                <Dailyquote />
                <Clock />
                <Weather />
                <div>
                  ⠀⠀⠀⠀⠀⠀⢀⣰⣀⠀⠀⠀⠀⠀⠀⠀⠀ ⢀⣀⠀⠀⠀⢀⣄⠘⠀⠀⣶⡿⣷⣦⣾⣿⣧ ⢺⣾⣶⣦⣰⡟⣿⡇⠀⠀⠻⣧⠀⠛⠀⡘⠏
                  ⠈⢿⡆⠉⠛⠁⡷⠁⠀⠀⠀⠉⠳⣦⣮⠁⠀ ⠀⠀⠛⢷⣄⣼⠃⠀⠀⠀⠀⠀⠀⠉⠀⠠⡧ ⠀⠀⠀⠀⠉⠋⠀⠀⠀⠠⡥⠄⠀⠀ -AVIDHA
                  HALDAR
                </div>
              </ul>
            </div>
          </div>

          {/* SETTINGS-MODAL */}

          <NavLink
            to="/timings"
            className="drawer-button btn btn-lg btn-primary fixed bottom-4 right-4"
            onClick={() => {
              document.getElementById("my_modal_5").showModal();
            }}
          >
            ⚙
          </NavLink>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div
              className={`modal-box transition-all duration-300 ${
                theme === "light"
                  ? "bg-white text-gray-800 shadow-lg"
                  : "bg-gray-900 text-gray-100 shadow-xl border border-gray-700"
              }`}
            >
              <Settings />
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <NavLink to="/">
                    <button
                      className="px-5 py-2 rounded-full bg-[#CB94F7] text-blue-700
            font-semibold border border-pink-300 hover:bg-[#A76EEE] hover:text-blue-800 transition-all duration-300"
                      onClick={() => {
                        document.getElementById("my_modal_5").close();
                      }}
                    >
                      Close
                    </button>
                  </NavLink>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/*ROUTES*/}
      {/*<Routes>
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/" element={<Home />} />
          </Routes>*/}
      {/*SIDE-DRAWER*/}
    </Router>
  );
}

export default App;
