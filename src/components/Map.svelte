<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as L from "leaflet";
  import type { Map, Layer, LayerControl, LayersObject } from "leaflet";
  import { poiCollection } from "./stores";

  export let id = "home-map-id";
  export let height = 800;
  export let location = { lat: 53.2734, long: -7.7783203 };
  export let zoom = 8;
  export let minZoom = 7;
  export let activeLayer = "";

  let imap: Map;
  let control: LayerControl;
  let overlays: LayersObject = {};
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
  let defaultLayer = baseLayers.Terrain;

  onMount(async () => {
    if (activeLayer) {
      defaultLayer = baseLayers[activeLayer];
    }
    imap = L.map(id, {
      center: [location.lat, location.long],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer],
    });
    console.log("map created");
    control = L.control.layers(baseLayers, overlays).addTo(imap);
  });

  const unsubscribe = poiCollection.subscribe((value) => {
    if (imap) {
      console.log("pois recieved = " + value.pois.length);
      let group = L.layerGroup([]);
      value.pois.forEach((poi) => {
        let marker = L.marker([poi.coordinates.geo.lat, poi.coordinates.geo.long]);
        var newpopup = L.popup({ autoClose: false, closeOnClick: false });
        newpopup.setContent(poi.name);
        marker.bindPopup(newpopup);
        marker.addTo(group);
      });
      overlays["islands"] = group;
      imap.addLayer(group);
      control.addOverlay(group, "islands");
      imap.invalidateSize();
    }

    // overlays["Islands"] = group;
    // control.addOverlay(group, "Islands");
  });

  onDestroy(unsubscribe);
</script>

<div {id} style="height:{height}px" />
