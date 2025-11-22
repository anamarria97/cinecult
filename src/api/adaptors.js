export function getMoviesList(apiResponse) {
  if (!apiResponse || !apiResponse.results) {
    return [];
  }

  return apiResponse.results.map((movie) => ({
    id: movie.id,
    title: movie.title || movie.original_title || "Untitled",
    description: movie.overview || movie.tagline || "",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
      : null,
    rating: movie.vote_average,
    releaseDate: movie.release_date,
  }));
}

export function getMovieDetails(data) {
  if (!data || !data.id) return {};

  return {
    id: data.id,
    title: data.title || data.original_title || "Untitled",
    description: data.overview || data.tagline || "",
    poster: data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : null,
    backdrop: data.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
      : null,
    genres: data.genres ? data.genres.map((g) => g.name) : [],
    rating: data.vote_average,
    releaseDate: data.release_date,
    runtime: data.runtime,
  };
}

export function getMovieTrailer(apiResponse) {
  if (!apiResponse || !apiResponse.results) return null;

  const trailer = apiResponse.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
