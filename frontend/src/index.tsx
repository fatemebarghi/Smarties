import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PlaySongProvider } from "./store/PlaySongContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PlaySongProvider>
      <App />
    </PlaySongProvider>
  </React.StrictMode>
);
