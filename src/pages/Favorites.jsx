import React, { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";
import MoviesCardList from "../components/MoviesCardList";

export default function Favorites() {
  const { favorites } = useContext(MoviesContext);

  return (
    <div className="page">
      <h1>Your Favorites</h1>

      {favorites.length === 0 && <p>No favorite movies yet.</p>}

      <MoviesCardList movies={favorites} />
    </div>
  );
}
