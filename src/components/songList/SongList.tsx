import React, { useEffect } from "react";
import useFetch from "../../utils/useFetch";

const SongList = () => {
  const [songs, setSongParams] = useFetch();

  useEffect(() => {
    setSongParams({
      url: "https://api-stg.jam-community.com/song/trending",
      method: "GET",
    });
  }, []);

  console.log("songs", songs);
  return <div>SongList</div>;
};

export default SongList;
