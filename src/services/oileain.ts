import type { Coast, PointOfInterest } from "./poi-types";

export class Oileain {
  coasts: any[];
  islandMap = new Map<string, PointOfInterest>();
  coastMap = new Map<string, Coast>();

  constructor() {}

  async getCoasts() {
    if (!this.coasts) {
      const response = await fetch("https://edeleastar.github.io/oileain-api/all-slim.json");
      this.coasts = await response.json();
      this.createIndexes();
    }
    return this.coasts;
  }

  async getIslandById(id: string) {
    let cachedPoi = await this.islandMap.get(id);
    if (cachedPoi.description) {
      return cachedPoi;
    } else {
      const path = `https://edeleastar.github.io/oileain-api/${cachedPoi.coast.variable}/${id}.json`;
      const response = await fetch(path);
      const island = await response.json();
      island.safeName = id;
      this.islandMap.set(id, island);
      return island;
    }
  }

  createIndexes() {
    this.coasts.forEach((coast) => {
      this.coastMap.set(coast.variable, coast);
      coast.pois.forEach((poi) => {
        poi.coast = coast;
        poi.safeName = encodeURI(poi.safeName);
        this.islandMap.set(poi.safeName, poi);
      });
    });
  }
}
