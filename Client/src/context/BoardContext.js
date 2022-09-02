import React, { createContext, useEffect, useReducer } from "react";
const INITIAL_STATE = {
  lists: [],
};

export const BoardContext = createContext(INITIAL_STATE);

const boardReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTS":
      return {
        ...state,
        lists: action.payload,
      };
    default:
      return state;
  }
};

export const BoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, INITIAL_STATE);

  return (
    <BoardContext.Provider
      value={{
        lists: state.lists,
        dispatch,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
