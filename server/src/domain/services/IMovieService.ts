import { MovieDetails, MovieSummary } from "../entities/Movie";

export interface IMovieService {
  search(query: string, page?: number): Promise<{ movies: MovieSummary[], totalResults: number }>;
  getMovieById(imdbID: string): Promise<MovieDetails | null>;
}