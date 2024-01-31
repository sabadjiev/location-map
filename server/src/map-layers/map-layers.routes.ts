import { Router } from 'express';
import { MapLayersController } from './map-layers.controller';

export class MapLayersRoutes {
  public routes: Router = Router();
  private mapLayersController = new MapLayersController();
  
  constructor() {
    this.generateRoutes();
  }

  
  public generateRoutes() {
    // GET
    this.routes.get('/map-layers', this.mapLayersController.getMapLayers);
    
  }
}
