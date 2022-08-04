import { render, screen, fireEvent } from "@testing-library/react";
import { SongInfo } from "../../../types/types";
import Song from "../Song";
import { PlaySongContext } from "../../../store/PlaySongContext";

const mockSonginfo: SongInfo = {
  song_id: "1234",
  song_name: "title",
  music_file: "test",
  artist_name: "artist",
  cover_image: "coverImg",
};

const successResponse = {
  status: 200,
};

const errorResponse = {
  status: 400,
};

const mockResponse = {
  isLoading: false,
  response: {},
  error: null,
};

jest.mock("../../../utils/useFetch", () => {
  return {
    useFetch: () => {
      return [mockResponse, jest.fn()] as const;
    },
  };
});

describe("song component unit tests", () => {
  it("should render the component correctly", () => {
    render(<Song key={mockSonginfo.song_id} info={mockSonginfo} />);
    let song = screen.getByTestId("song");
    expect(song).toBeVisible();
    expect(song).toBeInTheDocument();
  });

  it("should render the image by correct source", () => {
    render(<Song key={mockSonginfo.song_id} info={mockSonginfo} />);
    let image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "coverImg");
  });

  it("should render the name correctly", () => {
    render(<Song key={mockSonginfo.song_id} info={mockSonginfo} />);
    let name = screen.getByText("title");
    expect(name).toHaveClass("card-title");
  });

  it("should render the artist name correctly", () => {
    render(<Song key={mockSonginfo.song_id} info={mockSonginfo} />);
    let artistName = screen.getByText("artist");
    expect(artistName).toHaveClass("card-subtitle");
  });

  it("should render the off like icon", () => {
    render(<Song key={mockSonginfo.song_id} info={mockSonginfo} />);
    let icon = screen.getByText("heart.svg");
    expect(icon).toBeVisible();
  });

  it("should render the off like icon if api status is not 200", async () => {
    const { rerender } = render(
      <Song key={mockSonginfo.song_id} info={mockSonginfo} />
    );
    let iconWrapper = screen.getByTestId("like-icon");
    fireEvent.click(iconWrapper);
    mockResponse.response = { ...errorResponse };
    rerender(<Song key={mockSonginfo.song_id} info={mockSonginfo} />);
    expect(screen.getByText("heart.svg")).toBeInTheDocument();
  });

  it("should render the on like icon after intract action", async () => {
    const { rerender } = render(
      <Song key={mockSonginfo.song_id} info={mockSonginfo} />
    );
    let iconWrapper = screen.getByTestId("like-icon");
    fireEvent.click(iconWrapper);
    mockResponse.response = { ...successResponse };
    rerender(<Song key={mockSonginfo.song_id} info={mockSonginfo} />);
    expect(screen.getByText("fill_heart.svg")).toBeInTheDocument();
  });

  it("should change the song when clicked",() => {
    const obj = { playingSong: mockSonginfo, onSongChange: jest.fn() }
    render(
      <PlaySongContext.Provider
        value={obj}
      >
        <Song key={mockSonginfo.song_id} info={mockSonginfo} />
      </PlaySongContext.Provider>
    );
    const songCard = screen.getByTestId("song");
    fireEvent.click(songCard);
    expect(obj.onSongChange).toBeCalledWith(mockSonginfo);
  });
});
