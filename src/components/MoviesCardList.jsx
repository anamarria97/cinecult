import React from "react";
import MoviesCard from "../components/MoviesCard";

export default function MoviesCardList({ movies }) {
  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
