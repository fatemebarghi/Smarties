import { FunctionComponent, useEffect } from "react";
import { useFetch } from "../../utils/useFetch";
import Song from "../song/Song";
import Spinner from "react-bootstrap/Spinner";
import { FixedSizeList as List } from "react-window";
import { SongInfo } from "../../types/types";

interface RowProps {
  index: number;
  style: any;
}

const SongList: FunctionComponent = () => {
  const [songs, setSongParams] = useFetch<SongInfo[], undefined>();

  useEffect(() => {
    setSongParams({
      url: "http://localhost:3001/songs",
      method: "GET",
    });
  },[setSongParams]);

  const Row = ({ index, style }: RowProps) => {
    const data = songs.response ? songs.response[index] : ({} as SongInfo);
    return (
      <div style={style}>
        <Song info={data} />
      </div>
    );
  };

  return (
    <div data-testid="song-list">
      {songs.isLoading ? (
        <Spinner data-testid="loading" animation="border" size="sm" />
      ) : (
        songs.response && songs.response.length > 0 && (
          <List
            height={
              (document.getElementById("root")?.offsetHeight as number) - 100
            }
            itemCount={songs.response.length}
            itemSize={120}
            width={
              (document.getElementsByClassName("container")[0]?.clientWidth as number)
            }
          >
            {Row}
          </List>
        )
      )}
    </div>
  );
};

export default SongList;
