import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFetch } from "../../utils/useFetch";
import { PlaySongContext } from "../../store/PlaySongContext";
import { Card } from "react-bootstrap";
import { SongInfo } from "../../types/types";
import { ReactComponent as LikeIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as FillLikeIcon } from "../../assets/icons/fill_heart.svg";
import { LikeRes } from "../../types/types";
import "./song.css";

interface SongProps {
  key?: string;
  info: SongInfo;
}

interface Interaction {
  id: string;
  value: boolean;
}

const Song: FunctionComponent<SongProps> = ({ info }) => {
  const [intract, setIntractParams] = useFetch<LikeRes, Interaction>();
  const { onSongChange } = useContext(PlaySongContext);
  const [isLiked, setIsLiked] = useState<boolean>(info?.is_liked || false);

  useEffect(() => {
    intract.response && setIsLiked(intract.response.value);
  }, [intract.response]);

  const handleLike = (e: React.MouseEvent, id: string): void => {
    e.stopPropagation();

    const data = {
      id: id,
      value: !isLiked,
    };

    setIntractParams({
      method: "POST",
      data: data,
      url: "http://localhost:3001/intraction",
    });
  };

  const handlePlay = (info: SongInfo) => {
    onSongChange(info);
  };

  return (
    info && (
      <Card className="m-3" onClick={() => handlePlay(info)} data-testid="song">
        <Card.Body className="d-flex p-0">
          <div>
            <img src={info.cover_image} className="img-cover" alt="cover" />
          </div>

          <div className="d-flex flex-row justify-content-between w-100 p-3 align-items-center">
            <div className="d-flex flex-column">
              <Card.Title>{info.song_name}</Card.Title>

              <Card.Subtitle className="mb-2 text-muted">
                {info.artist_name}
              </Card.Subtitle>
            </div>

            <div
              className="like-icon"
              onClick={(e) => handleLike(e, info.song_id)}
              data-testid="like-icon"
            >
              {!isLiked ? (
                <LikeIcon data-testid="like-icon-off" />
              ) : (
                <FillLikeIcon data-testid="like-icon-on" />
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  );
};

export default Song;
