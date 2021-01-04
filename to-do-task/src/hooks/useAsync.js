import React from "react";
import axios from "axios";

const actionTypes = {
  ON_LOADING: "ON_LOADING",
  ON_SUCCESS: "ON_SUCCESS",
  ON_ERROR: "ON_ERROR",
  ON_CHANGE_URL: "ON_CHANGE_URL",
};

function asyncReducer(prevState, action) {
  switch (action.type) {
    case actionTypes.ON_LOADING:
      return {
        ...prevState,
        status: "loading",
      };
    case actionTypes.ON_SUCCESS:
      return {
        ...prevState,
        status: "success",
        data: action.payload.data,
      };
    case actionTypes.ON_ERROR:
      return {
        ...prevState,
        status: "error",
        error: action.payload.error,
      };
    case actionTypes.ON_CHANGE_URL:
      return {
        ...prevState,
        url: action.payload.url,
      };
    default:
      throw new Error("action not defined");
  }
}

export const useBetterAsync = (initialState) => {
  const [{ url, ...state }, dispatch] = React.useReducer(asyncReducer, {
    data: null,
    error: null,
    status: "idle",
    url: "",
    ...initialState,
  });
  const run = (asyncCallback) => {
    dispatch({ type: actionTypes.ON_LOADING });
    asyncCallback().then(
      (data) => {
        dispatch({
          type: actionTypes.ON_SUCCESS,
          payload: { data: data },
        });
      },
      (error) => {
        dispatch({ type: actionTypes.ON_ERROR, payload: { error } });
      }
    );
  };

  return { run, ...state };
};

export const useAsync = (initialUrl, initialData) => {
  const [url, setUrl] = React.useState(initialUrl);
  const [state, dispatch] = React.useReducer(asyncReducer, {
    data: initialData,
    error: null,
    status: "idle",
    // url: initialUrl
  });

  React.useEffect(() => {
    dispatch({ type: actionTypes.ON_LOADING });
    axios(url).then(
      (data) => {
        dispatch({
          type: actionTypes.ON_SUCCESS,
          payload: { data: data.data },
        });
      },
      (error) => {
        dispatch({ type: actionTypes.ON_ERROR, payload: { error } });
      }
    );
  }, [url]);

  return [state, setUrl];
};
