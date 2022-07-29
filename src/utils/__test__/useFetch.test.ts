import { renderHook, act } from "@testing-library/react";
import { useFetch } from "../useFetch";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockData = {
  name: "smarties",
  goal: "learning",
};

const defaultRes = {
  isLoading: false,
  response: undefined,
  error: undefined,
};

const pendingRes = {
  ...defaultRes,
  isLoading: true,
};

const successRes = {
  ...defaultRes,
  response: { ...mockData },
};

const failedRes = {
    ...defaultRes, error: "Error message"
}

describe("useFetch hook unit tests", () => {
  it("should render useFetch", async () => {
    const { result } = renderHook(() => useFetch());
    expect(result.current[0]).toStrictEqual(defaultRes);
    expect(typeof result.current[1]).toBe("function");
  });

  it("should makes loading true before api call", () => {
    const { result } = renderHook(() => useFetch());
    mockedAxios.request.mockResolvedValue({
      data: {},
    });
    act(() => {
      result.current[1]({
        method: "GET",
        url: "test",
      });
    });
    expect(result.current[0]).toStrictEqual(pendingRes);
  });

  it("should retrun the correct data after get api call", async () => {
    const { result } = renderHook(() => useFetch());
    mockedAxios.request.mockResolvedValue({
      data: { ...mockData },
    });
    await act(async () => {
      result.current[1]({
        method: "GET",
        url: "test",
      });
    });
    expect(result.current[0]).toStrictEqual(successRes);
  });

  it("should return an error after unsuccessful get api call", async () => {
    const { result } = renderHook(() => useFetch());
    mockedAxios.request.mockRejectedValue("Error message");
    await act(async () => {
      result.current[1]({
        method: "GET",
        url: "test",
      });
    });
      expect(result.current[0]).toStrictEqual(failedRes)
  });
});
