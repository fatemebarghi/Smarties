import React, { createRef, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { PlaySongContext } from "../../store/PlaySongContext";
import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/icons/pause.svg";
import "./player.css";

const Player = () => {
  const { playingSong } = useContext(PlaySongContext);
  const songPlayer = createRef<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    setIsPlaying(true);
  }, [playingSong]);

  const handlePlay = () => {
    songPlayer.current?.play();
    setIsPlaying(!isPlaying);
  };

  const handlePause = () => {
    songPlayer.current?.pause();
    setIsPlaying(!isPlaying);
  };

  return playingSong !== undefined ? (
    <Card
      className="position-absolute bottom-0 w-100 border-top-2"
      data-testid="player"
    >
      <Card.Body className="d-flex p-0">
        <div>
          <img src={playingSong.cover_image} className="img-cover" alt="cover"/>
        </div>

        <div className="d-flex flex-row justify-content-between w-100 p-3 align-items-center">
          <div className="d-flex flex-column">
            <Card.Title>{playingSong.song_name}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              {playingSong.artist_name}
            </Card.Subtitle>
          </div>

          {isPlaying ? (
            <PauseIcon className="control-icon" onClick={handlePause} />
          ) : (
            <PlayIcon className="control-icon" onClick={handlePlay} />
          )}
          <audio
            autoPlay
            src={playingSong?.music_file}
            ref={songPlayer}
            data-testid="audio"
          />
        </div>
      </Card.Body>
    </Card>
  ) : null;
};

export default Player;
