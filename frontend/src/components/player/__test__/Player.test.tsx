import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Player from "../Player";
import { PlaySongContext } from "../../../store/PlaySongContext";
import { SongInfo } from "../../../types/types";

interface Mockplayer {
  song: SongInfo | undefined;
}

const mockSongInfo: SongInfo = {
  song_id: "1234",
  song_name: "title",
  artist_name: "artist",
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

window.HTMLMediaElement.prototype.play = jest.fn();
window.HTMLMediaElement.prototype.pause = jest.fn();

describe("should not show the palyer", () => {
  it("should not show player if no song is playing", () => {
    const { container } = render(<MockPlayer song={undefined} />);
    expect(container.innerHTML).toBe("");
  });
});

describe("player component unit tests", () => {
  it("should render the component correctly", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let player = screen.getByTestId("player");
    expect(player).toBeInTheDocument();
  });

  it("should render the image with correct source", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "coverImg");
  });

  it("should render the name correctly", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let name = screen.getByText("title");
    expect(name).toHaveClass("card-title");
  });

  it("should render the artist name correctly", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let artistName = screen.getByText("artist");
    expect(artistName).toHaveClass("card-subtitle");
  });

  it("should render the audio with the correct source", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let audio = screen.getByTestId("audio");
    expect(audio).toHaveAttribute("src", "test");
  });

  it("should render the pause icon when song is playing", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let pauseIcon = screen.getByText("pause.svg");
    expect(pauseIcon).toBeInTheDocument();
  });

  it("should render the play icon when the song is paused", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let pauseIcon = screen.getByText("pause.svg");
    fireEvent.click(pauseIcon);
    let playIcon = screen.getByText("play.svg");
    expect(playIcon).toBeVisible();
  });

  it("should render the pause icon when the play icon clicked", () => {
    render(<MockPlayer song={mockSongInfo} />);
    let pauseIcon = screen.getByText("pause.svg");
    fireEvent.click(pauseIcon);
    let playIcon = screen.getByText("play.svg");
    fireEvent.click(playIcon);
    let pauseIconNew = screen.getByText("pause.svg");
    expect(pauseIconNew).toBeInTheDocument();
  });
});
