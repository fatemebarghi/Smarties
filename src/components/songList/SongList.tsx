import React, { FunctionComponent, useEffect } from "react";
import { useFetch } from "../../utils/useFetch";
import Song from "../song/Song";
import Spinner from "react-bootstrap/Spinner";
import { SongInfo, ResultType } from "../../types/types";

const SongList: FunctionComponent = () => {
  const [songs, setSongParams] = useFetch<ResultType<SongInfo[]>, undefined>();

  useEffect(() => {
    setSongParams({
      url: "https://v8ork.mocklab.io/songs",
      method: "GET",
    });
  }, []);

  return (
    <div>
      {songs.isLoading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        songs.response &&
        (songs.response as unknown as SongInfo[]).map((song: SongInfo) => (
          <Song key={song.id} info={song} />
        ))
      )}
    </div>
  );
};

export default SongList;
