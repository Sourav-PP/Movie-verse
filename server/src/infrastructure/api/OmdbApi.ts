import axios from 'axios';
import { IMovieService } from '../../domain/services/IMovieService';
import { MovieSummary, MovieDetails } from '../../domain/entities/Movie';

export class OmdbApi implements IMovieService {
    private _apiKey: string;
    private _apiUrl: string = 'http://www.omdbapi.com/';

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    async search(query: string, page?: number): Promise<{ movies: MovieSummary[]; totalResults: number }> {
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

        const movies: MovieSummary[] = data.Search.map((m: any) => ({
            imdbID: m.imdbID,
            Title: m.Title,
            Year: m.Year,
            Poster: m.Poster,
        }));
        return { movies, totalResults: parseInt(data.totalResults) };
    }

    async getMovieById(imdbID: string): Promise<MovieDetails | null> {
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
            Title: data.Title,
            Year: data.Year,
            Rated: data.Rated,
            Released: data.Released,
            Runtime: data.Runtime,
            Genre: data.Genre,
            Director: data.Director,
            Writer: data.Writer,
            Actors: data.Actors,
            Plot: data.Plot,
            Language: data.Language,
            Country: data.Country,
            Awards: data.Awards,
            Poster: data.Poster,
            Ratings: data.Ratings,
            Metascore: data.Metascore,
            imdbRating: data.imdbRating,
            imdbVotes: data.imdbVotes,
            imdbID: data.imdbID,
            Type: data.Type,
            DVD: data.DVD,
            BoxOffice: data.BoxOffice,
            Production: data.Production,
            Website: data.Website,
            Response: data.Response,
        };
    }
}
