import { HttpStatusCode } from 'axios';
import { MovieSummary, MovieDetails } from '../../domain/entities/Movie';
import { AppError } from '../../domain/errors/AppError';
import { IMovieService } from '../../domain/services/IMovieService';
import { messages } from '../../shared/constants/messages';
import { IMovieUseCase } from '../interfaces/IMovieUseCase';

export class MovieUseCase implements IMovieUseCase {
    private _movieService: IMovieService;

    constructor(movieService: IMovieService) {
        this._movieService = movieService;
    }

    async searchMovies(query: string, page?: number): Promise<{ movies: MovieSummary[]; totalResults: number }> {
        return await this._movieService.search(query, page);
    }

    async getMovieDetails(imdbID: string): Promise<MovieDetails> {
        if (!imdbID) {
            throw new AppError(messages.ERROR.MISSING_IMDB_ID, HttpStatusCode.BadRequest);
        }

        const movie = await this._movieService.getMovieById(imdbID);
        if (!movie) throw new AppError(messages.ERROR.MOVIE_NOT_FOUND, HttpStatusCode.NotFound);

        return movie;
    }
}
