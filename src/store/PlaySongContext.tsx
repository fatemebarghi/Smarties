import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction } from "react";

export interface ContextProps {
  playingSong: string,
  setPlayingSong: Dispatch<SetStateAction<string>>
}

export const PlaySongContext = createContext({} as ContextProps);

export const PlaySongProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [playingSong, setPlayingSong] = useState<string>();

  return (
    <PlaySongContext.Provider
      value={{playingSong, setPlayingSong} as ContextProps}
    >
      {children}
    </PlaySongContext.Provider>
  );
};
