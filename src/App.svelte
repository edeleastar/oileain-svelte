<script lang="ts">
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Home from "./pages/Home.svelte"
  import Navigator from "./pages/Navigator.svelte";
  import NotFound from "./pages/NotFound.svelte"

  let routes = {
    "/": Home,
    "/navigator" : Navigator,
    "*": NotFound
  };

</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

<Header title="Oileain" />
<div class="uk-container">
  <Router {routes} />
</div>
