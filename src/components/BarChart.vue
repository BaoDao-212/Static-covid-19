<template>
  <div>
    <VueApexCharts
      class="char_style"
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
      :key="chartSeries"
    />
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { defineProps, ref, computed, watch } from "vue";
const props = defineProps({
  bar_chart: {
    type: Object,
    required: true,
  },
});

console.log(props.bar_chart.map((ele) => ele.title));
const title = computed(() => props.bar_chart.map((ele) => ele.title));
const body = props.bar_chart.map((ele) => ele.data.replace(/[,]/g, ""));
const chartOptions = ref({
  chart: {
    id: "covid_19",
  },
  dataLabels: {
    style: {
      colors: ["#5FCE97", "#fff"],
      fontSize: "12px",
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ["#5FCE97", "#059da0", "#FF9900", "#CF3837"],
        fontSize: "12px",
      },
    },
  },
  colors: ["#02696f", "#03696f"],
  xaxis: {
    categories: title,
    labels: {
      style: {
        colors: [
          "#5FCE97",
          "#059da0",
          "#FF9900",
          "#CF3837",
          "white",
          "#5FCE97",
        ],
        fontSize: "12px",
      },
    },
  },
});

const chartSeries = ref([
  {
    name: "Cases",
    data: body,
  },
]);
</script>
<style>
@media (max-width: 500px) {
  .char_style {
    display: none;
  }
}
</style>
