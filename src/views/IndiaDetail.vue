<template>
  <div>
    <a-row :gutter="[16, 16]" :breakpoint="'sm'">
      <a-col
        :span="24"
        :sm="12"
        :md="6"
        v-for="(object, index) in countryState_1.concat(countryState_3)"
        :key="object.id"
      >
        <CardData :cardDetails="object" />
      </a-col>
    </a-row>
    <div>
      <BarChart :bar_chart="countryState_1" :key="locale" />
      <BarChart :bar_chart="countryState_3" :key="locale" />
      <BarChart :bar_chart="countryState_2" :key="locale" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useWorldStore } from "../stores/store";
import BarChart from "../components/BarChart.vue";
import CardData from "../components/CardData.vue";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();
const worldStore = useWorldStore();
const countryState = ref(null);
watchEffect(async () => {
  await worldStore.fetchDataCorona();
  countryState.value = await worldStore.getCountryState("India");
});
const countryState_1 = ref([]);
const countryState_2 = ref([]);
const countryState_3 = ref([]);
watchEffect((locale) => {
  countryState_1.value = [
    { title: t("home.New_Deaths"), data: countryState.value?.new_deaths },
    { title: t("home.New_Cases"), data: countryState.value?.new_cases },
    {
      title: t("home.Serious_Critical"),
      data: countryState.value?.serious_critical,
    },
    { title: t("home.Active_Cases"), data: countryState.value?.active_cases },
  ];
  countryState_3.value = [
    { title: t("home.Total_Deaths"), data: countryState.value?.deaths },
    {
      title: t("home.Total_Recovered"),
      data: countryState.value?.total_recovered,
    },
    { title: t("home.Total_Cases"), data: countryState.value?.cases },
    { title: t("home.Total_Tests"), data: countryState.value?.total_tests },
  ];
  countryState_2.value = [
    {
      title: t("home.Deaths_Per_1_Milion_People"),
      data: countryState.value?.deaths_per_1m_population,
    },
    {
      title: t("home.Cases_Per_1_Milion_People"),
      data: countryState.value?.total_cases_per_1m_population,
    },
    {
      title: t("home.Tests_Per_1_Milion_People"),
      data: countryState.value?.tests_per_1m_population,
    },
  ];
});
</script>
<style>
.data_country {
  display: flex;
  flex-direction: row;
}
.chart {
  width: 100%;
}
</style>
