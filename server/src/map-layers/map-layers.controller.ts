import { Request, Response, NextFunction } from 'express';
import * as helper from './map-layers.helper';

export class MapLayersController {
  
  constructor() {}
  
  public async getMapLayers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await helper.getMapLayers();
      return res.send(result);
    } catch (err) {
      return next(err);
    }
  }

}
