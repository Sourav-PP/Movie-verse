import { MovieSummary } from "../../domain/entities/Movie"

export interface IFavoritesUseCases {
  getFavorites(): Promise<MovieSummary[]>
  addFavorite(imdbID: string): Promise<void>
  removeFavorite(imdbID: string): Promise<void>
  isFavorite(imdbID: string): Promise<boolean>
}