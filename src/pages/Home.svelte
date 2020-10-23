<script lang="ts">
  import { onMount } from "svelte";
  import { getContext } from "svelte";
  import Map from "../components/Map.svelte";
  import type { Oileain } from "../services/oileain";
  import type { Coast } from "../services/poi-types";

  let oileain: Oileain = getContext("oileain");
  let coasts: Array<Coast> = null;
  let mapId = "all-ireland-main";

  onMount(async () => {
    coasts = await oileain.getCoasts();
    // coasts = await getCoasts();
    // coasts.forEach(coast => {
    //   let markerDescriptors = generateMarkerDescriptors(coast.pois)
    //   poiCollection.set({ mapId: mapId, title:coast.title, markerDescriptors:markerDescriptors });
    // })
  });
</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

{#if coasts}
  <div class="uk-container">
    <Map id={mapId} height={800} {coasts} />
  </div>
{/if}
