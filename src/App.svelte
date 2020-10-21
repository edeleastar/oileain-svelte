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
    map = new CoastalLeafletMap(mapDescriptor);
    map.populateCoasts(coasts);
  });
</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

<Header title="Oileain" />
<div class="uk-container">
  <div id={mapDescriptor.id} style="height:{mapDescriptor.height}px" />
</div>
