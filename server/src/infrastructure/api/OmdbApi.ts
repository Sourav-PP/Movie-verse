import axios from 'axios';
import { IMovieService } from '../../domain/services/IMovieService';
import { Movie } from '../../domain/entities/Movie';

export class OmdbApi implements IMovieService {
    private _apiKey: string;
    private _apiUrl: string = 'http://www.omdbapi.com/';

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    async search(query: string, page?: number): Promise<{ movies: Movie[]; totalResults: number }> {
        const res = await axios.get(this._apiUrl, {
            params: {
                apikey: this._apiKey,
                s: query,
                page,
            },
        });

        const data = res.data;
        if (data.Response === 'False') {
            return { movies: [], totalResults: 0 };
        }

        const movies: Movie[] = data.Search.map((m: any) => ({
            imdbID: m.imdbID,
            title: m.Title,
            year: m.Year,
            poster: m.Poster,
        }));
        return { movies, totalResults: parseInt(data.totalResults) };
    }

    async getMovieById(imdbID: string): Promise<Movie | null> {
        const res = await axios.get(this._apiUrl, {
            params: {
                apikey: this._apiKey,
                i: imdbID,
            }
        })

        console.log('res: ', res)

        const data = res.data;
        if (data.Response === 'False') return null;

        return {
            imdbID: data.imdbID,
            Title: data.Title,
            Year: data.Year,
            Poster: data.Poster,
        }
    }
}
