const API_KEY = "e2225db9a1b13772ed307ab3bf5d1fb2";
const API_BASE_URL = "https://api.themoviedb.org/3";

const endpoints = {
  trendingWeek: () =>
    `${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,

  moviesByCategory: (categoryId, page = 1) =>
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${categoryId}&page=${page}`,

  movieDetails: (movieId) =>
    `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,

  movieVideos: (movieId) =>
    `${API_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,

  searchMovies: (query, page = 1, yearRange = null) => {
    if (query?.trim()) {
      let url = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}&query=${encodeURIComponent(
        query
      )}`;

      if (yearRange) {
        url += `&primary_release_date.gte=${yearRange.min}-01-01`;
        url += `&primary_release_date.lte=${yearRange.max}-12-31`;
      }

      return url;
    }

    let url = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`;

    if (yearRange) {
      url += `&primary_release_date.gte=${yearRange.min}-01-01`;
      url += `&primary_release_date.lte=${yearRange.max}-12-31`;
    }

    return url;
  },
};

export default endpoints;
