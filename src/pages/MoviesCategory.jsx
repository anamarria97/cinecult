import React from "react";
import { useParams } from "react-router-dom";

import endpoints from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getMoviesList } from "../api/adaptors";
import MoviesCardList from "../components/MoviesCardList";

export default function MoviesCategory() {
  const { categoryId } = useParams();

  const movies = useFetch(
    endpoints.moviesByCategory(categoryId),
    getMoviesList
  );

  if (!movies) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1>Category</h1>
      <MoviesCardList movies={movies} />
    </div>
  );
}
