<script lang="ts">
  import type { PointOfInterest } from "../services/poi-types";
  export let poi: PointOfInterest;
</script>

<div class="ui segment">
  <div class="description">
    {@html poi.description}
  </div>
</div>
