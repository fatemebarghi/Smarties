import React, { useContext } from "react";
import "./App.css";
import SongList from "./components/songList/SongList";
import "bootstrap/dist/css/bootstrap.min.css";
import Player from "./components/player/Player";

function App() {
  return (
    <div className="App">
      <SongList />
      <Player/>
    </div>
  );
}

export default App;
