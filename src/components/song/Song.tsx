import React, { FunctionComponent, useContext } from "react";
import useFetch from "../../utils/useFetch";
import { SongInfo } from "../../types/types";
import { PlaySongContext } from "../../store/PlaySongContext";
import { Card } from "react-bootstrap";
import { ReactComponent as LikeIcon } from "../../assets/icons/heart.svg";
import "./song.css";

interface SongProps {
  key: string;
  info: SongInfo;
}

const Song: FunctionComponent<SongProps> = ({ info }) => {
  const [intract, setIntractParams] = useFetch();
  const { setPlayingSong } = useContext(PlaySongContext);

  const handleLike = (e: any, id: string): void => {
    e.stopPropagation();
    setIntractParams({
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      data: { id: id },
      url: "https://api-stg.jam-community.com/interact/like",
      params: { apikey: "___agAFTxkmMIWsmN9zOpM_6l2SkZPPy21LGRlxhYD8" },
    });
  };

  const handlePlay = (id: string) => {
    setPlayingSong(id);
  };

  return (
    <Card className="m-3" onClick={() => handlePlay(info.musicFile)}>
      <Card.Body className="d-flex p-0">
        <div>
          <img src={info.coverImg} className="img-cover" />
        </div>

        <div className="d-flex flex-row justify-content-between w-100 p-3 align-items-center">
          <div className="d-flex flex-column">
            <Card.Title>{info.name}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              {info.artistName}
            </Card.Subtitle>
          </div>

          <div className="like-icon" onClick={(e) => handleLike(e, info.id)}>
            <LikeIcon />
            <br />
            {info.likes}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Song;
