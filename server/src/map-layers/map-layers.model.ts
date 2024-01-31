export interface MapLayersModel {
  title: string;
  baseUrl: string;
  options: {
    layer: string;
    format: string;
    opacity: number;
  };
}

