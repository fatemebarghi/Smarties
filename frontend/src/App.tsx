import React from "react";
import SongList from "./components/songList/SongList";
import Player from "./components/player/Player";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">
            <b>Smarties :)</b>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <SongList />
      </Container>
      <Player />
    </div>
  );
}

export default App;
