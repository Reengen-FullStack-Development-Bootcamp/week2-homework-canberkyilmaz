<template>
  <div id="app">
    <div class="appContainer">
      <div id="nav">
        <!-- NavBar Routes add as a component -->
        <TheNavigation />
      </div>
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";

export default {
  name: "App",
  components: {
    TheNavigation,
  },
};
</script>
<style scoped>
#app {
  font-family: monospace, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#nav a {
  font-weight: bold;
  color: #502c2c;
}
</style>
