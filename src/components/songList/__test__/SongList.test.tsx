import { render, screen } from "@testing-library/react";
import SongList from "../SongList";

const mockResponse = {
  isLoading: false,
  response: [
    {
      id: "1234",
      name: "title",
      artist_name: "artist",
      likes: 3,
      cover_image: "coverImg",
      music_file: "test",
    },
  ],
  error: null,
};

jest.mock("../../../utils/useFetch", () => {
  return {
    useFetch: () => {
      return [mockResponse, jest.fn()] as const;
    },
  };
});

describe("songlist component unit tests", () => {
  beforeEach(() => render(<SongList />));

  it("should render the songlist component", () => {
    const songListWrapper = screen.getByTestId("song-list");
    expect(songListWrapper).toBeInTheDocument();
  });

  it("should render one song card", () => {
    const songListWrapper = screen.getByTestId("song-list");
    expect(songListWrapper.childNodes.length).toBe(1);
  });

  it("should show the loading if the data is not received yet", () => {
    mockResponse.isLoading = true;
    const { rerender } = render(<SongList />);
    rerender(<SongList />);
    const spinner = screen.getByTestId("loading");
    expect(spinner).toBeVisible();
  });
});
