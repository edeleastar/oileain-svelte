<script lang="ts">
    import { onMount } from "svelte";
    import Map from "../components/Map.svelte";
    import { poiCollection } from "../services/stores";
    import { generateMarkerDescriptors, getCoasts } from "../services/poi";
  
    let coasts: any[];
    let poiSelected = false;
    let mapIdMain = "map-main"
    let mapIdSecondary = "map-secondary"
  
    onMount(async () => {
      coasts = await getCoasts();
      coasts.forEach(coast => {
        let markerDescriptors = generateMarkerDescriptors(coast.pois)
        poiCollection.set({ mapId: mapIdMain, title:coast.title, markerDescriptors:markerDescriptors });
      })
    });
  </script>

<div class="uk-text-center" uk-grid>
  <div class="uk-width-1-3@m uk-animation-scale-up">
    <Map id={mapIdMain} zoom={7} height={560} />
    {#if poiSelected}
      <div class="uk-card uk-card-default uk-card-body">
          
      </div>
    {/if}
  </div>
  <div class="uk-width-expand@m uk-animation-scale-up">
    <Map id={mapIdSecondary}} height={250} />
    {#if poiSelected}
      <div class="uk-card uk-card-default uk-card-body">
          
      </div>
    {:else}
      <div class="uk-card uk-card-default uk-card-body">
        <p> Select Island marker on map to view details...
      </div>
    {/if}
  </div>
</div>