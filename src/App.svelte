<script lang="ts">
  import { onMount } from "svelte";
  import { CoastalLeafletMap } from "./services/coastal-leaflet";

  import Header from "./components/Header.svelte";

  let coasts: any[];

  const mapDescriptor = {
    id: "home-map-id",
    height: 800,
    location: { lat: 53.2734, long: -7.7783203 },
    zoom: 8,
    minZoom: 7,
    activeLayer: "",
  };

  let map: CoastalLeafletMap;

  onMount(async () => {
    const response = await fetch("https://edeleastar.github.io/oileain-api/all-slim.json");
    coasts = await response.json();
    console.log(coasts);
    map = new CoastalLeafletMap(mapDescriptor);
    map.populateCoasts(coasts);
  });
</script>

<svelte:head>
  <title>Oileain</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.8/dist/css/uikit.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.8/dist/js/uikit.min.js">
  </script>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,300" rel="stylesheet" type="text/css" />
</svelte:head>

<Header title="Oileain" />
<div class="uk-container">
  <div id={mapDescriptor.id} style="height:{mapDescriptor.height}px" />
</div>
