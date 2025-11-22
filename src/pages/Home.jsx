import React from "react";
import { useLocation, Link } from "react-router-dom";

import endpoints from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getMoviesList, getMovieTrailer } from "../api/adaptors";
import MoviesCard from "../components/MoviesCard";

import Layout from "../components/Layout";
import "../components/Layout.css";

export default function Home() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const query = params.get("query") || "";
  const year = params.get("year") || "all";

  const isSearching = query.trim() !== "" || year !== "all";

  function convertYearRange(yearValue) {
    switch (yearValue) {
      case "2020s":
        return { min: 2020, max: 2029 };
      case "2010s":
        return { min: 2010, max: 2019 };
      case "2000s":
        return { min: 2000, max: 2009 };
      case "older":
        return { min: 1900, max: 1999 };
      default:
        return null;
    }
  }

  const yearRange = convertYearRange(year);

  const searchUrl = isSearching
    ? endpoints.searchMovies(query, 1, yearRange)
    : null;

  const searchResults = useFetch(searchUrl, getMoviesList);
  const trending = useFetch(endpoints.trendingWeek(), getMoviesList);
  const comedy = useFetch(endpoints.moviesByCategory(35), getMoviesList);
  const thriller = useFetch(endpoints.moviesByCategory(53), getMoviesList);
  const horror = useFetch(endpoints.moviesByCategory(27), getMoviesList);
  const adventure = useFetch(endpoints.moviesByCategory(12), getMoviesList);

  const featured = trending ? trending[0] : null;

  const trailerUrl =
    featured && featured.id ? endpoints.movieVideos(featured.id) : null;

  const trailer = useFetch(trailerUrl, getMovieTrailer);

  if (!trending) return <p>Loading...</p>;

  if (isSearching) {
    return (
      <div className="page">
        <h1>Search Results</h1>

        {!searchResults && <p>Loading search...</p>}

        {searchResults && searchResults.length === 0 && <p>No movies found.</p>}

        {searchResults && searchResults.length > 0 && (
          <div className="movies-list">
            {searchResults.map((m) => (
              <MoviesCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="home-page">
      <Layout featured={featured}>
        <button
          className="play-btn"
          onClick={() => window.open(trailer, "_blank")}
          disabled={!trailer}
        >
          ▶ Play Trailer
        </button>
      </Layout>

      <section className="movie-rows">
        {comedy && (
          <div className="movie-row">
            <h2 className="category">Comedy</h2>
            <div className="row-scroll">
              {comedy.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="row-poster"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {thriller && (
          <div className="movie-row">
            <h2 className="category">Thriller</h2>
            <div className="row-scroll">
              {thriller.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="row-poster"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {horror && (
          <div className="movie-row">
            <h2 className="category">Horror</h2>
            <div className="row-scroll">
              {horror.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="row-poster"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {adventure && (
          <div className="movie-row">
            <h2 className="category">Adventure</h2>
            <div className="row-scroll">
              {adventure.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="row-poster"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
