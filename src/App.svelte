<script lang="ts">
  import { onMount } from "svelte";
  import Map from "./components/Map.svelte";
  import { poiCollection } from "./components/stores";

  import Header from "./components/Header.svelte";

  let coasts: any[];

  onMount(async () => {
    const response = await fetch("https://edeleastar.github.io/oileain-api/all-slim.json");
    coasts = await response.json();
    console.log(coasts);
    poiCollection.set({ pois: coasts[0].pois });
    poiCollection.set({ pois: coasts[1].pois });
  });
</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

<Header title="Oileain" />
<div class="uk-container">
  <Map height={800} />
</div>
