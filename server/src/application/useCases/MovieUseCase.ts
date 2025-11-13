import { Movie } from '../../domain/entities/Movie';
import { IMovieService } from '../../domain/services/IMovieService';
import { IMovieUseCase } from '../interfaces/IMovieUseCase';

export class MovieUseCase implements IMovieUseCase {
    private _movieService: IMovieService;

    constructor(movieService: IMovieService) {
        this._movieService = movieService;
    }

    async searchMovies(query: string, page?: number): Promise<{ movies: Movie[]; totalResults: number }> {
        return await this._movieService.search(query, page);
    }
}
