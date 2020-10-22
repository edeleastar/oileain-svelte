import { writable } from "svelte/store";

export interface MarkerDescriptor {
  title: string;
  lat: number;
  lng: number;
}

export const poiCollection = writable({ title: "", markerDescriptors: [] });
