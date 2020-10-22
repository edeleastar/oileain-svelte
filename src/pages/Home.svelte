<script lang="ts">
  import { onMount } from "svelte";
  import Map from "../components/Map.svelte";
  import { poiCollection } from "../services/stores";
  import { generateMarkerDescriptors, getCoasts } from "../services/poi";

  let coasts: any[];
  let mapId="all-ireland-main";

  onMount(async () => {
    coasts = await getCoasts();
    coasts.forEach(coast => {
      let markerDescriptors = generateMarkerDescriptors(coast.pois)
      poiCollection.set({ mapId: mapId, title:coast.title, markerDescriptors:markerDescriptors });
    })
  });
</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

<div class="uk-container">
  <Map id={mapId} height={800} />
</div>
