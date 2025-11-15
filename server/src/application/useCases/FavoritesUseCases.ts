import { HttpStatusCode } from 'axios';
import { MovieSummary } from '../../domain/entities/Movie';
import { AppError } from '../../domain/errors/AppError';
import { IFavoriteRepository } from '../../domain/repositories/IFavoritesRepository';
import { IMovieService } from '../../domain/services/IMovieService';
import { messages } from '../../shared/constants/messages';
import { IFavoritesUseCases } from '../interfaces/IFavoritesUseCases';
import { toMovieSummary } from '../mapper/movieDetailsMapper';

export class FavoritesUseCases implements IFavoritesUseCases {
    private _favoritesRepository: IFavoriteRepository;
    private _movieService: IMovieService;

    constructor(favoritesRepository: IFavoriteRepository, movieService: IMovieService) {
        this._favoritesRepository = favoritesRepository;
        this._movieService = movieService;
    }

    async getFavorites(): Promise<MovieSummary[]> {
        return await this._favoritesRepository.getFavorites();
    }

    async addFavorite(imdbID: string): Promise<void> {
        const movie = await this._movieService.getMovieById(imdbID);
        if (!movie) {
            throw new AppError(messages.ERROR.MOVIE_NOT_FOUND, HttpStatusCode.NotFound);
        }

        const mappedMovie = toMovieSummary(movie);
        
        await this._favoritesRepository.addFavorites(mappedMovie);
    }

    async removeFavorite(imdbID: string): Promise<void> {
        await this._favoritesRepository.remove(imdbID);
    }

    async isFavorite(imdbID: string): Promise<boolean> {
        return await this._favoritesRepository.isFavorite(imdbID);
    }
}
