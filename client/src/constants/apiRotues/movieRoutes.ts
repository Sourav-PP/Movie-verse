export const movieRoutes = {
  fetchMovies: '/api/movies/search',
  getMovieByID: (imdbID: string) => `/api/movies/details/${imdbID}`,
  addFavorite: (imdbID: string) => `/api/favorites/${imdbID}`,
  getFavorites: '/api/favorites',
  deleteFavorite: (imdbID: string) => `/api/favorites/${imdbID}`
} as const;