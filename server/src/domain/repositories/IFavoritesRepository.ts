import { Movie } from "../entities/Movie";

export interface IFavoriteRepository {
  getFavorites(): Promise<Movie[]>;
  addFavorites(movie: Movie): Promise<void>;
  remove(imdbId: string): Promise<void>;
  isFavorite(imdbID: string): Promise<boolean>;
}