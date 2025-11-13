import { Movie } from "../../domain/entities/Movie";
import { IFavoriteRepository } from "../../domain/repositories/IFavoritesRepository";
import path from 'path'
import { promises as fs} from 'fs'
import { AppError } from "../../domain/errors/AppError";
import { messages } from "../../shared/constants/messages";

export class FavoriteFileRepository implements IFavoriteRepository {
    private _filePath: string;

    constructor(
        filepath: string,
    ) {
        this._filePath = path.resolve(filepath);
    }

    private async readFile(): Promise<Movie[]> {
        try {
            console.log('this._filePath: ', this._filePath)
            const data = await fs.readFile(this._filePath, "utf-8")
            console.log('data:', data);
            if (!data.trim()) {
                return [];
            }
            return JSON.parse(data) as Movie[];
        } catch (error) {
            throw new AppError(messages.ERROR.READING_FILE)
        }
    }

    async writeFile(movies: Movie[]): Promise<void> {
      await fs.writeFile(this._filePath, JSON.stringify(movies, null, 2), "utf-8")
    }

    async getFavorites(): Promise<Movie[]> {
        return await this.readFile();
    }

    async addFavorites(movie: Movie): Promise<void> {
        const favorites = await this.readFile();
        if (!favorites.find((m) => m.imdbID === movie.imdbID)) {
            favorites.push(movie)
            await this.writeFile(favorites);
        }
    }

    async remove(imdbId: string): Promise<void> {
        const favorites = await this.readFile();
        const updated = favorites.filter((m) => m.imdbID !== imdbId)
        await this.writeFile(updated);
    }

    async isFavorite(imdbID: string): Promise<boolean> {
        const favorites = await this.readFile();
        return favorites.some((m) => m.imdbID === imdbID);
    }
}