import React from 'react';
import logo from './logo.svg';
import './App.css';
import SongList from './components/songList/SongList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <SongList/>
    </div>
  );
}

export default App;
