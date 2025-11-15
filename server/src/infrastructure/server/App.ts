import express, { Application } from 'express';
import cors from 'cors';
import { MovieRoutes } from '../../presentation/routes/MovieRoutes';
import { FavoritesRoutes } from '../../presentation/routes/FavoritesRoutes';
import { errorHandler } from '../../presentation/middlewares/errorHandler';
import { appConfig } from '../config/config';

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors({
            origin: appConfig.server.frontendUrl,
            credentials: true,
        }));
        this.app.use(express.json());
    }

    private initializeRoutes(): void {
        const movieRoutes = new MovieRoutes();
        const favoritesRoutes = new FavoritesRoutes();
        console.log('its here');
        this.app.use('/api/movies', movieRoutes.route);
        this.app.use('/api/favorites', favoritesRoutes.route);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public getApp(): Application {
        return this.app;
    }
}
