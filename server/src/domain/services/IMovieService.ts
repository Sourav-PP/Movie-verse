import { Movie } from "../entities/Movie";

export interface IMovieService {
  search(query: string, page?: number): Promise<{ movies: Movie[], totalResults: number }>;
  getMovieById(imdbID: string): Promise<Movie | null>;
}