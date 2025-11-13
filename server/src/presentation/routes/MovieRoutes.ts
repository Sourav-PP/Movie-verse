import { Router } from "express";
import { movieRoute } from "../../shared/RouteConst/MovieRouteConst";
import { movieController } from "../../infrastructure/config/di";

export class MovieRoutes {
  public route: Router

  constructor() {
      this.route = Router();
      this.setRoute(); 
  }

  private setRoute(): void {
    this.route.get(
      movieRoute.SEARCH,
      movieController.searchMovie,
    )
  }
}

