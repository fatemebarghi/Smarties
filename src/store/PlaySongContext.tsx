import React, {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { SongInfo } from "../types/types";

export interface ContextProps {
  playingSong: SongInfo;
  setPlayingSong: Dispatch<SetStateAction<SongInfo>>;
}

export const PlaySongContext = createContext({} as ContextProps);

export const PlaySongProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [playingSong, setPlayingSong] = useState<SongInfo>();

  return (
    <PlaySongContext.Provider
      value={{ playingSong, setPlayingSong } as ContextProps}
    >
      {children}
    </PlaySongContext.Provider>
  );
};
