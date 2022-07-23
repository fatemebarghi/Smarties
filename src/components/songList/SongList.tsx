import React, { FunctionComponent, useEffect, useState } from "react";
import {useFetch} from "../../utils/useFetch";
import Song from "../song/Song";
import Spinner from "react-bootstrap/Spinner";
import { SongInfo } from "../../types/types";

const SongList: FunctionComponent = () => {
  const [songs, setSongParams] = useFetch();
  const [songList, setSongList] = useState<Array<SongInfo>>([]);

  useEffect(() => {
    setSongParams({
      url: "https://v8ork.mocklab.io/songs",
      method: "GET",
    });
  }, []);

  useEffect(() => {
    if (songs.response !== null) {
      let listCopy: SongInfo[] = [];
      songs.response.data.map((item: any) =>
        listCopy.push({
          id: item.id,
          name: item.name,
          artistName: item.artist_name,
          likes: item.likes,
          coverImg: item.cover_image_path,
          musicFile: item.music_file_path,
        })
      );
      setSongList(listCopy);
    }
  }, [songs.response]);

  return (
    <div>
      {songs.isLoading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        songs.response &&
        songList.map((song) => <Song key={song.id} info={song} />)
      )}
    </div>
  );
};

export default SongList;
