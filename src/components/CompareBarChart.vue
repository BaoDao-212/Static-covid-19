<template>
  <div>
    <MultiBarChart
      :bar_chart2="country2Info_1"
      :bar_chart1="country1Info_1"
      :name_country1="props.name_country1"
      :name_country2="props.name_country2"
    />
    <MultiBarChart
      :bar_chart2="country2Info_2"
      :bar_chart1="country1Info_2"
      :name_country1="props.name_country1"
      :name_country2="props.name_country2"
    />
    <MultiBarChart
      :bar_chart2="country2Info_3"
      :bar_chart1="country1Info_3"
      :name_country1="props.name_country1"
      :name_country2="props.name_country2"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from "vue";
import { useWorldStore } from "../stores/store";
import MultiBarChart from "./MultiBarChart.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  name_country1: {
    type: String,
    required: true,
  },
  name_country2: {
    type: String,
    required: true,
  },
});
const worldStore = useWorldStore();
const countryState1 = ref(null);
const countryState2 = ref(null);
const country1Info_1 = ref([]);
const country1Info_2 = ref([]);
const country1Info_3 = ref([]);
const country2Info_1 = ref([]);
const country2Info_2 = ref([]);
const country2Info_3 = ref([]);

watchEffect(async () => {
  countryState1.value = await worldStore.getCountryState(props.name_country1);
  countryState2.value = await worldStore.getCountryState(props.name_country2);
});
watchEffect(() => {
  country1Info_1.value = [
    { title: t("home.New_Deaths"), data: countryState1.value?.new_deaths },
    { title: t("home.New_Cases"), data: countryState1.value?.new_cases },
    {
      title: t("home.Serious_Critical"),
      data: countryState1.value?.serious_critical,
    },
    { title: t("home.Active_Cases"), data: countryState1.value?.active_cases },
  ];
  country1Info_3.value = [
    { title: t("home.Total_Deaths"), data: countryState1.value?.deaths },
    {
      title: t("home.Total_Recovered"),
      data: countryState1.value?.total_recovered,
    },
    { title: t("home.Total_Cases"), data: countryState1.value?.cases },
    { title: t("home.Total_Tests"), data: countryState1.value?.total_tests },
  ];
  country1Info_2.value = [
    {
      title: t("home.Deaths_Per_1_Milion_People"),
      data: countryState1.value?.deaths_per_1m_population,
    },
    {
      title: t("home.Cases_Per_1_Milion_People"),
      data: countryState1.value?.total_cases_per_1m_population,
    },
    {
      title: t("home.Tests_Per_1_Milion_People"),
      data: countryState1.value?.tests_per_1m_population,
    },
  ];
  country2Info_1.value = [
    { title: t("home.New_Deaths"), data: countryState2.value?.new_deaths },
    { title: t("home.New_Cases"), data: countryState2.value?.new_cases },
    {
      title: t("home.Serious_Critical"),
      data: countryState2.value?.serious_critical,
    },
    { title: t("home.Active_Cases"), data: countryState2.value?.active_cases },
  ];
  country2Info_3.value = [
    { title: t("home.Total_Deaths"), data: countryState2.value?.deaths },
    {
      title: t("home.Total_Recovered"),
      data: countryState2.value?.total_recovered,
    },
    { title: t("home.Total_Cases"), data: countryState2.value?.cases },
    { title: t("home.Total_Tests"), data: countryState2.value?.total_tests },
  ];
  country2Info_2.value = [
    {
      title: t("home.Deaths_Per_1_Milion_People"),
      data: countryState2.value?.deaths_per_1m_population,
    },
    {
      title: t("home.Cases_Per_1_Milion_People"),
      data: countryState2.value?.total_cases_per_1m_population,
    },
    {
      title: t("home.Tests_Per_1_Milion_People"),
      data: countryState2.value?.tests_per_1m_population,
    },
  ];
});
</script>

<style></style>
