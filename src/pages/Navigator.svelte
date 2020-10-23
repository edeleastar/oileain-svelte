<script lang="ts">
  import { onMount } from "svelte";
  import Map from "../components/Map.svelte";
  import { getContext } from "svelte";
  import type { Oileain } from "../services/oileain";
  import type { Coast } from "../services/poi-types";

  let oileain: Oileain = getContext("oileain");
  let coasts: Array<Coast> = null;
  let poiSelected = false;
  let mapIdMain = "map-main";
  let mapIdSecondary = "map-secondary";

  onMount(async () => {
    coasts = await oileain.getCoasts();
  });
</script>

{#if coasts}
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-1-3@m uk-animation-scale-up">
      <Map id={mapIdMain} zoom={7} height={560} {coasts} />
      {#if poiSelected}
        <div class="uk-card uk-card-default uk-card-body" />
      {/if}
    </div>
    <div class="uk-width-expand@m uk-animation-scale-up">
      <Map id="{mapIdSecondary}}" height={250} />
      {#if poiSelected}
        <div class="uk-card uk-card-default uk-card-body" />
      {:else}
        <div class="uk-card uk-card-default uk-card-body">
          <p>Select Island marker on map to view details...</p>
        </div>
      {/if}
    </div>
  </div>
{/if}
