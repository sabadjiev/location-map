import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MapLayer} from "../models/map-layer";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private getLayersUrl = environment.apiUrl + "/api/map-layers"

  constructor(
    private http: HttpClient
  ) {
  }

  getLayers(): Observable<MapLayer[]> {
    return this.http.get<MapLayer[]>(this.getLayersUrl)
  }

}
