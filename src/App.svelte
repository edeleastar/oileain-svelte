<script lang="ts">
  import { onMount } from "svelte";
  import Map from "./components/Map.svelte";
  import { poiCollection } from "./services/stores";
  import Header from "./components/Header.svelte";
  import { generateMarkerDescriptors, getCoasts } from "./services/poi";

  let coasts: any[];

  onMount(async () => {
    coasts = await getCoasts();
    coasts.forEach(coast => {
      let markerDescriptors = generateMarkerDescriptors(coast.pois)
      poiCollection.set({ title:coast.title, markerDescriptors:markerDescriptors });
    })
  });
</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

<Header title="Oileain" />
<div class="uk-container">
  <Map height={800} />
</div>
