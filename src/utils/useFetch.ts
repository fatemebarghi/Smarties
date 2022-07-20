import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

type ParamsType = {
  url: string;
  data?: any;
  method: "GET" | "POST";
};

type ResultType = {
  isLoading: boolean;
  response: any;
  error: any;
};

type ActionType =
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_FAILURE"; payload: any };

export default function useFetch(params: ParamsType) {
  const initialResponse: ResultType = {
    isLoading: true,
    response: null,
    error: Error,
  };

  const fetchReducer = (state: typeof initialResponse, action: ActionType) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return {
          isLoading: false,
          error: null,
          response: action.payload,
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
  const [apiParams, setApiParams] = useState<ParamsType>(params);

  const fetchData = () => {
    axios(apiParams)
      .then((res) => dispatch({ type: "FETCH_SUCCESS", payload: res }))
      .catch((err) => dispatch({ type: "FETCH_FAILURE", payload: err }));
  };

  useEffect(() => {
    if (apiParams) {
      fetchData();
    }
  }, [apiParams]);

  return [result, setApiParams]
}
