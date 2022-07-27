export interface ResultType<T> {
  isLoading: boolean;
  response?: T | undefined;
  error?: Error;
}

export interface SongInfo {
  id: string;
  name: string;
  artist_name: string;
  likes: number;
  cover_image: string;
  music_file: string;
}

export interface LikeRes {
  status: 200;
}

export interface PlayerContextProps {
  playingSong: SongInfo | undefined;
  onSongChange: (song: SongInfo) => void;
}
