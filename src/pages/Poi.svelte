<script lang="ts">
  import { onMount } from "svelte";
  import type { Coast, PointOfInterest } from "../services/poi-types";
  import PoiDescription from "../components/PoiDescription.svelte";
  import PoiCoordinates from "../components/PoiCoordinates.svelte";
  import Map from "../components/Map.svelte";
  import { getContext } from "svelte";
  import type { Oileain } from "../services/oileain";
  import { location } from "svelte-spa-router";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  export let poi: PointOfInterest;
  let coasts: Coast[];
  let refresh = true;
  onMount(async () => {
    coasts = await oileain.getCoasts();
    poi = await oileain.getIslandById(params.wild);
  });

  location.subscribe((value) => {
    if (coasts) {
      const safeName = value.substring(value.lastIndexOf("/") + 1);
      console.log(safeName);
      oileain.getIslandById(safeName).then((foundPoi) => {
        poi = foundPoi;
        refresh = !refresh;
      });
    }
  });
</script>

{#if poi}
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-expand@m uk-animation-slide-left">
      {#key refresh}
        <Map id="map-main" {poi} zoom={7} height={560} />
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
