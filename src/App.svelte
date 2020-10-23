<script lang="ts">
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import Navigator from "./pages/Navigator.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import { Oileain } from "./services/oileain";

  setContext("oileain", new Oileain());

  let routes = {
    "/": Home,
    "/navigator": Navigator,
    "*": NotFound,
  };
</script>

<svelte:head>
  <title>Oileain</title>
</svelte:head>

<Header title="Oileain" />
<div class="uk-container">
  <Router {routes} />
</div>
