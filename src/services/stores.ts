import { writable } from "svelte/store";

export interface MarkerDescriptor {
  mapId: string;
  title: string;
  lat: number;
  lng: number;
}

export const poiCollection = writable({ mapId: "", title: "", markerDescriptors: [] });
