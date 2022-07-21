import { render, screen, fireEvent } from "@testing-library/react";
import { SongInfo } from "../../../types/types";
import Song from "../Song";

const mockSonginfo: SongInfo = {
  id: "1234",
  name: "title",
  musicFile: "test",
  artistName: "artist",
  likes: 3,
  coverImg: "coverImg",
};

const mockHandleClick = jest.fn();

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

//   it("should render the off like icon", () => {
//     render(<Song key={mockSonginfo.id} info={mockSonginfo} />);
//     let icon = screen.getByTestId("like-icon");
//   });

  //   it("should call a function when clicked", () => {
  //     render(<Song key={mockSonginfo.id} info={mockSonginfo} />);
  //     let song = screen.getByTestId("song");
  //     fireEvent.click(song);
  //     expect(mockHandleClick).toBeCalled();
  //   });
});
