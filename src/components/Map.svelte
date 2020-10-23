<script lang="ts">
  import { onMount } from "svelte";
  import * as L from "leaflet";
  import type { Layer, Marker, LayerControl, LayersObject } from "leaflet";
  import type { Map as LeafletMap } from "leaflet";
  import type { Coast, PointOfInterest } from "../services/poi-types";

  export let id = "home-map-id";
  export let height = 800;
  export let location = { lat: 53.2734, long: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "Terrain";
  export let coasts: Array<Coast>;

  let imap: LeafletMap;
  let control: LayerControl;
  let overlays: LayersObject = {};
  let markerMap = new Map<Marker, PointOfInterest>();

  let baseLayers = {
    Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }),
    Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }),
  };

  onMount(async () => {
    let defaultLayer = baseLayers[activeLayer];
    imap = L.map(id, {
      center: [location.lat, location.long],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer],
    });
    addControl();
    if (coasts) {
      console.log(coasts);
      coasts.forEach((coast) => {
        populateCoast(coast);
      });
    }
  });

  function populateCoast(coast: Coast, link: boolean = true) {
    let group = L.layerGroup([]);
    coast.pois.forEach((poi) => {
      let marker = L.marker([poi.coordinates.geo.lat, poi.coordinates.geo.long]);
      var newpopup = L.popup({ autoClose: false, closeOnClick: false });
      const popupTitle = link ? `<a href='/poi(${poi.safeName})'>${poi.name} <small>(click for details}</small></a>` : poi.name;
      newpopup.setContent(popupTitle);
      marker.bindPopup(newpopup);
      marker.bindTooltip(poi.name);
      marker.addTo(group);
      markerMap.set(marker, poi);
      marker.addTo(group).on("popupopen", (event) => {
        const marker = event.popup._source;
        const shortPoi = this.markerMap.get(marker);
      });
    });
    addLayer(coast.title, group);
    control.addOverlay(group, coast.title);
  }

  function addControl() {
    control = L.control.layers(baseLayers, overlays).addTo(imap);
  }
  function addLayer(title: string, layer: Layer) {
    overlays[title] = layer;
    imap.addLayer(layer);
  }
</script>

<div {id} style="height:{height}px" />
