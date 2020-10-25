<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { Coast, PointOfInterest } from "../services/poi-types";
  import { generateMarkerSpec } from "../services/poi-types";
  import PoiDescription from "../components/PoiDescription.svelte";
  import PoiCoordinates from "../components/PoiCoordinates.svelte";
  import LeafletMap from "../components/LeafletMap.svelte";
  import { getContext } from "svelte";
  import type { Oileain } from "../services/oileain";
  import { location } from "svelte-spa-router";
  import type { MarkerSpec } from "../components/markers";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  export let poi: PointOfInterest;
  let marker: MarkerSpec;
  let coasts: Coast[];
  let refresh = true;

  onMount(async () => {
    coasts = await oileain.getCoasts();
    poi = await oileain.getIslandById(encodeURI(params.wild));
    marker = generateMarkerSpec(poi);
  });

  let unsubscribe = location.subscribe((value) => {
    if (coasts) {
      const safeName = value.substring(value.lastIndexOf("/") + 1);
      oileain.getIslandById(safeName).then((foundPoi) => {
        poi = foundPoi;
        marker = generateMarkerSpec(foundPoi);
        refresh = !refresh;
      });
    }
  });

  onDestroy(unsubscribe);
</script>

{#if poi}
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-expand@m uk-animation-slide-left">
      {#key refresh}
        <LeafletMap id="map-main" {marker} zoom={7} height={560} />
        <div class="uk-card uk-card-default uk-card-body">
          <PoiCoordinates {poi} />
        </div>
      {/key}
    </div>
    <div class="uk-width-1-3@m uk-animation-slide-right">
      <PoiDescription {poi} />
    </div>
  </div>
{/if}
