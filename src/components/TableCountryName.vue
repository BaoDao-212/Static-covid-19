<template>
  <div class="searchCoutryCompare">
    <a-input
      id="input_country"
      v-model:value="searchTerm"
      :placeholder="t('details.compare')"
    />
    <div
      class="table"
      v-for="(country, index) in filteredCountries.slice(0, 15)"
      :key="country.id"
    >
      <button type="" @click="handleClick(country.country_name)">
        {{ country.country_name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed, defineEmits } from "vue";
import { useWorldStore } from "../stores/store";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const worldStore = useWorldStore();
const searchTerm = ref("");
const countries = ref([]);
const emits = defineEmits(["country-updated"]);
watchEffect(async () => {
  countries.value = await worldStore.$state.dataCorona.countries_stat;
});

const filteredCountries = computed(() => {
  return countries.value.filter((country) =>
    country.country_name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
const handleClick = (countryName) => {
  emits("country-updated", countryName);
};
</script>

<style>
.searchCoutryCompare {
  width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: #234a7e solid 2px;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: medium;
  background-color: #00204a;
}
.table {
  background-color: #00204a;
  display: flex;
  flex-direction: row;
  justify-content: center !important;
  color: aliceblue;
  font-weight: bold;
}
#input_country {
  top: 0;
  right: 0;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  font-size: medium;
  background-color: #00204a;
}
button {
  width: 100%;
  background-color: #00204a;
  border: #1c467c solid 1px;
  border-radius: 10px;
  padding: 8px;
  margin: 4px;
  color: #fff;
  font-weight: bold;
  font-size: medium;
}
button:focus {
  transform: scale(1.2);
}
</style>
