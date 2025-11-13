import { Movie } from "../../domain/entities/Movie"

export interface IFavoritesUseCases {
  getFavorites(): Promise<Movie[]>
  addFavorite(movie: Movie): Promise<void>
  removeFavorite(imdbID: string): Promise<void>
  isFavorite(imdbID: string): Promise<boolean>
}