<script lang="ts">
  import { onMount } from "svelte";
  import Map from "../components/Map.svelte";
  import PoiLatLng from "../components/PoiLatLng.svelte";
  import PoiDescription from "../components/PoiDescription.svelte";
  import { getContext } from "svelte";
  import type { Oileain } from "../services/oileain";
  import type { Coast, PointOfInterest } from "../services/poi-types";

  let oileain: Oileain = getContext("oileain");
  let coasts: Array<Coast>;
  let poi: PointOfInterest;
  let navigator: Map;

  onMount(async () => {
    coasts = await oileain.getCoasts();
  });

  function markerSelect(event) {
    oileain.getIsland(event.detail.marker).then((poiSelected) => {
      poi = poiSelected;
      navigator.populatePoi(poi);
    });
  }
</script>

{#if coasts}
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-1-3@m uk-animation-scale-up">
      <Map id="map-main" zoom={7} height={560} {coasts} on:message={markerSelect} />
      {#if poi}
        <div class="uk-card uk-card-default uk-card-body">
          <PoiLatLng {poi} />
        </div>
      {/if}
    </div>
    <div class="uk-width-expand@m uk-animation-scale-up">
      <Map id="map-secondary" height={250} activeLayer="Satellite" bind:this={navigator} />
      {#if poi}
        <div class="uk-card uk-card-default uk-card-body">
          <PoiDescription {poi} />
        </div>
      {:else}
        <div class="uk-card uk-card-default uk-card-body">
          <p>Select Island marker on map to view details...</p>
        </div>
      {/if}
    </div>
  </div>
{/if}
