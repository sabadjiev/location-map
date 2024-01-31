// Import the MapLayersModel type from the map-layers.model file
import { MapLayersModel } from "./map-layers.model";

// Sample data representing map layers
let mapLayersData = [
  {
    title: "Population Density – 2015",
    baseUrl: "http://sedac.ciesin.columbia.edu/geoserver/wms",
    options: {
      layers: "gpw-v4:gpw-v4-population-density_2015",
      format: "image/png",
      opacity: 0.5
    }
  },
  {
    title: "Probabilities of Urban Expansion to 2030",
    baseUrl: "http://sedac.ciesin.columbia.edu/geoserver/wms",
    options: {
      layers: "lulc:lulc-global-grid-prob-urban-expansion-2030",
      format: "image/png",
      opacity: 0.5
    }
  }
];

// Function to asynchronously retrieve map layers
async function getMapLayers(): Promise<MapLayersModel[]> {
  let response: any;  // Variable to store the response

  try {
    // Assign the mapLayersData to the response variable
    response = mapLayersData;
  } catch (error) {
    // Log an error message if there is an issue fetching map layers
    console.error('Error fetching map layers', error);
  } finally {
    // Return the response (can be the map layers data or an error)
    return response;
  }
}

export {
  getMapLayers
};
