import React, { useContext } from "react";
import "./App.css";
import SongList from "./components/songList/SongList";
import { PlaySongContext } from "./store/PlaySongContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { playingSong } = useContext(PlaySongContext);
  return (
    <div className="App">
      <SongList />
      {playingSong && (
        <div>
          <audio controls autoPlay src={playingSong} />
        </div>
      )}
    </div>
  );
}

export default App;
