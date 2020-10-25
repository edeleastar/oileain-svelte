import type { MarkerLayer, MarkerSpec } from "./../components/markers";
export interface Geodetic {
  lat: number;
  long: number;
}

export interface Grid {
  sheet: string;
  eastings: number;
  northings: number;
}

export interface FullGrid {
  eastings: number;
  northings: number;
}

export interface Coordinates {
  irishGrid: Grid;
  fullIrishGrid: FullGrid;
  tmcGrid: FullGrid;
  geo: Geodetic;
}

export interface PointOfInterest {
  name: string;
  safeName: string;
  nameHtml: string;
  costalZone: string;
  coordinates: Coordinates;
  cursor: number;
  description: string;
  coast?: Coast;
}

export interface Coast {
  title: string;
  variable: string;
  identifier: string;
  geo: Geodetic;
  pois: Array<PointOfInterest>;
}

export function generateMarkerSpec(poi: PointOfInterest): MarkerSpec {
  return {
    id: poi.safeName,
    title: poi.name,
    location: {
      lat: poi.coordinates.geo.lat,
      lng: poi.coordinates.geo.long,
    },
  };
}

export function generateMarkerSpecs(pois: Array<PointOfInterest>): MarkerSpec[] {
  const markerSpecs = Array<MarkerSpec>();
  pois.forEach((poi) => {
    markerSpecs.push(generateMarkerSpec(poi));
  });
  return markerSpecs;
}

export function generateMarkerLayer(coast: Coast): MarkerLayer {
  return {
    title: coast.title,
    markerSpecs: generateMarkerSpecs(coast.pois),
  };
}

export function generateMarkerLayers(coasts: Coast[]): MarkerLayer[] {
  const markerLayers = [];
  coasts.forEach((coast) => {
    markerLayers.push(generateMarkerLayer(coast));
  });
  return markerLayers;
}
