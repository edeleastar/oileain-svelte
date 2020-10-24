<script lang="ts">
  import { onMount } from "svelte";
  import type { PointOfInterest } from "../services/poi-types";
  import PoiDescription from "../components/PoiDescription.svelte";
  import PoiCoordinates from "../components/PoiCoordinates.svelte";
  import Map from "../components/Map.svelte";
  import { getContext } from "svelte";
  import type { Oileain } from "../services/oileain";

  let oileain: Oileain = getContext("oileain");
  export let params: any = {};
  export let poi: PointOfInterest;
  console.log(params);

  onMount(async () => {
    poi = await oileain.getIslandById(params.wild);
  });
</script>

{#if poi}
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-expand@m uk-animation-slide-left">
      <Map id="map-main" {poi} zoom={7} height={560} />
      <div class="uk-card uk-card-default uk-card-body">
        <PoiCoordinates {poi} />
      </div>
    </div>
    <div class="uk-width-1-3@m uk-animation-slide-right">
      <PoiDescription {poi} />
    </div>
  </div>
{/if}
