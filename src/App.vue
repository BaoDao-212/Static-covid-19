<script setup>
import HeaderWeb from "./components/HeaderWeb.vue";
// import { useWorldStore } from "./stores/store.js";
// const worldStore = useWorldStore();
// // worldStore.fetchDataCorona();
</script>
<template>
  <div id="app">
    <HeaderWeb />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <router-view></router-view>
    </a-layout-content>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: end;
  width: 100%;
  height: 100%;
  background-color: #283149;
  overflow: auto;
}
</style>
