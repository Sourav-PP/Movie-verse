import { Response, Request, NextFunction } from "express";
import { IMovieUseCase } from "../../application/interfaces/IMovieUseCase";
import { HttpStatusCode } from "axios";
import { messages } from "../../shared/constants/messages";
import { IMovieService } from "../../domain/services/IMovieService";

export class MovieController {
    private _movieUseCase: IMovieUseCase;

    constructor(
        movieUseCase: IMovieUseCase,
    ) {
        this._movieUseCase = movieUseCase;
    }

    searchMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const query = String(req.query.q) || ''
            const page = Number(req.query.page) || 1

            const results = await this._movieUseCase.searchMovies(query, page);
            res.status(HttpStatusCode.Ok).json({
              success: true,
              message: messages.SUCCESS.MOVIES_FETCHED,
              data: results
            })
        } catch (error) {
            next(error);
        }
    } 

    getMovieById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { imdbID } = req.params

            const movie = await this._movieUseCase.getMovieDetails(imdbID);

            res.status(HttpStatusCode.Ok).json({
              success: true,
              message: messages.SUCCESS.MOVIES_FETCHED,
              data: movie
            })
        } catch (error) {
            next(error);
        }
    }
}