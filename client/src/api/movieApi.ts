import { movieRoutes } from "../constants/apiRotues/movieRoutes";
import api from "./axiosInstance";

export const movieApi = {
  fetchMovies: (query: string) =>
    api.get(movieRoutes.fetchMovies, { params: { q: query } }),
  getMovieById: (imdbID: string) =>
    api.get(movieRoutes.getMovieByID(imdbID)),
  addFavorite: (imdbID: string) => api.post(movieRoutes.addFavorite(imdbID)),
  getFavorites: () => api.get(movieRoutes.getFavorites),
  removeFavorite: (imdbID: string) =>
    api.delete(movieRoutes.deleteFavorite(imdbID)),
};
