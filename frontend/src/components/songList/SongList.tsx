import React, { FunctionComponent, Fragment, useEffect } from "react";
import { useFetch } from "../../utils/useFetch";
import Song from "../song/Song";
import Spinner from "react-bootstrap/Spinner";
import { SongInfo } from "../../types/types";

const SongList: FunctionComponent = () => {
  const [songs, setSongParams] = useFetch<SongInfo[], undefined>();

  const handleGetSongs = () => {
    setSongParams({
      url: "http://localhost:3001/songs",
      method: "GET",
    });
  };

  useEffect(() => {
    handleGetSongs();
  }, []);

  return (
    <div data-testid="song-list">
      {songs.isLoading ? (
        <Spinner data-testid="loading" animation="border" size="sm" />
      ) : (
        songs.response && (
          <Fragment>
            <h3>There are {songs.response?.length} musics in the list!</h3>
            {(songs.response as unknown as SongInfo[]).map((song: SongInfo) => (
              <Song key={song.song_id} info={song} handleGetSongs={handleGetSongs} />
            ))}
          </Fragment>
        )
      )}
    </div>
  );
};

export default SongList;
