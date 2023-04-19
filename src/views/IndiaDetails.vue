<template>
  <div>
    <div v-if="loading">
      <div><SelectOption @option-updated="OptionUpdated" /></div>
      <div v-if="showData" class="multichart">
        <DailyConfirmed
          v-if="InfoCompare.includes('dailyconfirmed')"
          :candlestick_chart="IndiaDailyConfirmed"
          name_candlestick_chart="Chart: India Daily Confirmed"
        />
        <DailyConfirmed
          v-if="InfoCompare.includes('dailydeceased')"
          :candlestick_chart="IndiaDailyDeceased"
          name_candlestick_chart="Chart: India Daily Confirmed"
        />
        <DailyConfirmed
          v-if="InfoCompare.includes('dailyrecovered')"
          name_candlestick_chart="Chart: India Daily Recovered"
        />
      </div>
      <PageLoading v-else />
    </div>
    <PageError v-else />
  </div>
</template>

<script setup>
import { useIndiaStore } from "../stores/store";
import { ref, watchEffect, watch } from "vue";
import DailyConfirmed from "../components/IndiaTimeLine/DailyConfirmed.vue";
import SelectOption from "../components/SelectOption.vue";
import PageError from "../components/PageError.vue";
import PageLoading from "../components/PageLoading.vue";
const IndiaDailyConfirmed = ref([]);
const IndiaDailyDeceased = ref([]);
const IndiaDailyRecovered = ref([]);
const IndiaTimeLine = ref([]);
const InfoCompare = ref(["dailyconfirmed"]);
const loading = ref(true);
const showData = ref(false);
const IndiaStore = useIndiaStore();
const OptionUpdated = async (optionInfo) => {
  InfoCompare.value = optionInfo;
  showData.value = false;
  if (InfoCompare.value.length == 0) loading.value = false;
  if (InfoCompare.value.includes("dailyconfirmed"))
    IndiaDailyConfirmed.value = await IndiaTimeLine.value.map((state) => ({
      date: state.dateymd,
      data: state.dailyconfirmed,
    }));
  if (InfoCompare.value.includes("dailydeceased"))
    IndiaDailyDeceased.value = await IndiaTimeLine.value.map((state) => ({
      date: state.dateymd,
      data: state.dailydeceased,
    }));

  if (InfoCompare.value.includes("dailyrecovered"))
    IndiaDailyRecovered.value = await IndiaTimeLine.value.map((state) => ({
      date: state.dateymd,
      data: state.dailyrecovered,
    }));
  showData.value = true;
};

watchEffect(async () => {
  await IndiaStore.fetchIndiaTimeline();
  IndiaTimeLine.value = await IndiaStore.$state.timeLineIndia;
  if (InfoCompare.value.includes("dailyconfirmed"))
    IndiaDailyConfirmed.value = await IndiaTimeLine.value.map((state) => ({
      date: state.dateymd,
      data: state.dailyconfirmed,
    }));
  showData.value = true;
});
</script>
<style>
.date_input {
  width: 140px;
  background-color: rgb(22, 54, 67);
}
</style>
