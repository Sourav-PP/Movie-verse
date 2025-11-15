import { MovieSummary, MovieDetails } from "../../domain/entities/Movie";

export interface IMovieUseCase {
  searchMovies(query: string, page?: number): Promise<{movies: MovieSummary[], totalResults: number }>
  getMovieDetails(imdbID: string): Promise<MovieDetails>;
}