import { MovieSummary } from "../entities/Movie";

export interface IFavoriteRepository {
  getFavorites(): Promise<MovieSummary[]>;
  addFavorites(movie: MovieSummary): Promise<void>;
  remove(imdbId: string): Promise<void>;
  isFavorite(imdbID: string): Promise<boolean>;
}