<script lang="ts">
  import { onMount } from "svelte";
  import { getContext } from "svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import type { Oileain } from "../services/oileain";
  import type { Coast } from "../services/poi-types";
  import { generateMarkerLayers } from "../services/poi-types";
  import type { MarkerLayer } from "../components/markers";

  let oileain: Oileain = getContext("oileain");
  let coasts: Array<Coast> = null;
  let markerLayers = Array<MarkerLayer>();

  onMount(async () => {
    coasts = await oileain.getCoasts();
    markerLayers = generateMarkerLayers(coasts);
  });
</script>

{#if coasts}
  <div class="uk-container">
    <LeafletMap height={800} {markerLayers} />
  </div>
{/if}
