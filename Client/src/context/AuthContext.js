import React, { createContext, useEffect, useReducer } from "react";
const INITIAL_STATE = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  username: JSON.parse(localStorage.getItem("username")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        token: null,
        username: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
        username: action.payload.username,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        token: null,
        username: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        token: null,
        username: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
    localStorage.setItem("username", JSON.stringify(state.username));
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        username: state.username,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
