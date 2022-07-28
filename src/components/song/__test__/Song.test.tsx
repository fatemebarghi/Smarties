import { render, screen, fireEvent } from "@testing-library/react";
import { SongInfo } from "../../../types/types";
import Song from "../Song";
import { PlaySongContext } from "../../../store/PlaySongContext";
import React from "react";

const mockSonginfo: SongInfo = {
  id: "1234",
  name: "title",
  music_file: "test",
  artist_name: "artist",
  likes: 3,
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

// const MockSong: React.FunctionComponent = () => {
//   return (
//     <PlaySongContext.Provider
//       value={{ playingSong: mockSonginfo, onSongChange: jest.fn() }}
//     >
//       <Song key={mockSonginfo.id} info={mockSonginfo} />
//     </PlaySongContext.Provider>
//   );
// };

jest.mock("../../../utils/useFetch", () => {
  return {
    useFetch: () => {
      return [mockResponse, jest.fn()] as const;
    },
  };
});

// jest.mock("../../../store/PlaySongContext",({children}) => {
//   return (
//     <PlaySongContext.Provider
//       value={{ playingSong: mockSonginfo, onSongChange: jest.fn() }}
//     >
//       {/* <Song key={mockSonginfo.id} info={mockSonginfo} /> */}
//       {children}
//     </PlaySongContext.Provider>
//   );
// })

// const handlePlay =  jest.fn((res) => console.log(res))

describe("song component unit tests", () => {
  it("should render the component correctly", () => {
    render(<Song key={mockSonginfo.id} info={mockSonginfo} />);
    let song = screen.getByTestId("song");
    expect(song).toBeVisible();
    expect(song).toBeInTheDocument();
  });

  it("should render the image by correct source", () => {
    render(<Song key={mockSonginfo.id} info={mockSonginfo} />);
    let image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "coverImg");
  });

  it("should render the name correctly", () => {
    render(<Song key={mockSonginfo.id} info={mockSonginfo} />);
    let name = screen.getByText("title");
    expect(name).toHaveClass("card-title");
  });

  it("should render the artist name correctly", () => {
    render(<Song key={mockSonginfo.id} info={mockSonginfo} />);
    let artistName = screen.getByText("artist");
    expect(artistName).toHaveClass("card-subtitle");
  });

  it("should render the off like icon", () => {
    render(<Song key={mockSonginfo.id} info={mockSonginfo} />);
    let icon = screen.getByText("heart.svg");
    expect(icon).toBeVisible();
  });

  it("should render the off like icon if api status is not 200", async () => {
    const { rerender } = render(
      <Song key={mockSonginfo.id} info={mockSonginfo} />
    );
    let iconWrapper = screen.getByTestId("like-icon");
    fireEvent.click(iconWrapper);
    mockResponse.response = { ...errorResponse };
    rerender(<Song key={mockSonginfo.id} info={mockSonginfo} />);
    expect(screen.getByText("heart.svg")).toBeInTheDocument();
  });

  it("should render the on like icon after intract action", async () => {
    const { rerender } = render(
      <Song key={mockSonginfo.id} info={mockSonginfo} />
    );
    let iconWrapper = screen.getByTestId("like-icon");
    fireEvent.click(iconWrapper);
    mockResponse.response = { ...successResponse };
    rerender(<Song key={mockSonginfo.id} info={mockSonginfo} />);
    expect(screen.getByText("fill_heart.svg")).toBeInTheDocument();
  });

  it("should change the song when clicked",() => {
    const obj = { playingSong: mockSonginfo, onSongChange: jest.fn() }
    render(
      <PlaySongContext.Provider
        value={obj}
      >
        <Song key={mockSonginfo.id} info={mockSonginfo} />
      </PlaySongContext.Provider>
    );
    const songCard = screen.getByTestId("song");
    fireEvent.click(songCard);
    expect(obj.onSongChange).toBeCalledWith(mockSonginfo);
  });
});
