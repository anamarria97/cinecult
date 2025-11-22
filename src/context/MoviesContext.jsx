import { createContext, useReducer } from "react";
import { moviesReducer, initialState } from "./moviesReducer";

export const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const addToFavorites = (movie) =>
    dispatch({ type: "ADD_FAVORITE", payload: movie });

  const removeFromFavorites = (id) =>
    dispatch({ type: "REMOVE_FAVORITE", payload: id });

  const toggleFavorite = (movie) =>
    dispatch({ type: "TOGGLE_FAVORITE", payload: movie });

  const clearFavorites = () => dispatch({ type: "CLEAR_FAVORITES" });

  return (
    <MoviesContext.Provider
      value={{
        favorites: state.favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
