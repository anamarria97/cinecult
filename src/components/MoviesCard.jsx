import React from "react";
import { Link } from "react-router-dom";
import "../components/MoviesCard.css";

export default function MoviesCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        {movie.poster && (
          <img
            className="movie-card-poster"
            src={movie.poster}
            alt={movie.title}
          />
        )}
      </Link>

      <div className="movie-card-body">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-rating">⭐ {movie.rating}</p>

        {movie.description && (
          <p className="movie-card-description">{movie.description}</p>
        )}
      </div>
    </div>
  );
}
