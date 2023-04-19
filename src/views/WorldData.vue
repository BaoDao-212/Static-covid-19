<script setup>
import GridTableData from "../components/GridTableData.vue";
import TableWorld from "../components/TableWorld.vue";
import BarChart from "../components/BarChart.vue";
import { computed, onBeforeMount, ref, watch, watchEffect } from "vue";
import { useWorldStore } from "../stores/store";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const worldStore = useWorldStore();
worldStore.fetchDataCorona();
const data = ref(null);
watchEffect(async () => {
  data.value = await worldStore.$state.dataCorona;
});
</script>
<template>
  <div :key="data">
    <GridTableData :data="data.world_total" />
    <TableWorld :key="locale" :allCountries="data.countries_stat" />
  </div>
</template>
<style>
.ant-card.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-wrap: wrap;
  border-radius: 20px;
  background: linear-gradient(to right, #172336, #243a54);
  text-align: center;
  margin: 10px;
}

.ant-card-body,
.ant-card-head-title {
  padding: 0;
}
</style>
