import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import endpoints from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getMovieDetails, getMovieTrailer } from "../api/adaptors";
import { MoviesContext } from "../context/MoviesContext";

export default function MoviesDetails() {
  const { movieId } = useParams();

  const movie = useFetch(endpoints.movieDetails(movieId), getMovieDetails);
  const trailer = useFetch(endpoints.movieVideos(movieId), getMovieTrailer);

  const { favorites, toggleFavorite } = useContext(MoviesContext);
  const isFav = favorites.some((m) => m.id === movie?.id);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="page movie-details">
      <h1 className="details-title">{movie.title}</h1>

      {movie.poster && (
        <img src={movie.poster} alt={movie.title} className="details-poster" />
      )}

      <p className="details-description">{movie.description}</p>
      <p className="details-rating">⭐ {movie.rating}</p>
      <p className="details-genres">Genres: {movie.genres.join(", ")}</p>

      <button
        className={`details-fav-btn ${isFav ? "fav-active" : ""}`}
        onClick={() => toggleFavorite(movie)}
      >
        {isFav ? "Remove Favorite" : "Add Favorite"}
      </button>

      <button
        className="details-play-btn"
        onClick={() => window.open(trailer, "_blank")}
        disabled={!trailer}
      >
        ▶ Play Trailer
      </button>
    </div>
  );
}
