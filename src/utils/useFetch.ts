import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

type ParamsType = {
  headers?: {"Content-Type": string},
  url: string;
  data?: any;
  method: "GET" | "POST";
  params?: {apikey: string}
};

type ResultType = {
  isLoading: boolean;
  response: any;
  error: any;
};

type ActionType =
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_PENDING"; payload: any }
  | { type: "FETCH_FAILURE"; payload: any };

export function useFetch(params?: ParamsType | undefined) {
  const initialResponse: ResultType = {
    isLoading: true,
    response: null,
    error: null,
  };

  const fetchReducer = (state: typeof initialResponse, action: ActionType) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          isLoading: false,
          error: null,
          response: action.payload,
        };
      
      case "FETCH_PENDING":
        return {
          isLoading: true,
          error: null,
          response: null,
        };

      case "FETCH_FAILURE":
        return {
          isLoading: false,
          error: action.payload,
          response: null,
        };

      default:
        return state;
    }
  };

  const [result, dispatch] = useReducer(fetchReducer, initialResponse);
  const [apiParams, setApiParams] = useState<ParamsType | undefined>(params);

  useEffect(() => {
    // dispatch({ type: "FETCH_PENDING", payload: null });
    if (apiParams) {
      axios(apiParams)
      .then((res) => dispatch({ type: "FETCH_SUCCESS", payload: res }))
      .catch((err) => dispatch({ type: "FETCH_FAILURE", payload: err }));
    }
  }, [apiParams]);

  return [result, setApiParams] as const;
}
