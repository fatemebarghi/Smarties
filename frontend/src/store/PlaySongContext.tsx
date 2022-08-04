import React, {
  createContext,
  useState,
  PropsWithChildren,
} from "react";
import { SongInfo, PlayerContextProps } from "../types/types";

export const PlaySongContext = createContext({} as PlayerContextProps);

export const PlaySongProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [playingSong, setPlayingSong] = useState<SongInfo>();

  return (
    <PlaySongContext.Provider
      value={{ playingSong, onSongChange: (newSong: SongInfo) => setPlayingSong(newSong) }}
    >
      {children}
    </PlaySongContext.Provider>
  );
};
