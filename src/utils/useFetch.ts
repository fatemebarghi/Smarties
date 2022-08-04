import {
  SetStateAction,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { ResultType } from "../types/types";

interface ParamsType<T> {
  url: string;
  data?: T;
  method: "GET" | "POST";
  params?: { apikey: string };
  handleData?: string;
}

type ActionType<T> =
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_PENDING"; payload: undefined }
  | { type: "FETCH_FAILURE"; payload: Error };

export function useFetch<T1, T2>(
  params?: ParamsType<T2> | undefined
): [ResultType<T1>, Dispatch<SetStateAction<ParamsType<T2> | undefined>>] {
  const initialResponse: ResultType<T1> = {
    isLoading: false,
    response: undefined,
    error: undefined,
  };

  const fetchReducer = (
    state: ResultType<T1>,
    action: ActionType<T1>
  ): ResultType<T1> => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          isLoading: false,
          response: action.payload,
          error: undefined,
        };

      case "FETCH_FAILURE":
        return {
          isLoading: false,
          response: undefined,
          error: action.payload,
        };

      case "FETCH_PENDING":
        return {
          isLoading: true,
          response: undefined,
          error: undefined,
        };
    }
  };

  const [result, dispatch] = useReducer(fetchReducer, initialResponse);
  const [apiParams, setApiParams] = useState<ParamsType<T2> | undefined>(
    params
  );

  axios.defaults.headers.common["Content-Type"] = "application/json";
  useEffect(() => {
    if (apiParams) {
      dispatch({ type: "FETCH_PENDING", payload: undefined });
      axios
        .request({
          headers: {
            "Content-Type": "application/json",
          },
          ...apiParams,
        })
        .then((res) => dispatch({ type: "FETCH_SUCCESS", payload: res.data }))
        .catch((err) => dispatch({ type: "FETCH_FAILURE", payload: err }));
    }
  }, [apiParams]);

  return [result, setApiParams];
}
