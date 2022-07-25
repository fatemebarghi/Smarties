import React from "react";
import { render, screen } from "@testing-library/react";
import Player from "../Player";
import { PlaySongContext } from "../../../store/PlaySongContext";
import { SongInfo } from "../../../types/types";

interface Mockplayer {
  song: SongInfo | undefined;
}

const mockSongInfo: SongInfo = {
  id: "1234",
  name: "title",
  artist_name: "artist",
  likes: 3,
  cover_image: "coverImg",
  music_file: "test",
};

const MockPlayer: React.FunctionComponent<Mockplayer> = ({ song }) => {
  return (
    <PlaySongContext.Provider
      value={{ playingSong: song, onSongChange: jest.fn() }}
    >
      <Player />
    </PlaySongContext.Provider>
  );
};

describe("should not show the palyer", () => {
  it("should not show player if no song is playing", () => {
    const { container } = render(<MockPlayer song={undefined} />);
    expect(container.innerHTML).toBe("");
  });
});

describe("player component unit tests", () => {
  beforeEach(() => render(<MockPlayer song={mockSongInfo} />));

  it("should render the component correctly", () => {
    let player = screen.getByTestId("player");
    expect(player).toBeInTheDocument();
  });

  it("should render the image with correct source", () => {
    let image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "coverImg");
  });
});
