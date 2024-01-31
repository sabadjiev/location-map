import {Component, OnDestroy, OnInit} from '@angular/core';
import * as L from "leaflet";
import Geocoder from "leaflet-control-geocoder";
import {MapService} from "../services/map.service";
import {MapLayer} from "../models/map-layer";
import {TileLayer} from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  // Array to store map layers fetched from the service
  mapLayers: MapLayer[] = [];

  // Base layers for the map
  osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  });

  osmFR = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap France'
  });

  // Initial options for the map
  options = {
    layers: [
      this.osm,
      this.osmFR
    ],
    zoom: 5,
    center: L.latLng(39.828175, -98.5795) // Default center coordinates
  };

  // Layers control for managing base layers and overlays
  layersControl: any = {
    baseLayers: {
      'Open French Map': this.osmFR,
      'Open Street Map': this.osm
    },
    overlays: {},
  }

  constructor(
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    // Fetch map layers from the service when the component is initialized
    this.mapService.getLayers().subscribe(data => {
      this.mapLayers = data;
      this.mapLayers.forEach((layer: MapLayer) => {
        this.layersControl.overlays[layer.title] = this.generateLayer(layer);
      })
    })
  }

  // Generate a TileLayer.WMS for a given map layer
  generateLayer(layer: MapLayer): TileLayer.WMS {
    return L.tileLayer.wms(layer.baseUrl, layer.options);
  }

  // Callback when the map is ready
  onMapReady(map: any) {
    // Add Geocoder control to the map when it is ready
    const GeocoderControl = new Geocoder();
    GeocoderControl.addTo(map)
  }

  ngOnDestroy(): void {
    // Remove base layers when the component is destroyed
    if (this.osm) {
      this.osm.remove();
    }
    if (this.osmFR) {
      this.osmFR.remove();
    }

    // Remove overlays when the component is destroyed
    if(this.layersControl.overlays && this.layersControl.overlays.length) {
      this.layersControl.overlays.forEach((layer: any) => {
        layer.destroy();
      })
    }
  }

}
