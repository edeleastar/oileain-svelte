import type { MarkerDescriptor } from "./stores";
export interface Grid {
  sheet: string;
  eastings: number;
  northings: number;
}

export interface FullGrid {
  eastings: number;
  northings: number;
}

export interface Geodetic {
  lat: number;
  long: number;
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

export interface Region {
  title: string;
  id: string;
  location: Geodetic;
}

export function generateMarkerDescriptors(pois: PointOfInterest[]): MarkerDescriptor[] {
  let markerDescriptors = [];
  pois.forEach((poi) => {
    markerDescriptors.push({ title: poi.name, lat: poi.coordinates.geo.lat, lng: poi.coordinates.geo.long });
  });
  return markerDescriptors;
}

export async function getCoasts(): Promise<Coast[]> {
  let coasts: Coast[];
  const response = await fetch("https://edeleastar.github.io/oileain-api/all-slim.json");
  coasts = await response.json();
  return coasts;
}
