<template>
  <div>
    <VueApexCharts
      class="char_style"
      type="candlestick"
      :options="chartOptions"
      :series="chartSeries"
      width="100%"
    />
    <label class="label-chart">{{ props.name_candlestick_chart }}</label>
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { defineProps, ref, watchEffect } from "vue";
const props = defineProps({
  candlestick_chart: {
    type: Array,
    required: true,
  },
  name_candlestick_chart: {
    type: String,
    required: true,
  },
});
const chartSeries = ref(null);
watchEffect(() => {
  chartSeries.value = [
    {
      data: props.candlestick_chart
        .slice(0, props.candlestick_chart.length - 1)
        .map((state, index) => {
          return {
            x: state.date,
            y: [
              state.data,
              state.data,
              props.candlestick_chart[index + 1].data,
              props.candlestick_chart[index + 1].data,
            ],
          };
        }),
    },
  ];
  console.log(chartSeries.value);
});

const chartOptions = ref({
  chart: {
    type: "candlestick",
    height: 500,
  },
  plotOptions: {
    candlestick: {
      wick: {
        useFillColor: true,
      },
    },
  },

  tooltip: {
    enabled: true,
  },
  xaxis: {
    type: "datetime",
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
        fontSize: "0px",
      },
    },
  },
});
</script>

<style>
@media (max-width: 500px) {
  .char_style {
    display: none;
  }
}
.label-chart {
  color: #67637f;
  font-size: 28px;
  font-weight: bolder;
  background-color: #283149;
  text-align: center;
  padding: 20px;
  padding-right: 10%;
}
</style>
