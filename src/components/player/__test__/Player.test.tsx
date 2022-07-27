import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("should render the name correctly", () => {
    let name = screen.getByText("title");
    expect(name).toHaveClass("card-title");
  });

  it("should render the artist name correctly", () => {
    let artistName = screen.getByText("artist");
    expect(artistName).toHaveClass("card-subtitle");
  });

  it("should render the audio with the correct source", () => {
    let audio = screen.getByTestId("audio");
    expect(audio).toHaveAttribute("src", "test");
  });

  it("should render the pause icon when song is playing", () => {
    let pauseIcon = screen.getByText("pause.svg");
    expect(pauseIcon).toBeInTheDocument();
  });

  it("should render the play icon when the song is paused", () => {
    let pauseIcon = screen.getByText("pause.svg");
    fireEvent.click(pauseIcon);
    let playIcon = screen.getByText("play.svg");
    expect(playIcon).toBeVisible();
  });
});
