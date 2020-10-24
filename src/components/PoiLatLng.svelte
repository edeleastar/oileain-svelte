<script lang="ts">
  import type { PointOfInterest } from "../services/poi-types";

  export let poi: PointOfInterest;
</script>

<div class="uk-card uk-card-default uk-card-body uk-padding-small">
  <caption>GPS-compatible</caption>
  <table class="uk-table uk-table-divider uk-table-small">
    <tbody>
      <tr>
        <td>Latitude</td>
        <td>{poi.coordinates.geo.lat}</td>
      </tr>
      <tr>
        <td>Longitude</td>
        <td>{poi.coordinates.geo.long}</td>
      </tr>
    </tbody>
  </table>
</div>
