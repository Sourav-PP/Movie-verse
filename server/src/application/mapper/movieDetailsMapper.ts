import { MovieDetails, MovieSummary } from '../../domain/entities/Movie';

export function toMovieSummary(data: MovieDetails): MovieSummary {
    return {
        imdbID: data.imdbID,
        Title: data.Title,
        Year: data.Year,
        Poster: data.Poster,
    };
}