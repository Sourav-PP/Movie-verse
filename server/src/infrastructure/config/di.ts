import { appConfig } from "./config";

import { FavoriteFileRepository } from "../repository/favoritesFileRepository";
import { OmdbApi } from "../api/OmdbApi";

import { MovieUseCase } from "../../application/useCases/MovieUseCase";
import { FavoritesUseCases } from "../../application/useCases/FavoritesUseCases";

import { MovieController } from "../../presentation/controllers/MovieController";
import { FavoritesController } from "../../presentation/controllers/FavoritesController";

const filePath = "./src/infrastructure/storage/favorites.json";
const movieService = new OmdbApi(appConfig.omdb.apiKey)
const favoritesRepository = new FavoriteFileRepository(filePath);

const movieUseCase = new MovieUseCase(movieService);
const favoritesUseCase = new FavoritesUseCases(favoritesRepository)

export const movieController = new MovieController(movieUseCase);
export const favoritesController = new FavoritesController(favoritesUseCase, movieService);