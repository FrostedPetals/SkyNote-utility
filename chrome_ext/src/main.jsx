import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Themeprovider } from "./components/Themeprovider.jsx";
import PomodoroContext from "./components/PomodoroContext.jsx";
import { SoundProvider } from "./components/SoundContext.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Themeprovider>
      <SoundProvider>
        <PomodoroContext>
          <App />
        </PomodoroContext>
      </SoundProvider>
    </Themeprovider>
  </StrictMode>
);
