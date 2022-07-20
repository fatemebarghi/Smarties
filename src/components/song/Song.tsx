import React, { FunctionComponent } from "react";
import { SongInfo } from "../../types/types";

interface SongProps {
    key: string,
    info: SongInfo
}

const Song: FunctionComponent<SongProps> = ({info}) => {
  return <div>Song</div>;
};

export default Song;
