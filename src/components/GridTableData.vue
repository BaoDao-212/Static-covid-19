<script setup name="GridTableData">
import { defineProps, ref, computed, watch, watchEffect } from "vue";
import CardData from "./CardData.vue";
import BarChart from "./BarChart.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const props = defineProps({
  data: { type: Object },
});
const dateUpdate = ref(props.data.statistic_taken_at);
const objects = computed(() => [
  { title: t("home.New_Cases"), data: props.data.new_cases },
  {
    title: t("home.Serious_Critical"),
    data: props.data.serious_critical,
  },
  { title: t("home.New_Deaths"), data: props.data.new_deaths },
  { title: t("home.Total_Deaths"), data: props.data.total_deaths },
  { title: t("home.Total_Recovered"), data: props.data.total_recovered },
  { title: t("home.Total_Cases"), data: props.data.total_cases },
]);
</script>
<template>
  <div>
    <a-row
      :gutter="[16, 16]"
      :responsive="[
        { xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 },
        { xxl: 4, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 },
      ]"
      :breakpoint="'sm'"
    >
      <a-col
        :span="24"
        :sm="12"
        :md="8"
        v-for="(object, index) in objects"
        :key="object.id"
      >
        <CardData :cardDetails="object" />
      </a-col>
    </a-row>
    <BarChart :key="locale" :bar_chart="objects" />
  </div>
</template>
