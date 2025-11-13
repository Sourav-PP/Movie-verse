import { Movie } from "../../domain/entities/Movie";
import { IFavoriteRepository } from "../../domain/repositories/IFavoritesRepository";
import { IFavoritesUseCases } from "../interfaces/IFavoritesUseCases";

export class FavoritesUseCases implements IFavoritesUseCases {
    private _favoritesRepository: IFavoriteRepository

    constructor(
        favoritesRepository: IFavoriteRepository,
    ) {
        this._favoritesRepository = favoritesRepository;
    }

    async getFavorites(): Promise<Movie[]> {
        return await this._favoritesRepository.getFavorites();
    }

    async addFavorite(movie: Movie): Promise<void> {
        await this._favoritesRepository.addFavorites(movie);
    }

    async removeFavorite(imdbID: string): Promise<void> {
        await this._favoritesRepository.remove(imdbID);
    }

    async isFavorite(imdbID: string): Promise<boolean> {
        return await this._favoritesRepository.isFavorite(imdbID);    
    }
}