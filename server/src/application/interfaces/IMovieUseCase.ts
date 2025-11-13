import { Movie } from "../../domain/entities/Movie";

export interface IMovieUseCase {
  searchMovies(query: string, page?: number): Promise<{movies: Movie[], totalResults: number }>
}