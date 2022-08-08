import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ResultType, SongInfo } from "./types/types";
import { PlaySongProvider } from "./store/PlaySongContext";
import App from "./App";

const mockSong = {
  song_id: "123",
  song_name: "test",
  artist_name: "artist",
  cover_image: "url",
  music_file: "file",
  is_liked: false,
};

const mockResponse: ResultType<SongInfo[]> = {
  isLoading: false,
  response: [
    {
      ...mockSong,
    },
  ],
};

jest.mock("./utils/useFetch", () => {
  return {
    useFetch: () => {
      return [mockResponse, jest.fn()] as const;
    },
  };
});

describe("integration test", () => {
  it("test", () => {
    render(
      <PlaySongProvider>
        <App />
      </PlaySongProvider>
    );
    expect(screen.queryByTestId("player")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("song"));
    const player = screen.getByTestId("player");
    expect(player).toBeInTheDocument();
  });
});
