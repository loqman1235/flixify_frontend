import { createContext, useEffect, useReducer, useState } from "react";

export const ListContext = createContext();

// List Reducer Function

const listReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case "ADD_TO_LIST":
      return [...state, action.payload];
    case "REMOVE_FROM_LIST":
      return state.filter((item) => item._id !== action.payload._id);
  }
};

const ListContextProvider = ({ children }) => {
  const [myList, dispatch] = useReducer(listReducer, [], () => {
    const localData = localStorage.getItem("list");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(myList));
  }, [myList]);

  // Adding to my list
  const addToMyList = (item) => {
    dispatch({ type: "ADD_TO_LIST", payload: item });
  };

  const removeFromMyList = (item) => {
    dispatch({ type: "REMOVE_FROM_LIST", payload: item });
  };

  return (
    <ListContext.Provider value={{ myList, addToMyList, removeFromMyList }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
