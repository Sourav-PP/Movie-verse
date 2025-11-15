import { Response, Request, NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { messages } from '../../shared/constants/messages';
import { IFavoritesUseCases } from '../../application/interfaces/IFavoritesUseCases';
import { AppError } from '../../domain/errors/AppError';
import { IMovieService } from '../../domain/services/IMovieService';

export class FavoritesController {
    private _favoritesUseCase: IFavoritesUseCases;
    private _movieService: IMovieService;

    constructor(favoritesUseCase: IFavoritesUseCases, movieService: IMovieService) {
        this._favoritesUseCase = favoritesUseCase;
        this._movieService = movieService;
    }

    getFavorites =async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const favorites = await this._favoritesUseCase.getFavorites();

            res.status(HttpStatusCode.Ok).json({
                success: true,
                message: messages.SUCCESS.FAVORITES_FETCHED,
                data: favorites,
            });
        } catch (error) {
            next(error);
        }
    };

    addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { imdbID } = req.params;

            if (!imdbID) {
                throw new AppError(messages.ERROR.MISSING_MOVIE_INFO, HttpStatusCode.BadRequest);
            }

            await this._favoritesUseCase.addFavorite(imdbID);

            res.status(HttpStatusCode.Created).json({
                success: true,
                message: messages.SUCCESS.ADDED_TO_FAVORITES,
            });
        } catch (error) {
            next(error);
        }
    };

    removeFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { imdbID } = req.params;
            if (!imdbID) throw new AppError(messages.ERROR.MISSING_IMDB_ID, HttpStatusCode.BadRequest);

            await this._favoritesUseCase.removeFavorite(imdbID);

            res.status(HttpStatusCode.Ok).json({
                success: true,
                message: messages.SUCCESS.REMOVED_FROM_FAVORITES,
            });
        } catch (error) {
            next(error);
        }
    };

    isFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { imdbID } = req.params;
            if (!imdbID) throw new AppError(messages.ERROR.MISSING_IMDB_ID, HttpStatusCode.BadRequest);

            const isFavorite = await this._favoritesUseCase.isFavorite(imdbID);
            res.status(HttpStatusCode.Ok).json({
              success: true,
              message: messages.SUCCESS.CHECKED_IS_FAVORITE,
              data: {
                imdbID,
                isFavorite,
              }
            })
        } catch (error) {
            next(error)
        }
    };
}
