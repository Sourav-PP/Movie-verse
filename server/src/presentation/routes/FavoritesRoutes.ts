import { Router } from "express";
import { movieRoute } from "../../shared/RouteConst/MovieRouteConst";
import { favoritesController, movieController } from "../../infrastructure/config/di";
import { favoritesRoute } from "../../shared/RouteConst/FavoritesRouteConst";

export class FavoritesRoutes {
  public route: Router

  constructor() {
      this.route = Router();
      this.setRoute(); 
  }

  private setRoute(): void {
    this.route.get(
      favoritesRoute.base,
      favoritesController.getFavorites,
    );

    this.route.post(
      favoritesRoute.withId,
      favoritesController.addFavorite,
    );

    this.route.delete(
      favoritesRoute.withId,
      favoritesController.removeFavorite,
    )

    this.route.get(
      favoritesRoute.isFavorite,
      favoritesController.isFavorite
    )
  }
}

