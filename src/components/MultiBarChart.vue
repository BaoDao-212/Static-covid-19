<template>
  <div>
    <VueApexCharts
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
    ></VueApexCharts>
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { defineProps, ref } from "vue";
const props = defineProps({
  bar_chart1: {
    type: Object,
    required: true,
  },
  bar_chart2: {
    type: Object,
    required: true,
  },
  name_country1: {
    type: String,
    required: true,
  },
  name_country2: {
    type: String,
    required: true,
  },
});
const title1 = props.bar_chart1.map((ele) => ele.title);
const body1 = props.bar_chart1.map((ele) => ele.data.replace(/[,]/g, ""));
const body2 = props.bar_chart2.map((ele) => ele.data.replace(/[,]/g, ""));
const chartOptions = ref({
  chart: {
    id: "covid_19",
  },
  dataLabels: {
    style: {
      colors: ["#5FCE97","#00AFFF" ],
      fontSize: "12px",
    },
  },
  grid: {
    dataLabels: {
      style: {
        colors: ["#00ff00"], // Green color
      },
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
    categories: title1,
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
    name: props.name_country1,
    data: body1,
  },
  {
    name: props.name_country2,
    data: body2,
  },
]);
</script>

<style></style>
